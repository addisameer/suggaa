import 'dotenv/config'
import { app } from "./app.js";

import { connectDb } from './db/index.js';
import { ApiError } from './utils/ApiError.js';

const port = process.env.PORT || 8000
connectDb()
.then(()=>{
    app.listen(port , ()=> {
        console.log(`server is listening on the port ${port}`);
    });
})
.catch(()=>{
    throw new ApiError(501 , "Database connection failed")
})