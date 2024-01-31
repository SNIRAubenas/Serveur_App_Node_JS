const mysql = require('mysql2/promise');
const config = require('./config');

// methode pour nous connecter a la base de données
async function query(sql, params) {
    try {
        const connection = await mysql.createConnection(config.db);
        console.log("Connected");

        // Utiliser await directement pour la requête
        const [results, fields] = await connection.query(sql, params);

        console.log('Executed');
        console.log(results);
        return results;
    } catch (err) {
        console.error(err);
        throw err; // Ne pas oublier de propager l'erreur
    }
}


module.exports = {
    query
}