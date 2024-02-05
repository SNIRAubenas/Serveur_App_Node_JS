const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');  // Correctif : changer 'parser' en 'bodyParser'
const db_requette = require('./db_requette');
const mysql = require("mysql2");
const config = require("../Bdd/config");
const auth = require("./authentification");
const db = require("../Bdd/db");
const jwt = require("jsonwebtoken");


router.use(bodyParser.json());

router.get('/', function(req, res, next) {
  res.send("connected");
  console.log(req.session);
});

// route pour avoir les données et les envoyer a nathan pour les diagramme sans connexion
router.get('/api', async function(req, res, next) {
  try {
    const sql = 'SELECT SUM(emballage) AS emballage , SUM(pain) AS pain, SUM(alimentaire) AS alimentaire FROM dechet';
    const sql2 = 'SELECT * FROM dechet WHERE WEEK(horodatage, 1) = 5;';
    const result = await db.query(sql);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

//route pour ce connecter
router.post('/login', function(request, response, next){

  const user_login = request.body.login;

  const user_password = request.body.password;
  const user = {
    login: user_login,
    password: user_password
  };

  const reponse = auth.lireLesLogin(request, response, user);
});





module.exports = router;
