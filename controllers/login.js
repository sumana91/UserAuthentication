var express = require('express')
var UserAuthentication = require('../db/models/User')
var router = express.Router()
var bcrypt = require('bcrypt-nodejs')
var jsonWebToken = require('jsonwebtoken')
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy (
  function(username, password, done) {
    var userRegex = new RegExp(/\S+/)
    var usernameMatch = username.match(userRegex)
    var databaseMatchParameter = {}

    if(usernameMatch) {
      databaseMatchParameter = {'firstname': username}
    } else {
      return done(null, false, { message: 'username format is wrong' })
    }

    new UserAuthentication(databaseMatchParameter)
    .fetch()
    .then(function(result){
      if(!result) {
        return done(null, false, { message: 'Incorrect username' })
      } else {
        var res = bcrypt.compareSync(password, result.attributes.password)
        if(res) {
          return done(null, result)
        } else {
          return done(null, false, { message: 'Incorrect password. Please'
              + ' enter the password again'})
            }
          }
      })
      .catch(function(error) {
        return done(error)
      })
    }
))

router.post('/', function(req,res, next) {
  passport.authenticate('local', function(err, user, info) {
    if(err) {
      return res.status(500).json({status:500,message:'Internal Server error',data:err})
    }
    if(!user) {
      return res.status(401).json({status:401,message:info.message,data:''})
    }
    const token = jsonWebToken.sign({id: user.id},'secret',{expiresIn: '168h'})
    return res.json({status:200,message:'Login Success', token: token})
  }) (req, res, next)
})

module.exports = router
