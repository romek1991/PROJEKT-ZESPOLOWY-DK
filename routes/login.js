var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');

router.post('/', function(req, res, next) {
  console.log('POST /login');
  
  // find the user
  User.findOne({
    login: req.body.login
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        console.log('user.password:' + user.password + ' | req.body.password:' + req.body.password);
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        // if user is found and password is right
        // create a token
        var token = jwt.sign({login: user.login}, req.app.get('superSecret'), {
          expiresIn: 60 // time in seconds
        });

        // return the information including token as JSON
        res.json({
          success: true,
          token: token
        });
      }   

    }

  });
  
});

module.exports = router;