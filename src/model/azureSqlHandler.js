
const sql = require('mssql');
const config = require("../config/databaseAzure");

async function getUser(username) {
    try{
        const result = await connectAndQuery(`SELECT * FROM users WHERE username like '${username}'`);
        
        return (result.recordset[0] == undefined)? {} : result.recordset[0];
    }catch (err) {
        console.error(err.message);
        return err;
    }
}


async function setUser(username, password) {
    try{
        const result = await connectAndQuery(`INSERT INTO users (username, password, creationDate) VALUES('${username}','${password}', CURRENT_TIMESTAMP)`);

        return result;
    }catch (err) {
        console.error(err.message);
        return err;
    }
}

async function setPost(username, post){
    try{
        const result = await connectAndQuery(`INSERT INTO post (username, post, date) VALUES('${username}','${post}', CURRENT_TIMESTAMP)`);

        return result;
    }catch(err){
        console.error(err.message)
        return err;
    }
}

async function connectAndQuery(query) {
    try {
        var poolConnection = await sql.connect(config);

        var resultSet = await poolConnection.request().query(query);
        //sqlTestLog(resultSet);


        // close connection only when we're certain application is finished
        poolConnection.close();
        return resultSet;
    } catch (err) {
        console.error(err.message);
    }
}



function sqlTestLog(resultSet) {
    console.log(`${resultSet.recordset.length} rows returned.`);

    // output column headers
    var columns = "";
    for (var column in resultSet.recordset.columns) {
        columns += column + ", ";
    }
    console.log("%s\t", columns.substring(0, columns.length - 2));

    // ouput row contents from default record set
    resultSet.recordset.forEach(row => {
        console.log("%s\t%s", row.username, row.password);
    });
}

module.exports = {
    getUser,
    setUser,
    setPost
}