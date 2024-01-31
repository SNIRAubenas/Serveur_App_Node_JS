const mysql = require("mysql2");
const config = require("../Bdd/config");
const {query} = require("express");
const jwt = require("jsonwebtoken");


const connection = mysql.createConnection(config.db);

//methode pour gerer la connexion des utilisateur
async function lireLesLogin(request, response, user) {
    console.log("on est bon");

    try {
        const login = await lelogin(user);

        if (login) {
            const token = jwt.sign({ user }, 'votre_clé_secrète', { expiresIn: '1h' });
            response.json({ success: true, message: 'Authentification réussie.', token });
        } else {
            response.json({ success: false, message: 'Authentification échouée.' });
        }
    } catch (err) {
        console.error(err);
        response.status(500).json({ success: false, message: 'Erreur serveur lors de l\'authentification.' });
    }
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