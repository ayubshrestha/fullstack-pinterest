import express from "express"

const router = express.Router()

router.get("/test" , (req,res) => {
    return res.json("Hello from board router")
})

export default router