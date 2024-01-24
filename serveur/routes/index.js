var express = require('express');
var router = express.Router();
const  parser = require('body-parser');
const db_requette = require('./db_requette');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("connected");
  console.log(req.session)
});

router.get('/api', async function(req, res, next) {
  try {
    res.json(await db_requette.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});
router.post('/auth', async function (req, res, next) {
  const {login, password} = req.body;
  const verif =await db_requette.verifusers(login, password);
  if(verif){
    res.send("on est chaud");
    req.session.user = login;
  }else{
    res.send(verif);
  }
  console.log(login);
  console.log(password);

});

module.exports = router;
