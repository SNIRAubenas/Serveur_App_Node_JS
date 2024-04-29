const db = require("./db");
const mysql = require("mysql2");
const config = require("./config");

// Correction du mode strict SQL
const connection = mysql.createConnection({
    ...config.db,
    multipleStatements: true
});

async function executeQuery(query, params = []) {
    try {
        const [rows] = await db.query(query, params);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function lancer(response) {
    try {
        const sql = "SELECT REPLACE(FORMAT(SUM(emballage),3,'fr_FR'), ',', '.') AS emballage , REPLACE(FORMAT(SUM(pain), 3, 'fr_FR'), ',', '.') AS pain, REPLACE(FORMAT(SUM(alimentaire), 3, 'fr_FR'), ',', '.') AS alimentaire FROM dechet;";
        const totalgeneral = "SELECT REPLACE(FORMAT(SUM(pain + alimentaire + emballage),3,'fr_FR'), ',', '.') AS total_jour FROM dechet WHERE DATE(horodatage) = CURDATE();";
        const sql3 = "SELECT DAYNAME(horodatage) AS jour, REPLACE(FORMAT(SUM(pain + alimentaire + emballage),3,'fr_FR'), ',', '.') AS total_journalier FROM dechet WHERE YEARWEEK(horodatage)=YEARWEEK(NOW()) GROUP BY jour;";
        const mois = "SELECT REPLACE(FORMAT(SUM(pain + alimentaire + emballage),3,'fr_FR'), ',', '.') AS total_mois FROM dechet WHERE MONTH(horodatage) = MONTH(CURRENT_DATE());";
        const annee = "SELECT REPLACE(FORMAT(SUM(pain + alimentaire + emballage),3,'fr_FR'), ',', '.') AS total_annee FROM dechet WHERE YEAR(horodatage) = YEAR(CURRENT_DATE());";
        const jourdumois = "SELECT DAY(horodatage) AS jour_du_mois, REPLACE(FORMAT(SUM(pain + alimentaire + emballage),3, 'fr_FR'), ',', '.') AS total_dujour_dumois FROM dechet WHERE MONTH(horodatage) = MONTH(CURRENT_DATE()) GROUP BY jour_du_mois ORDER BY jour_du_mois;";
        const depuiscreation = "SELECT REPLACE(FORMAT(SUM(pain + alimentaire + emballage),3, 'fr_FR'), ',', '.') AS total_creation FROM dechet;";

        const [result, resultatgeneral, resultat_mois, result_annee, jours, resultat_posee, resultat_jours_mois] = await Promise.all([
            executeQuery(sql),
            executeQuery(totalgeneral),
            executeQuery(mois),
            executeQuery(annee),
            executeQuery(sql3),
            executeQuery(depuiscreation),
            executeQuery(jourdumois)
        ]);

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
    } catch (err) {
        console.error(err);
        response.status(500).send('Erreur serveur');
    }
}

async function utilisateur(response, userLogin) {
    try {
        const sql = "SELECT REPLACE(FORMAT(SUM(emballage), 3, 'fr_FR'), ',', '.') AS emballage, REPLACE(FORMAT(SUM(pain), 3, 'fr_FR'), ',', '.') AS pain, REPLACE(FORMAT(SUM(alimentaire), 3, 'fr_FR'), ',', '.') AS alimentaire FROM dechet JOIN user ON dechet.id_user = user.id_user WHERE user.id_user = (SELECT id_user FROM user WHERE login = ?);";
        const totalgeneral = "SELECT REPLACE(FORMAT(SUM(pain + alimentaire + emballage), 3, 'fr_FR'), ',', '.') AS total_jour FROM dechet JOIN user ON dechet.id_user = user.id_user WHERE DATE(horodatage) = CURDATE() AND user.id_user = (SELECT id_user FROM user WHERE login = ?);";
        const sql3 = "SELECT DAYNAME(horodatage) AS jour, REPLACE(FORMAT(SUM(pain + alimentaire + emballage), 3, 'fr_FR'), ',', '.') AS total_journalier FROM dechet JOIN user ON dechet.id_user = user.id_user WHERE YEARWEEK(horodatage) = YEARWEEK(NOW()) AND user.id_user = (SELECT id_user FROM user WHERE login = ?) GROUP BY jour;";
        const mois = "SELECT REPLACE(FORMAT(SUM(pain + alimentaire + emballage), 3, 'fr_FR'), ',', '.') AS total_mois FROM dechet JOIN user ON dechet.id_user = user.id_user WHERE MONTH(horodatage) = MONTH(CURRENT_DATE()) AND user.id_user = (SELECT id_user FROM user WHERE login = ?);";
        const annee = "SELECT REPLACE(FORMAT(SUM(pain + alimentaire + emballage), 3, 'fr_FR'), ',', '.') AS total_annee FROM dechet JOIN user ON dechet.id_user = user.id_user WHERE YEAR(horodatage) = YEAR(CURRENT_DATE()) AND user.id_user = (SELECT id_user FROM user WHERE login = ?);";
        const jourdumois = "SELECT DAY(horodatage) AS jour_du_mois, REPLACE(FORMAT(SUM(pain + alimentaire + emballage), 3, 'fr_FR'), ',', '.') AS total_dujour_dumois FROM dechet JOIN user ON dechet.id_user = user.id_user WHERE MONTH(horodatage) = MONTH(CURRENT_DATE()) AND user.id_user = (SELECT id_user FROM user WHERE login = ?) GROUP BY jour_du_mois ORDER BY jour_du_mois;";
        const depuiscreation = "SELECT REPLACE(FORMAT(SUM(pain + alimentaire + emballage), 3, 'fr_FR'), ',', '.') AS total_creation FROM dechet JOIN user ON dechet.id_user = user.id_user WHERE user.id_user = (SELECT id_user FROM user WHERE login = ?);";

        const [result, resultatgeneral, resultat_mois, result_annee, jours, resultat_posee, resultat_jours_mois] = await Promise.all([
            executeQuery(sql, [userLogin]),
            executeQuery(totalgeneral, [userLogin]),
            executeQuery(mois, [userLogin]),
            executeQuery(annee, [userLogin]),
            executeQuery(sql3, [userLogin]),
            executeQuery(depuiscreation, [userLogin]),
            executeQuery(jourdumois, [userLogin])
        ]);

        const totalAnnee = result_annee.length > 0 ? result_annee[0].total_annee : null;

        response.json({
            user: userLogin, // Ajout de la clé "user" avec la valeur du nom d'utilisateur
            resultat: result,
            general: resultatgeneral,
            mois: resultat_mois,
            annee: [{ total_annee: totalAnnee }],
            depuis_creation: resultat_posee,
            semaine_actuelle: jours,
            depuis_le_debut: resultat_posee,
            jours_dans_le_mois: resultat_jours_mois
        });

    } catch (err) {
        console.error(err);
        response.status(500).send('Erreur serveur');
    }
}

module.exports = {
    lancer,
    utilisateur
};
