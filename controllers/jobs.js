const jwt=require('jsonwebtoken')
const Job=require('../models/Job')
const 
{
    NotFoundError,
}=require('../errors')
const { StatusCodes } = require('http-status-codes')
const createJob=async(req,res)=>{
req.body.createdBy=req.user.userID
const job=await Job.create({...req.body})
res.status(StatusCodes.CREATED).json({user:req.user,job})
}
const getAllJobs=async(req,res)=>{
const {userID}=req.user;
const jobs=await Job.find({createdBy:userID})
res.status(StatusCodes.OK).json({user:req.user,numOfHits:jobs.length,jobs})
}
const getJob=async(req,res)=>{
 const {userID}=req.user;
 const {id}=req.params;

 const job=await Job.findOne({_id:id,createdBy:userID}) 
 if(!job){
    throw new NotFoundError(`could not find a job with id:${id}`)
 }  
 res.status(StatusCodes.OK).json({user:req.user,job})
}
const updateJob=async(req,res)=>{
    const {userID}=req.user;
    const {id}=req.params;
   
    const job=await Job.findOneAndUpdate({_id:id,createdBy:userID},{...req.body},{runValidators:true,new:true}) 
    if(!job){
       throw new NotFoundError(`could not find a job with id:${id}`)
    }  
    res.status(StatusCodes.OK).json({user:req.user,job})
}
const deleteJob=async(req,res)=>{
    const {userID}=req.user;
    const {id}=req.params;
   
    const job=await Job.findOneAndDelete({_id:id,createdBy:userID}) 
    if(!job){
       throw new NotFoundError(`could not find a job with id:${id}`)
    }  
    res.status(StatusCodes.OK).json({user:req.user,job})
}
module.exports={ createJob,
    deleteJob,
    getAllJobs,
    updateJob,
    getJob,}