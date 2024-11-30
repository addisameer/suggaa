import 'dotenv/config'
import mongoose from "mongoose";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from '../utils/ApiError.js';

const userSchema = new mongoose.Schema({
    mobileNumber: {
        type: String,
        required: [true, 'Mobile number is required'],
        unique: true,
        match: [/^\d{10}$/, 'Mobile number must be 10 digits'],
      },
   fullName: {
        type : String,
        required : true,
        unique : true
    },
    email :  {
        type : String,
        required : true,
        unique : true
    },
    profilePicture: {
        type: String,
        required: [true, 'Profile picture is required'],
    }
   
},{timestamps : true })
userSchema.pre('save' , async function(next) {
    this.password = await bcrypt.hash(this.password ,process.env.GEN_SALT);
    next();
});
userSchema.methods.isPasswordCorrect  = async function (password){
    console.log(this.password);
    console.log(await bcrypt.hash(password , process.env.GEN_SALT));
    return await bcrypt.compare(password , this.password);
}
userSchema.methods.generateAccessToken = function (){
     return  jwt.sign(
         {
             _id : this._id,
             email : this.email,
             userName : this.userName,
             fullName : this.fullName
         },
         process.env.ACCESS_TOKEN_SECRET,
         {
             expiresIn : process.env.ACCESS_TOKEN_EXPIRY   
         }
 
     )
}
userSchema.methods.generateRefreshToken  =  function (){
   try {
     return jwt.sign(
         {
             _id : this._id
         },
         process.env.REFRESH_TOKEN_SECRET,
         {
             expiresIn : process.env.REFRESH_TOKEN_EXPIRY   
         }
 
     )
   } catch (error) {
    throw new ApiError(500 ,"error while generating access token .")
   }
}
export const User = mongoose.model("User" , userSchema)