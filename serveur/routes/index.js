var express = require('express');
var router = express.Router();
const db_requette = require('./db_requette')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("connected");
});
router.get('/api', function(req, res, next) {
  res.json({ firstName: 'Tobi' })
});
router.get('/api2', async function(req, res, next) {
  try {
    res.json(await db_requette.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});
module.exports = router;
