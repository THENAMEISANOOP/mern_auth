import express from 'express';
import mongoose  from 'mongoose';
import dotenv from  'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected mongoDb")
}).catch((err)=>{
    console.log(err)
})

const app = express();


app.listen(300,()=>{
    console.log("server running port 3000 |")
})