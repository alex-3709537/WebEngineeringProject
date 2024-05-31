const sqlConfig = require("../config/databaseMySql");
const mysql = require("mysql");
const util = require("util");

async function getUser(username) {
    try {
        const result = await connectAndQuery(`SELECT * FROM users WHERE username LIKE '${username}'`);

        return (result.length == 0) ? {} : result[0];
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

//implementation folgt
async function getPostsForUID(uid) {
    try {
        return "placeholder value"
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




async function connectAndQuery(query) {
    let con;
    try {
        con = mysql.createConnection(sqlConfig);
        const connect = util.promisify(con.connect).bind(con);  // baut die funktion in eine promise funktion um
        const queryPromise = util.promisify(con.query).bind(con);
        
        await connect();
        console.log("Connection to Database successfull");

        const result = await queryPromise(query);
        console.log("Sql Query executed successfully!");
        
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

module.exports = {
    getUser,
    setUser,
    setPost,
    getPostCountForUID,
    getPostsForUID
}
