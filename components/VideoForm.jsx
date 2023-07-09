"use client"

import { embedUrl, validateYouTubeUrl } from '@utils/functions'
import { useRef, useEffect } from "react"

const VideoForm = ({ action, video, setVideo, submitting, error, handleSubmit, closeModal }) => {
   const urlInputRef = useRef(null)

   useEffect(() => urlInputRef.current.focus(), [])

   const close = () => closeModal()

  return (
    <form onSubmit={ handleSubmit }>
        <div className="modal" tabIndex="-1" style={{display: "block" }}>
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="videoModalLabel">
                 {action} YouTube Video URL
              </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={close}
            >

            </button>
            </div>
            <div className="modal-body">
            { video && video.URL && validateYouTubeUrl(video.URL) &&
                <div className="d-flex flex-row align-items-center mb-4">
                  <iframe src={embedUrl(video.URL)} title="video" width="100%" height="250"></iframe>
                </div>
             }
              <div className="d-flex flex-row align-items-center mb-4">
                <div className="form-outline flex-fill mb-0">
                    <input
                      className="form-control"
                      style={{width: "100%"}}
                      placeholder='e.g. https://www.youtube.com/watch?v=A5uMNMAWi3E'
                      ref={urlInputRef}
                      value={video.URL}
                      onChange={(e) => setVideo({ ...video, URL: e.target.value })}                 
                    />
                </div>
              </div>
            </div>
            <div className="modal-footer">
                {error &&
                 <div 
                    className="alert alert-danger" 
                    
                    role="alert"
                    style={{ textAlign: "center", width: "100%" }}
                   >
                     <p>{error}</p>
                 </div>  
                }
                { submitting && <div>"Wait... we are obtaining the video transcript, summarizing it, and creating an index."</div> }
                <button 
                className="btn btn-primary"
                type='submit'
                disabled={submitting}
                >             
                { submitting ? `${action}ing...`: action }
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={ close }
                >
                    Close
                </button>
            </div>
            </div>
        </div>
        </div>
    </form>
  )
}

export default VideoForm