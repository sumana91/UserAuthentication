var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var logger = require('morgan')
var passport = require('passport')
var port = 8001

var login = require('./controllers/login')
var register = require('./controllers/register')
var parentUser = require('./controllers/parentUser')
var app = express()

app.use(bodyParser.json())
app.set('view engine', 'ejs')

// Public Folder
app.use(express.static('./public'))
app.use('/register',register)
app.use('/login',login)
app.use('/parentUser', parentUser)

app.listen(port, function (){
	console.log("Listening on", port)
})


module.exports = app
