import EmojiPicker from 'emoji-picker-react'
import { useState } from 'react'
import apiRequest from "../../utils/apiRequest.js"
import './comments.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const addComment = async (comment) => {
    const res = await apiRequest.post(`/comments`, comment);
    return res.data
}

const commentsForm = ({id}) => {

    const [open, setOpen] = useState(false) 
    const [comment, setComment] =useState("")

    const handleEmojiClick = (emoji) => {
        setComment((prev) => prev + emoji.emoji)
        setOpen(false)
    }
    
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: addComment,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['comments',id]})
            setComment("")
            setOpen(false)
        }
    })

    const handleSubmit = async(e) => {
        e.preventDefault()

        mutation.mutate({
            description: comment,
            pin: id
        })
    }
    return (
        <form className='commentForm' type='submit' onSubmit={handleSubmit}>
                <input type="text" placeholder='Add a comment' onChange={(e) => setComment(e.target.value)} value={comment}/>
                <div className="emoji">
                    <div onClick={() => setOpen((prev) => !prev)}>🙂</div>
                    {open && (
                        <div className="emojiPicker">
                            <EmojiPicker onEmojiClick={handleEmojiClick}/>
                        </div>)}
                    
                </div>
            </form>
    )
}

export default commentsForm