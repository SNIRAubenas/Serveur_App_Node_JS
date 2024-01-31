const db = require('../Bdd/db');
const config = require('../Bdd/config');
const {data} = require("express-session/session/cookie");
const mysql = require("mysql2");
const res = require("express/lib/response");


const connection = mysql.createConnection(config.db);

async function getMultiple(){
    console.log("je passe la")
    // const data = await db.query(
    //     `SELECT * FROM dechet`
    // );
    connection.query(`SELECT * FROM dechet`,function (err, result ){
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
    res.send("true");


}
// async function getusers(page = 1){
//     const offset = helper.getOffset(page, config.listPerPage);
//     const rows = await db.query(
//         `SELECT login, password
//     FROM user LIMIT ${offset},${config.listPerPage}`
//     );
//     const data = helper.emptyOrRows(rows);
//
//
//     return {
//         data
//     }
// }
async function Emballage(){

    const util = require('util');

// Convertit la fonction de rappel en fonction asynchrone pour utiliser await
    const queryAsync = util.promisify(db.query).bind(db);

        try {
            // Utilisation de queryAsync au lieu de db.query pour le mode promesse
            const [rows] = await queryAsync('SELECT SUM(emballage) FROM dechet');

            // Vérifiez si des données ont été récupérées
            if (rows.length > 0) {
                const totalEmballage = rows[0];

                return {
                    data: {
                        totalEmballage
                    }
                };
            } else {
                // Aucune donnée n'a été trouvée
                return {
                    data: {
                        totalEmballage: 0
                    }
                };
            }
        } catch (error) {
            // Gérez les erreurs, par exemple, en les journalisant
            console.error('Erreur lors de la récupération des données d\'emballage:', error);

            // Vous pouvez renvoyer une réponse d'erreur si nécessaire
            throw new Error('Erreur lors de la récupération des données d\'emballage');
        }
    }

// async function Pain(page = 1){
//     const offset = helper.getOffset(page, config.listPerPage);
//     const rows = await db.query(
//         `SELECT *
//     FROM dechet LIMIT ${offset},${config.listPerPage}`
//     );
//     const data = helper.emptyOrRows(rows);
//
//
//     return {
//         data
//     }
// }
// async function Alimentaire(page = 1){
//     const offset = helper.getOffset(page, config.listPerPage);
//     const rows = await db.query(
//         `SELECT *
//     FROM dechet LIMIT ${offset},${config.listPerPage}`
//     );
//     const data = helper.emptyOrRows(rows);
//
//
//     return {
//         data
//     }
// }


module.exports = {
    getMultiple,
    Emballage
}