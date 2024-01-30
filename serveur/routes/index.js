var express = require('express');
var router = express.Router();
const  parser = require('body-parser');
const db_requette = require('./db_requette');
//const connection = require('../Bdd/db');
const mysql = require("mysql2");
const config = require("../Bdd/config");
const auth = require("./authentification");
const {request} = require("express");



router.get('/', function(req, res, next) {
  res.send("connected");
  console.log(req.session);
});

router.get('/api', async function(req, res, next) {
  console.log(db_requette.Emballage())
  res.send(db_requette.Emballage())
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
