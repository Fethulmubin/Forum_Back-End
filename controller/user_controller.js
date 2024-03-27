const { json } = require('express');
const dbconnection = require('../DB/dbConfig')
const bcrypt = require('bcrypt')
const {StatusCodes} = require('http-status-codes');
const { use } = require('../routes/user_routes');
const jwt = require('jsonwebtoken')

const register = async (req,res)=>{
    // checking fields are filled
    const { username, firstName, lastName, email, password } = req.body;
  
    if (!username || !firstName || !lastName || !email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please enter values for all fields." });
    }
    if(password.length < 8){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:'the password must contain at least 8 character'})
    }
    if(!email.includes('@') || !email.includes('.')){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:'invalid email'})
    }

    try {
        // checking already registerd account
        const [user] =  await dbconnection.query("SELECT user_name, user_id FROM users WHERE user_name = ? or email = ?",[username, email])
        if(user.length > 0){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:"already registered email or username"})
        }
        const random = await bcrypt.genSalt(10)
        const encrypted_pass = await bcrypt.hash(password,random)
        // inserting in to DB
        await dbconnection.query("INSERT INTO `users`(`user_name`, `first_name`, `last_name`, `email`, `passowrd`) VALUES(?, ?, ?, ?, ?)" ,[username, firstName, lastName, email, encrypted_pass] );
        return res.status(StatusCodes.CREATED).json({msg:"user registered"})
        
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something wrong"}) 
      
    }
}

const login = async (req,res)=>{
    // res.send('logged in')
    const {email ,password} = req.body;
    if(!email || !password){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"please fill all fields"})
    }
    try {
       
        const [user] =  await dbconnection.query("SELECT `user_id`, `user_name`, `passowrd` FROM `users` WHERE `email` = ?", [email])
        // return res.json({user:user})
        if(user.length == 0){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:"invalid account"})
            
        }

        // compairing password
       const isSame = await bcrypt.compare(password, user[0].passowrd)
    //    res.send.json({isSame})
       if(!isSame){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"invalid password"})
       }
    //    singning the token 
    const username = user[0].user_name;
    const userid = user[0].user_id;
    //    const {username,userid}=[user[0].user_name,user[0].user_id]
      const token = jwt.sign({username:username, userid:userid},process.env.ENCRYPTION,{expiresIn: "40d"})
       return res.status(StatusCodes.CREATED).json({msg:"logged in",token, username})

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something wrong"}) 
    }
}

const check = async (req,res)=>{
    const username = req.user.username
    const userid = req.user.userid
    
    // console.log(username)
    return res.status(StatusCodes.OK).json({msg:"valid account",username,userid})
    
   
}


module.exports = {check,register,login}
// const questionId = req.params.questionid;
//   const userid = req.user.userid;
//   const answerText = req.body.answer;