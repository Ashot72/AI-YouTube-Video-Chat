import { embedUrl, extractVideoId } from "@utils/functions"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import * as timeago from "timeago.js"

const Video = ({id, url, userId, summarization, createdAt, setError, updateVideos, page } ) => {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)   
  const { data: session } = useSession()

    const confirmDelete =async  ( ) => {
        setError("")
        var result = confirm("Are you sure to delete the video?");
        if (result) {
            setDeleting(true)
            try {
               const response = await fetch(`/api/video/${id}`, {
                method: "DELETE",
                body: JSON.stringify({
                    userId: session?.id
                })
              })

              if(response.ok) {
                updateVideos(id)
             } else {
                setError(response.statusText)
             }
          }catch(e) {
            console.error(e)
            setError(e.message)
          }finally {
            setDeleting(false)
          }
        }        
    }

    return (
        <div className="card" style={{width: "500px", minWidth: "500px", margin: "30px"}}>
            <div className="d-flex flex-row align-items-center mb-4">
                  <iframe src={embedUrl(url)} title="video" width="100%" height="250"></iframe>
            </div>
        <div className="card-body">
            <h3 className="card-title">Summarization</h3> 
            <div style={{display: "flex", justifyContent: "flex-end", fontWeight: "600"}}>
             Created:  {timeago.format(createdAt)}
            </div>           
            <p className="card-text">{ summarization }</p>
            <div style={{ display: "flex", justifyContent: "flex-end"}}>
              <button className="btn btn-primary" style={{margin: "5px"}} onClick={() => router.push(`/chat/${extractVideoId(url)}`)}>Chat</button>
              {
                session?.id === userId && page &&
                  <button disabled={deleting} className="btn btn-secondary" style={{margin: "5px"}} onClick={confirmDelete}>
                    { deleting ? 'Deleting...': 'Delete' }
                  </button>
              }
            </div>           
        </div>
        </div>
    )
}

export default Video