import { HNSWLib } from "langchain/vectorstores/hnswlib"
import { ChatOpenAI } from "langchain/chat_models/openai"
import { ConversationalRetrievalQAChain } from "langchain/chains"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { ConversationLog } from "./conversationLog"

const chains = []

export const POST = async (req) => {
    const { userId, videoId, question } = await req.json()

    let chain 
 try {
    const chainAdded = chains.find(c => c.videoId === videoId)

    if(!chainAdded) {      
        const directory = `./indexes/${videoId}`

        const vectorStore = await HNSWLib.load(
            directory,
            new OpenAIEmbeddings()
        )

        console.log(`Loaded Vector DB for the video with ${videoId} id`)

        const model = new ChatOpenAI({
            temperature: 0,
            modelName: "gpt-3.5-turbo"           
        })

        chain = ConversationalRetrievalQAChain.fromLLM(
            model,
            vectorStore.asRetriever(),
            {
                returnSourceDocuments: true
            }
        )

        chains.push({videoId, chain})
    } else {
        chain = chainAdded.chain
    }

      const conversationLog = new ConversationLog(userId, videoId)
      const conversationHistory = await conversationLog.getConverstion({ limit: 10})
      await conversationLog.addEntry({ entry: question, speaker: "user"})

      let chat_history =  conversationHistory.join("\n")
      const response = await chain.call({ question, chat_history })

      await conversationLog.addEntry({ entry: response.text, speaker: "bot" })
      return new Response(JSON.stringify({text: response.text, speaker: "bot"}), { status: 201 })
    } catch (error) {
        console.error(error)
        return new Response(null, { status: 500, statusText: "Failed to chat" })
    }
}