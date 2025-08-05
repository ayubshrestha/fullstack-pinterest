import Comment from "../models/comment.model.js"
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const getComments = async(req,res) => {
    const { postId } = req.params

    const comments = await Comment.find({pin: postId}).sort({createdAt: -1}).populate({
        path: "user",
        select: "username img displayName"
    })

    res.status(200).json(comments)
}

export const addComment = async (req,res) => {
    const {description, pin} = req.body;
    const userId = req.userId;
    const comment = await Comment.create({
        description,
        pin,
        user: userId
    })
    res.status(200).json(comment)
}