const cors = require('cors')
const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT;
const user_routes = require('./routes/user_routes')
const question_routes = require('./routes/question_routes')
const answer_routes = require('./routes/answer_routes')



const dbconnection = require('./DB/dbConfig')

// user routes middleware
app.use(cors())
app.use(express.json())
app.use('/api/users',user_routes)
app.use('/api/questions',question_routes)
app.use('/api/answers',answer_routes)


async function begin(){
    try {
       const value = await dbconnection.execute("select'test'")
        await app.listen(port)
        console.log(value)
        console.log('connected')
    } catch (error) {
        console.log(error)
    }  
}
begin()

// app.listen(port, (err)=>{
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log(`connceted to ${port}`)
//     }
   
// })