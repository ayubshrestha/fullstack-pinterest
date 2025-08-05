import './profilePage.css'
import { useState } from 'react'
import Image from '../../components/image/image'
import Gallery from '../../components/gallery/gallery'
import Boards from '../../components/boards/boards'
import { useQuery } from '@tanstack/react-query'
import apiRequest from '../../utils/apiRequest'
import { useParams } from 'react-router'

const ProfilePage = () => {

    const [type, setType] = useState("created")
    const {username} = useParams()
    const { isPending, error, data } = useQuery({
        queryKey: ["user", username],
        queryFn: () => apiRequest.get(`users/${username}`).then((res) => res.data)
    })

    if(isPending) return 'Loading...';
    if(error) return 'Error fetching User';
    if(!data) return 'User not found'

    return (
        <div className="profilePage">
            <Image className="profileImg" w={50} h={50} src={data.img || '/general/noAvatar.png'}alt=''/>
            <h1 className='profileName'>{data.displayName}</h1>
            <span className='profileUsername'>@{data.username}</span>
            <div className='followCounts'>10 Followers 20 Followings</div>
            <div className="profileInteractions">
                <Image path="/general/share.svg" alt=''/>
                <div className="profileButtons">
                    <button>Message</button>
                    <button>Follow</button>
                </div>
                <Image path="/general/more.svg" alt=""/>
            </div>
            <div className="profileOptions">
                <span onClick={() => setType("created")} className={type === 'created' ? 'active': ''}>Created</span>
                <span onClick={() => setType("saved")} className={type === 'saved' ? 'active': ''}>Saved</span>
            </div>
            { type === 'created' ? <Gallery userId={data._id}/> : <Boards userId={data._id}/>}
        </div>
    )
}

export default ProfilePage