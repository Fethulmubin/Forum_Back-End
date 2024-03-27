const express = require('express')
const route = express.Router()
const {ask,all_que,single_que} = require('../controller/question_controller')
const authorize = require('../middleware/auth_mid')

// my user routes
route.post('/ask',authorize,ask)

route.get('/all_que',authorize, all_que)

route.get('/single_que/:id',authorize, single_que )
module.exports = route