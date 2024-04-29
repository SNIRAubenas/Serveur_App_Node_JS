const mysql = require('mysql2/promise');
const config = require('./config');

// Méthode pour nous connecter à la base de données et exécuter une requête
async function query(sql, params) {
    let connection;
    try {
        connection = await mysql.createConnection(config.db);
        const [results, fields] = await connection.query(sql, params);
        console.log(results);
        return results;
    } catch (err) {
        console.error(err);
        throw err; // Ne pas oublier de propager l'erreur
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

module.exports = {
    query
};
