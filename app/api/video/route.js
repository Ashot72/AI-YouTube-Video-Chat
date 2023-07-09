import { prisma } from "@utils/database"

export const GET = async () => {
    try {
        const videos = await prisma.video.findMany({ 
            select: {
                id: true,
                url: true,
                userId: true,
                createdAt: true,
                summarization: true
            }
        })

        return new Response(JSON.stringify(videos), { status: 200 })
    } catch (error) {
        console.error(error)
        return new Response(null, { status: 500, statusText: "Failed to fetch all videos" })
    }
}
