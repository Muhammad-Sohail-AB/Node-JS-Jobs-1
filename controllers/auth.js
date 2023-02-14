const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../errors");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const reqUser = { userName:name, email, password };
  const user = await User.create(reqUser);
  const token = user.genToken()
  res.status(StatusCodes.CREATED).json({ user:{userName:name,userID:user._id}, token });

  res.send("register");
};
const login = async (req, res) => {
    const {email,password}=req.body
    if(!email || ! password){
        throw new BadRequestError('please provide the credentails')
    }
    const user=await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError('unauthenticated user')
    }
    const isPasswordTrue=await user.comparePasswords(password)
    if(!isPasswordTrue){
        throw new UnauthenticatedError('unauthenticated user')
    }
  const token=user.genToken()
  res.status(StatusCodes.CREATED).json({user:{userName:user.userName,userID:user._id}, token });
  };
module.exports = { login, register };
