const express = require('express')
const route = express.Router()
const {add_answer, get_answers} = require('../controller/answer_controller')
const authorize = require('../middleware/auth_mid')

// my user routes
route.post('/add_answer', authorize, add_answer)

route.get('/get_answer/:qid', authorize, get_answers)
// route.post('/GPT', GPT_ANS)


module.exports = route