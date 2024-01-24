const db = require('../Bdd/db');
const helper = require('../Bdd/helper');
const config = require('../Bdd/config');
const {data} = require("express-session/session/cookie");

async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT *
    FROM ticket LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);


    return {
       data
    }
}
async function getusers(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT login, password
    FROM user LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);


    return {
        data
    }
}

async function verifusers(login, password){
    var users = [login, password];
    var verif = false;
    const query = 'SELECT * FROM user WHERE login = ? AND password = ?';
    db.query(query, [login, password], (err, results) => {
        if (err) {
            console.error('Erreur lors de la vérification des informations d\'identification : ' + err.stack);
            res.status(500).send('Erreur du serveur');
            return;
        }
        if (results.length > 0) {
            verif = true;
        } else {
            verif = false;
        }
    })
    return verif

}
module.exports = {
    getMultiple,
    getusers,
    verifusers,
}