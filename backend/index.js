import express from "express";
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'

dotenv.config();

const app = express()

app.use("/users", userRouter)

app.listen(3000, () => {
    console.log("Server is running")
})