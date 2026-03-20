import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReelFeed from '../../components/ReelFeed'

const Saved = () => {
    const [savedVideos, setSavedVideos] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/api/food/saved", { withCredentials: true })
            .then(response => {
                setSavedVideos(response.data.foodItems || [])
            })
            .catch(() => {})
    }, [])

    return (
        <ReelFeed
            items={savedVideos}
            emptyMessage="No saved videos yet."
        />
    )
}

export default Saved
