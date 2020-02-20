var express = require('express');
var router = express.Router();

router.get('/test', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ msg: 1 }));
});

router.get('/getUserInfo', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(req.cookies));
});

module.exports = router;
