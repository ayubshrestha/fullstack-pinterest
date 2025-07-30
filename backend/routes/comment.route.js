import express from "express"

const router = express.Router()

router.get("/test" , (req,res) => {
    return res.json("Hello from comment router")
})

export default router