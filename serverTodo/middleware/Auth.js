const jwt=require('jsonwebtoken')
const { ErrorHandler, tryCatcher } = require('../utility/errorHandler.js')
const User=require('../models/user.js')

const userAuth=tryCatcher(async(req,res,next)=>{
    const token=req.cookies['TodoToken'];
    console.log('todo',token)

    if(!token) return next(new ErrorHandler("Please! Login First to access",401));
    

    const decodedData=jwt.verify(token,process.env.JWT_SECRET);
    const t=await User.findById(decodedData.id);
    if(!t){
        return next(new ErrorHandler("Please! Login First to access",401));

    }
    req.usero=decodedData.id
    next();
})

module.exports={userAuth}