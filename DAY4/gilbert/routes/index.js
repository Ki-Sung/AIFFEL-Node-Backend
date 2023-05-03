var express = require('express');
var router = express.Router();

/* GET home page. */
// http://localhost:300/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Gilbert' });
});

module.exports = router;
