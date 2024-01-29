const mysql = require("mysql2");
const config = require("../Bdd/config");
const {query} = require("express");


const connection = mysql.createConnection(config.db);


async function  lireLesLogin(request, response, user){
    let login = await lelogin(user);
    let message = '{"login":"' + login.login + '"}'
    //console.log("message = " + message)
    return message;
}

function lelogin(user){
    console.log("in login")

    console.log("log ok")
    return new Promise(function (resolve, reject){
        // const connection =  mysql.createConnection(config.db);
        const sql = "SELECT * FROM user where login ='" + user.login + "'";
        console.log("sql = " + sql);
        connection.query(sql, function (err, result) {
            if (err) {
                console.log("test query");
                reject(err);
            }
            if (sql != true){
                console.log("tu es naze");

            }
            console.log("test ok " + result[0]);
            resolve(result[0]);

        });
    });
}

module.exports = {
    lireLesLogin,
    lelogin
}