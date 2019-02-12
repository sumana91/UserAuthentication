var express = require('express');
var router = express.Router();
var parentUser = require('../db/models/parentUser')
var User = require('../db/models/User')
var childUser = require('../db/models/childUser')

//Endpoint to list all the parent users
router.get('/', function(req,res, next){
  parentUser
  .fetchAll()
  .then(function (collection) {
    res.json({error: false, data: collection.toJSON()});
  })
  .catch(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
})

//Endpoint to list all the child users using referral code
router.get('/:referral_code',function (req, res) {
  var childUsers = childUser.forge();
   childUsers = childUsers.query({where:{referral_code: req.params.referral_code }});
   childUsers
   .fetchAll()
   .then(function (users) {
      res.json({error: false, data: users.toJSON()});
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
})

//Endpoint to update/edit the child users profile
router.put('/update/childuser/:userId', function(req,res) {
  User.forge({id: req.params.userId })
  .fetch({require: true})
  .then(function (users) {
    users.save({
      firstname: req.body.firstname || users.get('firstname'),
      lastname: req.body.lastname || users.get('lastname'),
      phone: req.body.phone || users.get('phone'),
      email: req.body.email || users.get('email'),
    })
    .then(function () {
      res.json({error: false, data: {message: 'user details updated'}});
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  .catch(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
})

module.exports = router
