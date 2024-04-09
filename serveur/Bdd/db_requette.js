const db = require("./db");
const mysql = require("mysql2");
const config = require("./config");
mysql.createConnection(config.db);
async function lancer(response){
    try {
        const sql = "SELECT REPLACE(FORMAT(SUM(emballage),3,'fr_FR'), ',', '.') AS emballage , REPLACE(FORMAT(SUM(pain), 3, 'fr_FR'), ',', '.') AS pain, REPLACE(FORMAT(SUM(alimentaire), 3, 'fr_FR'), ',', '.') AS alimentaire FROM dechet;";//
        const totalgeneral = "SELECT REPLACE(FORMAT(SUM(pain + alimentaire + emballage),3,'fr_FR'), ',', '.') AS total_jour FROM dechet WHERE DATE(horodatage) = CURDATE();";
        const sql3 = "SELECT DAYNAME(horodatage) AS jour, REPLACE(FORMAT(SUM(pain + alimentaire + emballage),3,'fr_FR'), ',', '.') AS total_journalier FROM dechet WHERE YEARWEEK(horodatage)=YEARWEEK(NOW()) GROUP BY jour;"
        const mois = "SELECT REPLACE(FORMAT(SUM(pain + alimentaire + emballage),3,'fr_FR'), ',', '.') AS total_mois FROM dechet WHERE MONTH(horodatage) = MONTH(CURRENT_DATE());"
        const annee = "SELECT REPLACE(FORMAT(SUM(pain + alimentaire + emballage),3,'fr_FR'), ',', '.') AS total_annee FROM dechet WHERE YEAR(horodatage) = YEAR(CURRENT_DATE());"
        const jourdumois = "SELECT DAY(horodatage) AS jour_du_mois, REPLACE(FORMAT(SUM(pain + alimentaire + emballage),3, 'fr_FR'), ',', '.') AS total_dujour_dumois FROM dechet WHERE MONTH(horodatage) = MONTH(CURRENT_DATE()) GROUP BY jour_du_mois ORDER BY jour_du_mois;"
        const depuiscreation = "SELECT REPLACE(FORMAT(SUM(pain + alimentaire + emballage),3, 'fr_FR'), ',', '.') AS total_creation FROM dechet;"
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
        if (!response.headersSent) {
            response.status(500).send('Erreur serveur');
    }
    }
}
async function utilisateur(response, userLogin) {
    try {
        let responseSent = false;
        const sql = "SELECT REPLACE(FORMAT(SUM(emballage),3,'fr_FR'), ',', '.') AS emballage , SUM(pain) AS pain, SUM(alimentaire) AS alimentaire FROM dechet JOIN user ON dechet.id_user = user.id_user WHERE user.id_user = (SELECT id_user FROM user WHERE login = ?);";
        const totalgeneral = "SELECT REPLACE(FORMAT(SUM(pain + alimentaire + emballage), 3, 'fr_FR'), ',', '.')  AS total_jour FROM dechet JOIN user ON dechet.id_user = user.id_user WHERE DATE(horodatage) = CURDATE() AND user.id_user = (SELECT id_user FROM user WHERE login = ?);";
        const sql3 = "SELECT DAYNAME(horodatage) AS jour, REPLACE(FORMAT(SUM(pain + alimentaire + emballage),3, 'fr_FR'), ',', '.') AS total_journalier FROM dechet JOIN user ON dechet.id_user = user.id_user WHERE YEARWEEK(horodatage)=YEARWEEK(NOW()) AND user.id_user = (SELECT id_user FROM user WHERE login = ?) GROUP BY jour;";
        const mois = "SELECT REPLACE(FORMAT(SUM(pain + alimentaire + emballage),3,'fr_FR'), ',', '.')  AS total_mois FROM dechet JOIN user ON dechet.id_user = user.id_user WHERE MONTH(horodatage) = MONTH(CURRENT_DATE()) AND user.id_user = (SELECT id_user FROM user WHERE login = ?);"
        const annee = "SELECT DAY(horodatage) AS jour_du_mois, REPLACE(FORMAT(SUM(pain + alimentaire + emballage),3, 'fr_FR'), ',', '.') AS total_annee FROM dechet JOIN user ON dechet.id_user = user.id_user  WHERE MONTH(horodatage) = MONTH(CURRENT_DATE()) GROUP BY jour_du_mois ORDER BY jour_du_mois AND user.id_user = (SELECT id_user FROM user WHERE login = ?);"
        const jourdumois = "SELECT DAY(horodatage) AS jour_du_mois, REPLACE(FORMAT(SUM(pain + alimentaire + emballage), 3, 'fr_FR'), ',', '.') AS total_annee FROM dechet JOIN user ON dechet.id_user = user.id_user WHERE MONTH(horodatage) = MONTH(CURRENT_DATE()) AND user.id_user = (SELECT id_user FROM user WHERE login = ?) GROUP BY jour_du_mois ORDER BY jour_du_mois;;"
        const depuiscreation = "SELECT REPLACE(FORMAT(SUM(pain + alimentaire + emballage),3, 'fr_FR'), ',', '.') AS total_creation FROM dechet JOIN user ON dechet.id_user = user.id_user AND user.id_user = (SELECT id_user FROM user WHERE login = ?);"
        const result = await db.query(sql,[userLogin]);
        const resultatgeneral = await db.query(totalgeneral, [userLogin]);
        const resultat_mois = await db.query(mois, [userLogin]);
        const result_annee = await db.query(annee, [userLogin]);
        const jours = await db.query(sql3, [userLogin]);
        const resultat_posee = await db.query(depuiscreation, [userLogin]);
        const resultat_jours_mois = await db.query(jourdumois, [userLogin]);

        // Combine the results into a single response
        if (!responseSent) {
            response.json({
                user : userLogin,
                resultat: result,
                general: resultatgeneral,
                mois: resultat_mois,
                annee: result_annee,
                depuis_creation: resultat_posee,
                semaine_actuelle: jours,
                depuis_le_debut: resultat_posee,
                jours_dans_le_mois: resultat_jours_mois
            });

            responseSent = true;
        }
    } catch (err) {
        console.error(err);
        if (!response.headersSent) {
            response.status(500).send('Erreur serveur');
        }
    }

}
module.exports = {
        lancer,
        utilisateur
    };
