const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');  // Correctif : changer 'parser' en 'bodyParser'
const db_requette = require('./db_requette');
const mysql = require("mysql2");
const config = require("../Bdd/config");
const auth = require("./authentification");
const db = require("../Bdd/db");

router.use(bodyParser.json());

router.get('/', function(req, res, next) {
  res.send("connected");
  console.log(req.session);
});

router.get('/api', async function(req, res, next) {
  try {
    const sql = 'SELECT SUM(emballage) AS emballage , SUM(pain) AS pain, SUM(alimentaire) AS alimentaire FROM dechet';
    const result = await db.query(sql);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});


router.post('/login', function(request, response, next){

  var user_login = request.body.login;

  var user_password = request.body.password;
  var user = {
    login: user_login,
    password:user_password
  }

  const reponse = auth.lireLesLogin(request, response, user);
});





module.exports = router;
