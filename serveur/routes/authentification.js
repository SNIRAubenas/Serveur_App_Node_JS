const mysql = require("mysql2");
const config = require("../Bdd/config");
const {query} = require("express");


const connection = mysql.createConnection(config.db);


async function  lireLesLogin(request, response, user){
    let login = await lelogin(user);
    let bool = true
    let message = '{"login":"' + login + '"}'
    response.send(login)
}

function lelogin(user){
    console.log("in login")

    console.log("log ok")
    return new Promise(function (resolve, reject){
        // const connection =  mysql.createConnection(config.db);
        const sql = 'SELECT * FROM user WHERE login = "'+user.login+'" AND PASSWORD = "'+user.password+'"';
        console.log(user.password)
        console.log("sql = " + sql);
        connection.query(sql, function (err, result) {
            if (err) {
                console.log("test query" + err);
                reject(false);
            }
            if (result.length <= 0){
                resolve(false)
            }else{
                console.log("test ok " + result[0]);
                resolve(true);

            }


        });
    });
}

module.exports = {
    lireLesLogin,
    lelogin
}