var express = require('express')
var UserAuthentication = require('../db/models/User')
var parentUser = require('../db/models/parentUser')
var router = express.Router()
var crypto = require('crypto')
var promise = require('bluebird')
var bcrypt = require('bcrypt-nodejs')
var configFile = require('./config')

router.post('/', function(req,res, next){

  var status = ''
  var message = ''
  var errorFlag = ''

  var data = {
    referralcode : '',
    firstname : '',
    password : '',
    email: ''
  }

  if(!req.body.referralcode){
    return res.json({status:403,message:'referralcode missing'})
  }
  else{
    data.referralcode = req.body.referralcode
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

     parentUser.where({referralcode : data.referralcode})
    .fetch({columns:['referralcode']})
    .then(function (result) {
     if (!result) {
        res.status(404).json({error: true, data:{message: 'referral code is not valid'}});
      }
     else {
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
