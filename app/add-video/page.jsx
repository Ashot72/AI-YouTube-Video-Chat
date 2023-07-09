"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"

import VideoForm from "@components/VideoForm"
import { validateYouTubeUrl } from "@utils/functions"

const AddVideo = ({closeModal }) => {
 
    const { data: session } = useSession()
    const [submitting, setSubmitting] = useState(false)    
    const [error, setError] = useState("")
    const [video, setVideo] = useState({
        URL: ''
    })

    const addVideo = async(e) => {
        e.preventDefault()
        setSubmitting(true)
        setError("")

        if(!video.URL || !validateYouTubeUrl(video.URL)) {
           alert("Please specify valid video URL.")
           return
        }

        try {
            const response = await fetch("/api/video/new", {
                method: "POST",
                body: JSON.stringify({
                    videoURL: video.URL,
                    userId: session?.id
                })
            })

            if(response.ok) {
                closeModal(true)
            } else {
                setError(response.statusText)
            }
        }catch(e) {
            console.error(e)
            setError(e.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <> 
          <VideoForm
                action="Add"
                video={video}
                setVideo={setVideo}
                submitting={submitting}
                error={error}
                handleSubmit={addVideo}                
                closeModal={closeModal}
            />      
        </>
    )
}

export default AddVideo