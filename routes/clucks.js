
const express = require('express');
const knex = require('../db/client');
const router = express.Router();
const friendlyTime = require('friendly-time');

//sign-in
router.get('/sign_in',(request,response) => {
    response.render('clucks/signin');
});

router.post('/sign_in', (req, res) => {
    const COOKIE_EXPIRE = 1000 * 60 * 60 * 24 * 7;
    const username = req.body.uname;
    res.cookie('username', username, { maxAge: COOKIE_EXPIRE });// name = value
    res.redirect('/new_cluck');
  });

// create new cluck
router.get('/new_cluck', (request, response ) => {
  response.render('clucks/newcluck',{username: request.cookies.username});
});

//Inserting
router.post('/new_cluck',(req,res) => {
  knex('clucks')
    .insert({
      username : req.cookies.username,
      image_url: req.body.imageurl,
      content: req.body.content,   
    })
    .returning('*')
    .then(clucks => {
      const cluck = clucks[0]; 
      res.redirect('/index'); 
    });
});

//Index
router.get('/index', (req, res) => { 
  knex('clucks')
    .orderBy('created_at', 'desc') // returns an array of objects
    .then(clucks => {
      const time=(date)=>{
        return friendlyTime(new Date(date))
    }
      res.render('clucks/index', {clucks,time});
    });
});


//sign-out
router.post('/sign_out',(req,res) => {
  res.clearCookie('username')
  res.redirect('/index')
});


module.exports = router;