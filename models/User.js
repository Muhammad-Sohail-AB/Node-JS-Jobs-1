const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const UserSchema=mongoose.Schema()
const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Please provide name'],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    // these regular expressions are really important
    // they are widely used in our day to day programming
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
});
UserSchema.pre('save',async function(next){
  const salt=await bcrypt.genSalt(10)
  this.password=await bcrypt.hash(this.password,salt)
})
UserSchema.methods.genToken=function(){
  const token=jwt.sign({userName:this.name,userID:this._id}, process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_TOKEN_LIFE })
  return token
}
UserSchema.methods.comparePasswords=async function(canditatePassword){
  const isPasswordCorrect=await bcrypt.compare(canditatePassword,this.password)
  return isPasswordCorrect
}
module.exports = mongoose.model('User', UserSchema);
