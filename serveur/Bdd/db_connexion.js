var mysql = require('mysql');
const {log} = require("debug");
const {db} = require("./config");

async function query(sql, params) {
    async function query(sql, params) {
        const connection = await mysql.createConnection(db);
        console.log("connected")
        const [results, ] = await connection.execute(sql, params);
        console.log("exceted")
        return results;
    }


    return results;
}

module.exports = {
    query
}
