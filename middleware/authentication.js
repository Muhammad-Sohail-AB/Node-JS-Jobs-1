const User=require('../models/User')
const jwt=require('jsonwebtoken')
const {
    UnauthenticatedError,
  } = require("../errors");
const authMiddleWare=(req,res,next)=>{

    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        console.log('not authorize error')
throw new UnauthenticatedError('not authorized to access this route')
    }
    const token=authHeader.split(" ")[1]
    try {
    
        const {userName,userID}=jwt.verify(token,process.env.JWT_SECRET)
        req.user={userName,userID}
        next()
    } catch (error) {
        throw new UnauthenticatedError('not authorized to access this route')
    }
}
module.exports=authMiddleWare