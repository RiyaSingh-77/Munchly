import React, { useEffect, useState } from 'react'
import axios from '../../utils/axios';
import '../../styles/reels.css' 
import ReelFeed from '../../components/ReelFeed'
import CommentModal from '../../components/CommentModal'

const Home = () => {
    const [ videos, setVideos ] = useState([])

    useEffect(() => {
        axios.get("https://zomato-backend-ajqm.onrender.com/api/food", { withCredentials: true })
            .then(response => {
                console.log(response.data);
                setVideos(response.data.foodItems)
            })
            .catch(() => { /* noop: optionally handle error */ })
    }, [])

    async function likeVideo(item) {
        try {
            const response = await axios.post("https://zomato-backend-ajqm.onrender.com/api/food/like", { foodId: item._id }, {withCredentials: true})

            if(response.data.like){
                console.log("Video liked");
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: (v.likeCount || 0) + 1 } : v))
            }else{
                console.log("Video unliked");
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: (v.likeCount || 0) - 1 } : v))
            }
        } catch (err) {
            console.error(err);
        }
    }

    async function saveVideo(item) {
        try {
            const response = await axios.post("https://zomato-backend-ajqm.onrender.com/api/food/save", { foodId: item._id }, { withCredentials: true })
            
            if(response.data.save){
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: (v.savesCount || 0) + 1 } : v))
            }else{
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v,savesCount: Math.max(0, (v.savesCount || 0) - 1) } : v))
            }
        } catch (err) {
            console.error(err);
        }
    }

    // -- Comment modal state and handlers (frontend-only fallback)
    const [ commentOpen, setCommentOpen ] = useState(false)
    const [ activeItem, setActiveItem ] = useState(null)

    function openComment(item){
        setActiveItem(item)
        setCommentOpen(true)
    }

    function handleSubmitComment(text, item){
        // Increment local comment count to give immediate feedback
        setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, commentCount: (v.commentCount || 0) + 1 } : v))
        // Note: backend comment endpoint not present; this is a frontend-only behavior
    }

    return (
        <>

            <ReelFeed
                items={videos}
                onLike={likeVideo}
                onSave={saveVideo}
                onComment={openComment}
                emptyMessage="No videos available."
            />

            <CommentModal
                open={commentOpen}
                item={activeItem}
                onClose={() => setCommentOpen(false)}
                onSubmit={handleSubmitComment}
            />
        </>
    )
}

export default Home;