import express from "express"
const app = express();

import bodyParser from "body-parser";
import cors from "cors";

//configuration.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit : "100kb"}));
app.use(cors());


app.get("/", (req,res)=>{
    res.send("Suggaa backend");
})


//routing
import userRouter from "./routes/user.route.js";
app.use("/api/v1/users",userRouter);

export {app}