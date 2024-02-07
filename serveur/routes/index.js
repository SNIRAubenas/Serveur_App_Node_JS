const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');  // Correctif : changer 'parser' en 'bodyParser'
//const db_requette = require('./db_requette');
const mysql = require("mysql2");
const config = require("../Bdd/config");
const auth = require("./authentification");
const db = require("../Bdd/db");
const jwt = require("jsonwebtoken");
const db_requete = require("../Bdd/db_requette")


router.use(bodyParser.json());

router.get('/', function(request, res, next) {
  res.send("connected");
  console.log(req.session);
});

// route pour avoir les données et les envoyer a nathan pour les diagramme sans connexion
router.get('/api', async function(request, response, next) {
  const reponse = db_requete.lancer(request, response);
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
