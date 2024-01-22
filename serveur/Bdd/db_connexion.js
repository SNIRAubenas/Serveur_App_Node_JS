var mysql = require('mysql');
const {log} = require("debug");
const {db} = require("./config");

async function query(sql, params) {
    async function query(sql, params) {
        const connection = await mysql.createConnection(db);
        const [results, ] = await connection.execute(sql, params);

        return results;
    }
    console.log("connected")

    return results;
}

module.exports = {
    query
}
