const {v4 : uuidv4} = require('uuid')
const { json } = require('express');
const dbconnection = require('../DB/dbConfig')
const {StatusCodes} = require('http-status-codes');
const { use } = require('../routes/user_routes');
// import OpenAI from 'openai';
// const OpenAI = require('openai')
 
// const openai = new OpenAI( {apiKey: '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'})
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
// const GPT_ANS = async (req,res)=>{
//      const completion = await openai.chat.completions.create({
//               messages: [{ role: "user", content: "You are a helpful assistant." }],
//               model: "gpt-3.5-turbo",
//             });
//             return res.status(StatusCodes.OK).json({completion})

// }
module.exports = {add_answer,get_answers}