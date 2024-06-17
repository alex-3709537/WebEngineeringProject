const sqlConfig = require("../config/databaseMySql");
const mysql = require("mysql");
const mysql2 = require("mysql2/promise");
const util = require("util");
const fs = require("fs/promises");
const path = require("path");

async function getUser(username) {
    try {
        const result = await connectAndQuery(`SELECT * FROM users WHERE username LIKE '${username}'`);

        return (result.length == 0) ? {} : result[0];
    } catch (err) {
        console.error(err.message);
        return err;
    }
}

async function getUserByUID(uid) {
    try {
        const result = await connectAndQuery(`SELECT * FROM users WHERE uid LIKE ${uid}`);
         
        return result[0];
    } catch (err) {
        console.error(err.message);
        return err;
    }
}

//result[0] ein object mit Parameter "COUNT(*)", was mit js nicht direkt abgegriffen werden kann wegen den Sonderzeichen;
//daher JSON.stringify(result) als workaround.
//Hinweis: .indexof(":") ist hier sicher, da das resultString-Objekt immer nach folgendem schema aufgebaut ist:
//[{"COUNT(*)":11}]
async function getPostCountForUID(uid) {
    try {
        const result = await connectAndQuery(`SELECT COUNT(*) FROM post WHERE uid LIKE '${uid}'`);
        var resultString = JSON.stringify(result); //[{"COUNT(*)":11}]
        resultString = resultString.substring(resultString.indexOf(":") + 1); //11}]
        resultString = resultString.substring(0, resultString.indexOf("}")); //11

        return (result.length == 0) ? -1 : resultString;
    } catch (err) {
        console.error(err.message);
        return err;
    }
}

async function getPostsForUID(uid, maxAmountOfReturnedPosts) {
    try {
        const result = await connectAndQuery(`SELECT * FROM post WHERE uid LIKE '${uid}' ORDER BY date DESC LIMIT ${maxAmountOfReturnedPosts}`);
        
        return result;
    } catch (err) {
        console.error(err.message);
        return err;
    }
}


async function setUser(username, password) {
    try {
        const result = await connectAndQuery(`INSERT INTO users (username, password, creationDate) VALUES('${username}','${password}', CURRENT_TIMESTAMP)`);

        return result;
    } catch (err) {
        console.error(err.message);
        return err;
    }
}


async function setPost(uid, post) {
    try {
        const result = await connectAndQuery(`INSERT INTO post (uid, post, date) VALUES(${uid},'${post}', CURRENT_TIMESTAMP)`);

        return result;
    } catch (err) {
        console.error(err.message);
        return "err";
    }
}

async function setFile(pid, data, type) {
    try {
     
        // Datei lesen
        const result = await connectAndQuery2(`INSERT INTO files (name, type, data, pid) VALUES(CURRENT_TIMESTAMP, ?, ?, ?)`, [type, data, pid]);

        return result;
    } catch (err) {
        console.error(err.message);
        return "err";
    }
}

async function getPostsByUids(uids, maxAmountOfReturnedPosts){
    try {
        if (uids === undefined)
        {
            uids = -1;
            maxAmountOfReturnedPosts = 10;
        }

        if (+uids === -1)
        {
            //Posts für alle User zurückgeben (Public Feed)
            const result = await connectAndQuery2(`
                SELECT post.pid
                FROM post
                ORDER BY date DESC LIMIT ${maxAmountOfReturnedPosts}`);
                console.log(result);
            return result;
        }  
        else
        {
            //Posts für bestimmte User zurückgeben
            await connectAndQuery2(`
                SELECT post.pid
                FROM post
                WHERE uid IN (${uids.map(() => '?').join(', ')})`);
            return result;
        }
        
        
    } catch (err) {
        console.error(err.message);
        return "err";
    }
}


async function getPostByPid(pid){
    try {
        const result = await connectAndQuery2(`
            SELECT post.*, files.*
            FROM post
            LEFT JOIN files ON post.pid = files.pid
            WHERE post.pid = ?`, 
            [pid]);

        return result;
    } catch (err) {
        console.error(err.message);
        return "err";
    }
}

async function getPostByUid(uid, limit){
    try {
        const result = await connectAndQuery2(`
            SELECT TOP ? post.*, files.*
            FROM post
            LEFT JOIN files ON post.pid = files.pid
            WHERE post.uid = ?
            ORDER BY date`, 
            [limit, uid]);

        return result;
    } catch (error) {
        console.error(err.message);
        return "err";
    }
}


async function connectAndQuery(query) {
    let con;
    try {
        con = mysql.createConnection(sqlConfig);
        const connect = util.promisify(con.connect).bind(con);  // baut die funktion in eine promise funktion um
        const queryPromise = util.promisify(con.query).bind(con);

        await connect();
        //console.log("Connection to Database successfull");

        const result = await queryPromise(query);
        //console.log("Sql Query executed successfully!");

        return result;
    } catch (err) {
        console.error(err.message);
        throw err;
    } finally {
        if (con) {
            con.end();
        }
    }
}

async function connectAndQuery2(query, data) {
    const connection = await mysql2.createConnection(sqlConfig);

    try {
            
        const [results] = await connection.execute(query, data);
        
        return results;
    } catch (err) {
        console.error('Fehler:', err);
    } finally {
        // Verbindung schließen
        await connection.end();
    }
}

module.exports = {
    getUser,
    getUserByUID,
    setUser,
    setPost,
    getPostCountForUID,
    getPostsForUID,
    setFile,
    getPostByPid,
    getPostByUid,
    getPostsByUids
}
