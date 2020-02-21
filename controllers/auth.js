var express = require('express');
var router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});


router.post('/signup', (req, res)=>{
  db.user.findOrCreate({
   where: {
     email: req.body.email
   }, defaults: {
     name: req.body.name,
     password: req.body.password
   }
  }).then(([user, created]) => {
    if (created) {
      console.log('user created');
      passport.authenticate('local', {
        successRedirect: '/'
      })(req, res);
      res.redirect('/');
    } else {
      console.log('email already exist you fuckin nerd')
      res.redirect('auth/signup');
    }
  }).catch(err => {
    console.log('error has occured finding or creating a profile dickhead');
    console.log(err);
    res.redirect('/auth/signup');
  });
});


router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login'
}));

router.get('/logout', (req, res)=>{
  req.logout();
  res.redirect('/');
});

module.exports = router;
