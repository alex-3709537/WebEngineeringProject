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

async function getAllUsernames() {
    try {
        const result = await connectAndQuery("SELECT User FROM mysql.user");
        return result.map(row => row.User);
    } catch (err) {
        console.error("Fehler beim Abrufen der Benutzernamen:", err.message);
        throw err;
    }
}


async function getUserPostCount(uid) {
    try {
        const result = await connectAndQuery(`SELECT COUNT(*) FROM post WHERE uid LIKE '${uid}'`);
       
        return (result.length == 0) ? {} : result[0];
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
    getAllUsernames,
    setUser,
    setPost,
    getUserPostCount
}
