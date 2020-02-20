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

router.get('/getUserInfo2', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  console.log(req.body);
      //res.json({lel: req.user._id});
  res.json({lel: req.user});
});

module.exports = router;
