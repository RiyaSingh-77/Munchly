import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReelFeed from '../../components/ReelFeed'

const Saved = () => {
    const [savedVideos, setSavedVideos] = useState([])

    const fetchSaved = () => {
        axios.get("http://localhost:3000/api/food/saved", { withCredentials: true })
            .then(response => {
                setSavedVideos(response.data.foodItems || [])
            })
            .catch(() => {})
    }

    useEffect(() => {
        fetchSaved()

        // Refetch when user comes back to this page/tab
        window.addEventListener('focus', fetchSaved)
        return () => window.removeEventListener('focus', fetchSaved)
    }, [])

    return (
        <ReelFeed
            items={savedVideos}
            emptyMessage="No saved videos yet."
        />
    )
}

export default Saved