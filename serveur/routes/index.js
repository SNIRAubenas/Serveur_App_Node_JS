const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');  // Correctif : changer 'parser' en 'bodyParser'
//const db_requette = require('./db_requette');
require("mysql2");
require("../Bdd/config");
const auth = require("./authentification");
require("../Bdd/db");
require("jsonwebtoken");
const db_requete = require("../Bdd/db_requette")


router.use(bodyParser.json());
// recevoir les informations après la connexion
router.post('/', async function(request, res, next) {
  try {
    const user_token = request.body.token;
    const authResponse = await auth.veryfyeUsers(user_token, res);
    console.log(user_token)

    // Check if authResponse has been sent


      console.log(authResponse)
      const dbResponse =  db_requete.utilisateur(res, authResponse);


  } catch (error) {
    console.error(error);
    // Send an error response if necessary
    if (!res.headersSent) {
      res.status(500).send('Internal Server Error');
    }
  }
});


// route pour avoir les données et les envoyer en json pour les diagrammes sans connexion
router.get('/api', async function(request, response, next) {
  const reponse = db_requete.lancer(response);
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
