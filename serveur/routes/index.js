var express = require('express');
var router = express.Router();
const  parser = require('body-parser');
//const db_requette = require('./db_requette');
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
  try {
    res.json(await db_requette.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

router.post('/login', function(request, response, next){

  var user_login = request.body.login;

  var user_password = request.body.password;
  var user = {
    login: user_login,
    password:user_password
  }

  var reponse =auth.lireLesLogin(request, response, user);
 //  if(response === true){
 //    response.send("true")
 //  }else{
 //    response.send("false")
 //
 //  }
  //response.json(reponse);
});





module.exports = router;
