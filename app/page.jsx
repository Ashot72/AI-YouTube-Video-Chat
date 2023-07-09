"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import Video from "@components/Video"
import AddVideo from "./add-video/page"

const Videos = ( ) => {
    const { data: session } = useSession()
    const router = useRouter()
    const searchParams = useSearchParams()
    const action = searchParams.get("action")
    const page = searchParams.get("page")
    
    const [error, setError] = useState("")
    const [videos, setVideos] = useState([])

    useEffect(() => {
      (async() => {
          await fetchVideos()
        })()
  } , [page, session])

    const closeModal = (reload) => {
      router.push("/")
      if(reload) {
        fetchVideos()
      }     
    } 

    const fetchVideos = async () => {
        try {
          if(page && !session?.id) {
            return
          }

          const response = await fetch(page ? `/api/video/my/${session?.id}` : "/api/video")
          const data = await response.json()         
        
          if(response.ok) {
            setVideos(data)
          } else {
            setError(response.statusText)
          }
        } catch(e) {
            console.error(e)
            setError(e.message)
        }
    }

    const updateVideos = (id) => {
       router.back()      
       const updatedVideos = videos.filter(v => v.id !== id)
       setVideos(updatedVideos)  
    }

    return (
      <>
        <div style={{display: "flex",justifyContent: "space-around", marginTop: "50px", flexWrap: "wrap" }}>
          {
           error &&
                 <div 
                    className="alert alert-danger" 
                    role="alert"
                    style={{ textAlign: "center",  width: "80%", top: "20px"}}
                   >
                     <p>{error}</p>
                 </div>  
          }
          {
            videos.map((video) => (
               <Video 
                 key={video.id}
                 setError={setError}
                 page={page}
                 updateVideos={updateVideos}
                 
                 { ...video }
               />
            ))
          }    
         
        </div>
          {
           action &&  <AddVideo closeModal={closeModal} />
          }   
        </>
    )
}

export default Videos