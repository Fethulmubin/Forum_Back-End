const mysql = require('mysql2')
const dbconnection = mysql.createPool({
    user:process.env.USER,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    password:process.env.DB_PASSWORD,
    connectionLimit:'10'

})
// dbconnection.execute("select'test'",(err, res)=>{
//     if(err){
//         console.log(err.message)
//     }
//     else{
//         console.log(res)
//     }
// })
module.exports = dbconnection.promise()