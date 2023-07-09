import { loadSummarizationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

export const summarize = async (transcript) => {
   
    const model = new ChatOpenAI({
       temperature: 0,
       modelName: "gpt-3.5-turbo"
    })

    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 4000
    })

    const docs = await textSplitter.createDocuments([transcript]);
    
    const chain = loadSummarizationChain(model, { type: "map_reduce"})
    const summarized = await chain.call({ input_documents: docs })

    return summarized.text
}