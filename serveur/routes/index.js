const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');  // Correctif : changer 'parser' en 'bodyParser'
//const db_requette = require('./db_requette');
require("mysql2");
require("../Bdd/config");
const auth = require("./authentification");
require("../Bdd/db");
const jwt = require("jsonwebtoken");
const db_requete = require("../Bdd/db_requette")


router.use(bodyParser.json());

router.get('/', function(request, res, next) {
  //const jwt_token = request.body.token;
  console.log(request.body.token)
  res.send("connected");
  console.log(req.session);
});

// route pour avoir les données et les envoyer en json pour les diagrammes sans connexion
router.get('/api', async function(request, response, next) {
  const reponse = db_requete.lancer(request, response);
});

//route pour que l'utilisateur ce connecte en appelant la methode authentification
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
