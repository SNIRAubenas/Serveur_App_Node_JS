const mysql = require('mysql2/promise');
const config = require('./config');

async function query(sql, params) {
    const connection = await mysql.createConnection(config.db);
    console.log("connected")
    //const [results, ] = await connection.query(sql, params);
    await connection.query(sql, function (err, result) {
        if (err) {
            return err;
        }
        return result;
    });
    console.log('executed');
    console.log(results);
    return results;
}



module.exports = {
    query
}