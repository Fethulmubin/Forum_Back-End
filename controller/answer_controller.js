const {v4 : uuidv4} = require('uuid')
const { json } = require('express');
const dbconnection = require('../DB/dbConfig')
const {StatusCodes} = require('http-status-codes');
const { use } = require('../routes/user_routes');

const add_answer = async (req,res)=>{
    // res.send("add answer")
    const {answer,questionid} = req.body;
    const {userid} = req.user;
    // console.log(answer)
    // console.log(questionid)

    if(!answer){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"please fill the answer"})
    }
    try {
        // await dbconnection.query("SELECT * FROM questions WHERE question_id = ?", [questionid])
    await dbconnection.query("INSERT INTO `answers`(`user_id`, `question_id`, `answer`) VALUES (?,?,?)", [userid,questionid,answer])	
        return res.status(StatusCodes.CREATED).json({msg:"answer added"})

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"somethig wrong"})
    }

}
const get_answers = async (req,res)=>{
    // res.send("answers page")
    const questionid = req.params.qid
    const user_name = req.user.username;
    try {
        const [answers] = await dbconnection.query("SELECT * FROM answers WHERE question_id = ?", [questionid])
        return res.status(StatusCodes.OK).json(answers)
    } catch (error) {
        
    }
}

module.exports = {add_answer,get_answers}