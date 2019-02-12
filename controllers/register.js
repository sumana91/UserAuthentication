var express = require('express')
var UserAuthentication = require('../db/models/User')
var parentUser = require('../db/models/parentUser')
var childUser = require('../db/models/childUser')
var router = express.Router()
var crypto = require('crypto')
var promise = require('bluebird')
var bcrypt = require('bcrypt-nodejs')
var configFile = require('./config')

//Endpoint for parent user registeration
router.post('/parentUser', function(req,res,next) {

  var status = ''
  var message = ''
  var errorFlag = ''

  var data = {
    firstname : '',
    lastname: '',
    password : '',
    email: ''
  }

  var parent_data = {
    referral_code : '',
    user_id: ''
  }

  if(!req.body.firstname) {
    return res.json({status:403,message:'firstname missing'})
  }
  else {
    data.firstname = req.body.firstname
  }
  if(!req.body.password) {
    return res.json({status:403,message:'Password missing'})
  }
  else {
    data.password = req.body.password
  }
  if(!req.body.email){
    return res.json({status:403,message:'email missing'})
  }
  else{
    data.email = req.body.email
  }

  UserAuthentication.fetchAll({
    columns : ['firstname','email']
  })
  .then(function(result) {
    for(var i=0; i<result.models.length;i++){
      if(data.email == result.models[i].attributes.email){
        return res.status(409).json({error:true,status:409,
          message:'Email already registered'})
        }
        if (data.firstname == result.models[i].attributes.firstname){
          return res.status(409).json({error:true,status:409,
            message:'Username already registered'})
          }
        }
        var salt = configFile.salt
        var hashGenerationPromise = promise.promisify(crypto.randomBytes)
        hashGenerationPromise(configFile.bytesForHash)
        .then(function(buffer){
          return buffer.toString('hex')
        })
        .then(function(){
         return bcrypt.hashSync(req.body.password, salt)
       })
       .then(function(result){
        data.password = result
        var UserTable = new UserAuthentication()
        return UserTable.save(data)
      })
      .then(function(result){
        console.log('line 78 result', result)
        var referral_code = Math.random().toString(36).substring(7);
        parent_data.referral_code = referral_code
        parent_data.user_id = result.get('id')
        var parentTable = new parentUser()
        return parentTable.save(parent_data)
      })
      .then(function(){
        errorFlag = false
        status = 200
        message = 'User registered successfully'
      })
      .catch(TypeError,ReferenceError,RangeError,function(error){
        errorFlag = true
        status = 501
        console.log(error)
        message = error.stack
      })
      .finally(function(){
        res.json({error:errorFlag,status:status,message:message})
      })
    })
})

//Endpoint for child user registeration using referral_code
router.post('/childUser', function(req,res, next){
  var status = ''
  var message = ''
  var errorFlag = ''

  var data = {
    firstname : '',
    password : '',
    email: ''
  }

  var child_data = {
    referral_code : '',
    userId : ''
  }

  if(!req.body.referral_code){
    return res.json({status:403,message:'referral_code missing'})
  }
  else{
    child_data.referral_code = req.body.referral_code
  }
  if(!req.body.firstname){
    return res.json({status:403,message:'firstname missing'})
  }
  else{
    data.firstname = req.body.firstname
  }
  if(!req.body.password){
    return res.json({status:403,message:'Password missing'})
  }
  else{
    data.password = req.body.password
  }
  if(!req.body.email){
    return res.json({status:403,message:'email missing'})
  }
  else{
    data.email = req.body.email
  }

  parentUser.where({referral_code : child_data.referral_code})
  .fetch({columns:['referral_code']})
  .then(function (result) {
    if (!result) {
      res.status(404).json({error: true, data:{message: 'referral code is not valid'}});
    }else {
      UserAuthentication.fetchAll({
        columns : ['firstname','email']
      })
      .then(function(result) {
        for(var i=0; i<result.models.length;i++){
          if(data.email == result.models[i].attributes.email){
            return res.status(409).json({error:true,status:409,
              message:'Email already registered'})
            }
            if (data.firstname == result.models[i].attributes.firstname){
              return res.status(409).json({error:true,status:409,
                message:'Username already registered'})
              }
            }
            var salt = configFile.salt
            var hashGenerationPromise = promise.promisify(crypto.randomBytes)
            hashGenerationPromise(configFile.bytesForHash)
            .then(function(buffer){
              return buffer.toString('hex')
            })
            .then(function(){
              return bcrypt.hashSync(req.body.password, salt)
            })
            .then(function(result){
              data.password = result
              var UserTable = new UserAuthentication()
              return UserTable.save(data)
            })
            .then(function(result) {
              child_data.userId = result.get('id')
              var childTable = new childUser()
              return childTable.save(child_data)
            })
            .then(function(){
              errorFlag = false
              status = 200
              message = 'User registered successfully'
            })
            .catch(TypeError,ReferenceError,RangeError,function(error){
            errorFlag = true
            status = 501
            console.log(error)
            message = error.stack
          })
          .finally(function(){
          res.json({error:errorFlag,status:status,message:message})
          })
        })
      }
    })
})

module.exports = router
