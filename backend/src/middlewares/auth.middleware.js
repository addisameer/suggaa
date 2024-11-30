import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";


export const verifyJWT = async(req , _ , next ) => {
    try {
        const incomingAccessToken = req.cookie?.accessToken || req.header("Authorisation").replace("Bearer ", "");
        if (!incomingAccessToken) {
            throw new ApiError(400 , "Not a valid token ");
        }
        const decodedToken = jwt.verify(incomingAccessToken,process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken._id);
        if (!user) {
            throw new ApiError(401 , "Not a valid user with give jwt token")
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(501 , "Something went wrong while verifying users token");
    }
}