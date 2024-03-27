const {v4 : uuidv4} = require('uuid')
const { json } = require('express');
const dbconnection = require('../DB/dbConfig')

const {StatusCodes} = require('http-status-codes');
const { use } = require('../routes/user_routes');




const ask = async (req,res)=>{
    // res.send("ask")
    const {title, description, tag} = req.body;
    // generating id for questons
    const questionid = uuidv4();
    // console.log(questionid)
    // extracting userid and username from authMidd through next()
    const quserid = req.user.userid
    const qusername = req.user.username
    // console.log(quserid)
    // console.log(qusername)
    // console.log(questionid)
    if(!title || !description){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"fill all the required fileds"})
    }
    try {
       const add_que = "INSERT INTO `questions`(`question_id`, `user_id`, `title`, `description`, `tag`) VALUES (?,?,?,?,?)"
        await dbconnection.query(add_que, [questionid, quserid, title, description,tag])
        return res.status(StatusCodes.CREATED).json({msg:"question posted"})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Something wrong"})
    }
}
const all_que = async (req,res)=>{
    // res.send("all question")
    try {
        const [questions] = await dbconnection.query("SELECT questions.id, questions.question_id,questions.user_id, questions.title, users.user_name FROM questions INNER JOIN users ON questions.user_id = users.user_id ORDER BY questions.id DESC");
        if(questions.length == 0){
            res.status(StatusCodes.OK).json({msg:"no questions asked"}) 
        }
       return res.status(StatusCodes.OK).json([questions])
    } catch (error) {
       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Something wrong"}) 
    }
    
}
const single_que = async (req,res)=>{
    const qid = req.params.id //in the statment req.params.id (id must same name as rout :id)
    try {
        const [S_question] = await dbconnection.query("SELECT * FROM questions WHERE question_id = ?",[qid])
   return  res.status(StatusCodes.OK).json(S_question[0]) 
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something wrong"})
    }
   
    // res.send("single question")
   
}
module.exports = {ask,all_que,single_que}