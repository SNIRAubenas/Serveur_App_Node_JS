const mysql = require("mysql2");
const config = require("../Bdd/config");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const {response} = require("express");



const connection = mysql.createConnection(config.db);

//methode pour gerer la connexion des utilisateur utilisation de jwt
async function lireLesLogin(request, response, user) {
    try {
        const login = await lelogin(user);
        let success = false;
        if (login) {
            const token = jwt.sign({ user }, 'votre_clé_secrète', { expiresIn: '1h' });
            success= true;
            response.cookie('token', token, { httpOnly: true, secure: true, SameSite: 'strict' , expires: new Date(Number(new Date()) + 30*60*1000) }); //we add secure: true, when using https.

            response.json({ success : success , message: 'Authentification réussie.', token });

        } else {
            response.json({ success : false, message: 'Authentification échouée.' });
        }
    } catch (err) {
        console.error(err);
        response.status(500).json({ success: false, message: 'Erreur serveur lors de l\'authentification.' });
    }
}

function lelogin(user){
    return new Promise(function (resolve, reject){
        // const connection =  mysql.createConnection(config.db);
        const sql = 'SELECT * FROM user WHERE login = "'+user.login+'" AND PASSWORD = "'+user.password+'"';
        console.log("sql = " + sql);
        connection.query(sql, function (err, result) {
            if (err) {
                reject(false);
            }
            else if (result.length <= 0){
                resolve(false)
            }else{

                resolve(true);

            }


        });
    });
}

async function veryfyeUsers(token, response) {
    const user_token = token;
    const decode = jwt.verify(user_token, 'votre_clé_secrète')
    console.log(decode.user.login)
    response.json({"user": decode.user.login})
}

module.exports = {
    lireLesLogin,
    lelogin,
    veryfyeUsers
}