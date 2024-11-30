import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { generateOtp } from "../services/user.service.js";

const generateAccessAndRefreshTokens = async(userId) => {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save();
        return {accessToken , refreshToken}
    
}
const registerUser = asyncHandler(async(req,res)=>{
        const {userName , email , password , fullName } = req.body;
        if(!(userName && email && password)){
            throw new ApiError(401 , "Please fill all the required field .")
        }
        const alreadyRegisteredUser = await User.findOne({email});
        if (alreadyRegisteredUser) {
            throw new ApiError(401 , "User is already registered . ")
        }
        console.log("All fine till now ");
        const user = await User.create({
            userName,
            email,
            password,
            fullName
        })
        console.log(user);
        const registeredUser = await User.findById(user._id).select("-password");

        res
        .status(201)
        .json(new ApiResponse(201, registeredUser,  "user registered successfully ."))
})
// const loginUser =asyncHandler(async(req,res)=> {
//     const {userName , email , password  } = req.body;
//     if(!(email || userName) || !password){
//         throw new ApiError(400  , "Please fill all the required field.")
//     }
//     const user = await User.findOne({email});
//     if(!user){
//         throw new ApiError(400  , "User is not registered , Please register .")
//     }
//     if(!(await user.isPasswordCorrect(password))){
//         throw new ApiError(400  , "Invalid password");
//     }
//     const {accessToken , refreshToken } = await generateAccessAndRefreshTokens(user._id);
//     const options = {
//         httpOnly : true,
//         secure : true
//     }
//     const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

//     res
//     .status(200)
//     .cookie("accessToken" , accessToken ,options)
//     .cookie("refreshToken",refreshToken,options)
//     .json(new ApiResponse(200 , {user : loggedInUser ,
//         accessToken,
//         refreshToken
//     }, "LoggedIn successfully"))
//})
const loginUser = asyncHandler(async(req,res) => {
    const {mobileNumber}=req.body ;
    if(!mobileNumber || mobileNumber.length != 10 ){
        throw new ApiError(401 , "Please enter valid mobile number")
    }
    const otp = generateOtp()
    console.log(otp);
})
const logoutUser = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id);
    user.refreshToken = undefined;
    await user.save();
    const options = {
        httpOnly : true ,
        secure : true
    }

    res
    .status(200)
    .clearcookie("accessToken",options)
    .clearcookie("refreshToken",options)
    .json(new ApiResponse(200, {} , "LoggedOut successfully ."))
})
const refreshAccessToken = async(req,res) => {
    const incomingToken = req.cookie?.refreshToken || req.body()?.refreshToken;
    if (!incomingToken) {
        throw new ApiError(400 , "Not a valid token ");
    }
    const decodedToken = jwt.verify(incomingToken,process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decodedToken._id);
    if (!user) {
        throw new ApiError(401 , "Not a valid user with give jwt token")
    }
    const {accessToken, refreshToken } = generateAccessAndRefreshTokens(user._id);
    const newUser = await User.findById(user._id).select("-password");
    const options = {
        httpOnly : true,
        secure : true
    }

    res
    .status(200)
    .cookie("accessToken" , accessToken ,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(200 , newUser, "Token refreshed"))

}

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
}