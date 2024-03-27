const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
async function authorize(req, res, next){
    const authHead = req.headers.authorization;
    if(!authHead || !authHead.startsWith('Bearer')){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"No token"})
    }
    const token = authHead.split(" ")[1];
    try {
        const {username,userid} = jwt.verify(token, process.env.ENCRYPTION)
        req.user = {username, userid}
        next();
        // return res.status(StatusCodes.OK).json({username,userid})
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"Unauthorized user"})
    }
}
module.exports = authorize;
