const db = require('../Bdd/db');
const helper = require('../Bdd/helper');
const config = require('../Bdd/config');

async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT id, Nom, Prenom, Age 
    FROM testnode LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

module.exports = {
    getMultiple
}