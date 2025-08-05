import './comments.css'
import Image from '../../components/image/image'
import { useQuery } from '@tanstack/react-query'
import apiRequest from '../../utils/apiRequest'
import {format} from 'timeago.js'
import CommentsForm from './commentsForm'
const Comments = ({id}) => {

    const { isPending, error, data } = useQuery({
        queryKey: ['comments', id],
        queryFn: () => apiRequest.get(`/comments/${id}`).then((res) => res.data)
    })

    if(isPending) return 'Loading...'
    if(error) return "error" + error
    if(!data) return "No comments"

    console.log(data)
    return  (
        <div className="comments">
            <div className="commentList" >
                <span className='commentCount'>{data.length} Comments</span>
                {/* COMMENT SECTION */}
                {data?.map((comment) => (
                    <div className="comment" key={comment._id}>
                        <Image src={comment.user.img || "/general/noAvatar.png"} alt=''/>
                        <div className="commentContent">
                            <span className="commentUsername">{comment.user.displayName}</span>
                            <p className="commentText">{comment.description}</p>
                            <span className='commentTime'>{format(comment.updatedAt)}</span>
                        </div>
                    </div>
                ))}
            </div>
            <CommentsForm id={id}/>
        </div>
    )
}

export default Comments