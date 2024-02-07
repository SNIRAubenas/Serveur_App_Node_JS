const db = require("./db");
const {query} = require("express");
const mysql = require("mysql2");
const config = require("./config");


const connection = mysql.createConnection(config.db);

async function lancer(request, response){
    try {
        const sql = 'SELECT SUM(emballage) AS emballage , SUM(pain) AS pain, SUM(alimentaire) AS alimentaire FROM dechet';
        const totalgeneral = "SELECT SUM(pain + alimentaire + emballage) AS total_jour FROM dechet WHERE DATE(horodatage) = CURDATE()";
        const sql3 = "SELECT DAYNAME(horodatage) AS jour, SUM(pain + alimentaire + emballage) AS total_journalier FROM dechet WHERE DAYOFWEEK(horodatage) GROUP BY jour"
        const mois = "SELECT SUM(pain + alimentaire + emballage) AS total_mois FROM dechet WHERE MONTH(horodatage) = MONTH(CURRENT_DATE())"
        const annee = "SELECT SUM(pain + alimentaire + emballage) AS total_annee FROM dechet WHERE YEAR(horodatage) = YEAR(CURRENT_DATE())"
        const jourdumois = "SELECT DAY(horodatage) AS jour_du_mois, SUM(pain + alimentaire + emballage) AS total_dujour_dumois FROM dechet WHERE MONTH(horodatage) = MONTH(CURRENT_DATE()) GROUP BY jour_du_mois ORDER BY jour_du_mois"
        const depuiscreation = "SELECT SUM(pain + alimentaire + emballage) AS total_creation FROM dechet"
        const result = await db.query(sql);
        const resultatgeneral = await db.query(totalgeneral);
        const resultat_mois = await db.query(mois);
        const result_annee = await db.query(annee);
        const jours = await db.query(sql3);
        const resultat_posee = await db.query(depuiscreation);
        const resultat_jours_mois = await db.query(jourdumois);
        response.json({
            resultat: result,
            general: resultatgeneral,
            mois: resultat_mois,
            annee: result_annee,
            depuis_creation: resultat_posee,
            semaine_actuelle: jours,
            depuis_le_debut: resultat_posee,
            jours_dans_le_mois: resultat_jours_mois
        });
    }catch (err){
        console.log(err)
        response.status(500).send('Erreur serveur');
    }
}
module.exports = {
    lancer
}
