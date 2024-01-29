const db = require('../Bdd/db');
const helper = require('../Bdd/helper');
const config = require('../Bdd/config');
const {data} = require("express-session/session/cookie");

async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT *
    FROM dechet LIMIT ${offset},${config.listPerPage}`
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



module.exports = {
    getMultiple,
    getusers
}