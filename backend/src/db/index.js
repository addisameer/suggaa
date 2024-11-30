import 'dotenv/config'
import mongoose from "mongoose";

import {ApiError} from "../utils/ApiError.js";
import { DB_NAME } from "../constants.js";

export const connectDb = async() => {
    try {
      const response = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);;
      if(!response){
        console.log("Db connection failed");
      }
      console.log("connected to db , Host : ",response.connection.host);
      return response;
    } catch (error) {
        console.error("Something went wrong while connecting to database");
    }
}