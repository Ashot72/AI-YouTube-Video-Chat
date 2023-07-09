import { YoutubeTranscript } from "youtube-transcript"

export const generateTranscript = async (videoUrl) => {
   
    const transcriptResponse = await YoutubeTranscript.fetchTranscript(videoUrl)
    
    if(!transcriptResponse) {
        throw new Error(`Cannot get transcript for ${videoUrl} video.`)
    }

    let transcript = []
    transcriptResponse.forEach((line) => transcript.push(line.text))
    return transcript
}

