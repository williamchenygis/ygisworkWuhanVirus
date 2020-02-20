var express = require('express');
var router = express.Router();
var passportGoogle = require('../auth/google');

/* LOGIN ROUTER */
router.get('/login', function(req, res, next) {
  //res.render('login', { title: 'Please Sign In with:' });
  res.send('please login');
});

/* LOGOUT ROUTER */
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


/* GOOGLE ROUTER */
router.get('/google',
  passportGoogle.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

router.get('/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {

  	console.log(req.user.doc);

  	req.session.token = req.user.doc._id;

  	if (req.session.token) {
        res.cookie('token', req.session.token);
        res.cookie('username',req.user.doc.name);
        // res.json({
        //     status: 'session cookie set',
        //     user: req.user.doc.name
        // });

        res.redirect('/page/');
    } else {
        res.cookie('token', '')
        res.json({
            status: 'session cookie not set'
        });
    }

    // res.json({
    //     status: 'session cookie set'
    // });
  });

 module.exports = router;