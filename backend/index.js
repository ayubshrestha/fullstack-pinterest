import express from "express";
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import pinRouter from './routes/pin.route.js'
import boardRouter from './routes/board.route.js'
import commentRouter from './routes/comment.route.js'
import connectDB from "./utils/connectDB.js"
import cors from "cors"
dotenv.config();

const app = express()

app.use(express.json())
app.use(cors({origin:process.env.CLIENT_URL}))
app.use("/users", userRouter)
app.use("/pins", pinRouter)
app.use("/comments", commentRouter)
app.use("/boards", boardRouter)

app.listen(3000, () => {
    connectDB()
    console.log("Server is running")
})