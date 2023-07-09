# AI YouTube Video Chat

In this AI YouTube Video Chat Next.js application, we ask questions to our YouTube video bot and get answers. This application makes use of [LangChain](https://js.langchain.com) which is a framework for developing applications powered by language models. 

As a cloud-based database, [MongoDB](https://www.mongodb.com/atlas/database) is used with [Prisma ORM](https://www.prisma.io/ ). We utilize [HNSWLIB](https://js.langchain.com/docs/modules/indexes/vector_stores/integrations/hnswlib), an in-memory vector store that can be saved to a file. 

We are using the latest [Next.js 13](https://nextjs.org/docs)  with the app directory, which makes it easy lay out complex interfaces that maintain state across navigations, avoid expensive re-renders, and enable advanced routing patterns. [NextAuth](https://next-auth.js.org/) is used for the authentication with Google Provider.

To get started.
```
       Clone the repository

       git clone https://github.com/Ashot72/AI-YouTube-Video-Chat
       cd AI-YouTube-Video-Chat

       Add .env file based on env.example.txt file and add respective keys
       
       # installs dependencies
         npm install

       # to run locally
         npm run dev
      
```

Go to [AI YouTube Video Chat Video](https://youtu.be/dv6CAxMD_ts) page

Go to [AI YouTube Video Chat Description](https://ashot72.github.io/AI-YouTube-Video-Chat/doc.html) page
