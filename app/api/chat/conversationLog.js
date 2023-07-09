import { prisma } from "@utils/database"

class ConversationLog {

    constructor(userId, videoId) {
        this.userId = userId
        this.videoId = videoId
    }

    async addEntry({ entry, speaker }) {
        await prisma.conversations.create({ data: { userId: this.userId, entry, speaker, videoId: this.videoId }})           
    }

    async getConverstion({ limit }) {
       const conversaion = await prisma.conversations.findMany(
        { 
            where: { userId: this.userId, videoId: this.videoId },
            take: limit, 
            orderBy: [{ createdAt: 'desc' }] 
        })    
       return conversaion.map((data) => data.entry).reverse()
    }
}

export { ConversationLog }