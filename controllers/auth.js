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
        successRedirect: '/',
        successFlash: 'Thanks for signing up, i own you now send bank DEETS',
      })(req, res);
      res.redirect('/');
    } else {
      console.log('email already exist you fuckin nerd');
      req.flash('error', 'email already exists')
      res.redirect('auth/signup');
    }
  }).catch(err => {
    console.log('error has occured finding or creating a profile dickhead');
    console.log(err);
    req.flash('error', err.message); 
    res.redirect('/auth/signup');
  });
});


router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  successFlash: 'Welcome!',
  failureFlash: 'Invalid username or password dickface'
}));

router.get('/logout', (req, res)=>{
  req.logout();
  req.flash('success', 'smell ya later ballstain');
  res.redirect('/');
});

module.exports = router;
