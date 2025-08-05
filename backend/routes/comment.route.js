import express from "express"
import { getComments, addComment } from "../controllers/comment.controller.js"
import { verifyToken } from "../middlewares/verifyToken.js"

const router = express.Router()

router.get('/:postId', getComments)
router.post('/', verifyToken, addComment)
export default router