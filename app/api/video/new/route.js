import { prisma } from "@utils/database"
import { createIndex } from "@utils/langchain/HNSWLibIndex"
import { summarize } from "@utils/langchain/summarize"
import { generateTranscript } from "@utils/transcript"


export const POST = async (req) => {
    const { videoURL, userId } = await req.json()

    const videoExist = await prisma.video.findUnique({ where: { url: videoURL }})

    if(videoExist) {
        return new Response(null, { status: 400, statusText: `Video ${videoURL} already exists.` })
    }

    let transcript
    try {
        transcript = await generateTranscript(videoURL)
    } catch(error) {
       console.error(error)       
       return new Response(null, { status: 400, statusText: "Seems Transcript is disabled on this video", })
    }

    try {
        await createIndex(transcript, videoURL)
        const summarization = await summarize(transcript.join("\n"))
        const videoAdded = await prisma.video.create({ data: { url: videoURL, userId, transcript: transcript.join(), summarization } })
        
        return new Response(JSON.stringify(videoAdded, { status: 201 }))
    } catch (error) {
          console.error(error)
          return new Response(null, { status: 500, statusText: "Failed to add a new video" })
    }

}