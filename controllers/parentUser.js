var express = require('express');
var router = express.Router();
var parentUser = require('../db/models/parentUser')
var User = require('../db/models/User')


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


router.post('/', function(req,res, next){
  parentUser.forge({
    id : req.body.id,    
    referralcode : req.body.referralcode
  })
  .save()
  .then(function (parentUser) {
    res.json({error: false, data: parentUser.toJSON()});
  })
  .catch(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
});


router.get('/:referralcode',function (req, res) {
  var users = User.forge();
   users = users.query({where:{ referralcode: req.params.referralcode }});
   users
   .fetchAll()
   .then(function (users) {
      res.json({error: false, data: users.toJSON()});
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
})


router.put('/update/:referralcode/user/:id', function(req,res) {
  User.forge({id: req.params.id, referralcode : req.params.referralcode})
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
