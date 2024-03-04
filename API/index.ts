
import express, { Express ,Request ,Response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors'

const app:Express = express();
app.use(cors())
app.use(bodyParser.json());
dotenv.config()


const port =process.env.PORT ||3000 ;
app.use(express.json());
// ========== import routes

import userRoute from  './route/userRouter';
import taskRoute from "./route/taskRouter";

mongoose
  .connect("mongodb://127.0.0.1:27017/TaskApp")
  .then(() => {
    app.listen(port, () => {
      console.log(`server is up and running on ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/", (req, res) => {
   console.log(req.body);
   res.json({ data: "it works" });
 });
 

 app.use("/api/v1/user" , userRoute )
 app.use("/api/v1/task" , taskRoute )