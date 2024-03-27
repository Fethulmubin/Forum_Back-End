const express = require('express')
const route = express.Router()
const {register,login,check} = require('../controller/user_controller')
const authorize = require('../middleware/auth_mid')

// my user routes
route.post('/register', register)

route.post('/login', login)

route.get('/check', authorize, check )
module.exports = route