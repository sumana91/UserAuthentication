var express = require('express')
var UserAuthentication = require('../db/models/User')
var router = express.Router()
var crypto = require('crypto')
var promise = require('bluebird')
var bcrypt = require('bcrypt-nodejs')

router.post('/', function(req,res, next){
  
  var status = ''
  var message = ''
  var errorFlag = ''

  var data = {
    username : '',
    password : '',
    email: ''
  }

  if(!req.body.username){
    return res.json({status:403,message:'Username missing'})
  }
  else{
    data.username = req.body.username
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

  UserAuthentication.fetchAll({
    columns : ['username','email']
  })
    .then(function(result) {
      for(var i=0; i<result.models.length;i++){
        if(data.email == result.models[i].attributes.email){
          return res.status(409).json({error:true,status:409,
            message:'Email already registered'})
        }
        if (data.username == result.models[i].attributes.username){
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
})

module.exports = router
