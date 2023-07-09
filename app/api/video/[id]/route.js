import { prisma } from "@utils/database"
import { extractVideoId } from "@utils/functions"
import { rimraf } from 'rimraf'

export const DELETE = async (req, { params }) => {
    const { userId } = await req.json()

  try {  
    const video = await prisma.video.findFirst({ where: { id: params.id, userId }})
    
    if(!video) {
        return new Response(null, {  status: 400, statusText: "The video has not been created by you. You cannot delete it." })
    } else {
        const videoId = extractVideoId(video.url)
        rimraf.sync(`./indexes/${videoId}`);

        await prisma.video.delete({ where: { id: params.id }})
        await prisma.conversations.deleteMany({ where: { videoId } })
        return new Response("Successfully deleted", { status: 200  })
    }
  } catch(error) {
    console.error(error)
    return new Response(null, {  status: 500, statusText: "Failed to delete the video" })
  }
}