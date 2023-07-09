import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { Document } from "langchain/document";
import { HNSWLib } from "langchain/vectorstores/hnswlib"
import { extractVideoId } from "@utils/functions";

export const createIndex = async (transcript, videoUrl) => {

    const docs = await Promise.all(
      transcript.map((transcript) => {
        const splitter = new RecursiveCharacterTextSplitter({
           chunkSize: 500,
           chunkOverlap: 50
        })

        const docs = splitter.splitDocuments([
            new Document({
                pageContent: transcript,
                metadata: {
                    url: videoUrl
                }
            })
        ])

        return docs
      })
    )

    const vectorStore = await HNSWLib.fromDocuments(
        docs.flat(),
        new OpenAIEmbeddings()
    )

    const videoId = extractVideoId(videoUrl)
    const directory = `./indexes/${videoId}`
    await vectorStore.save(directory)
}