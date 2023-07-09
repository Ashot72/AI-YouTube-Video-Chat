import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@utils/database"

const handler = NextAuth({
   providers: [
     GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
     })
   ],
   callbacks: {
     async session({ session }) {
        return await prisma.user.findUnique({ where: { email: session.user.email } })
     },
     async signIn({ profile }) {
            try {
                const userExists = await prisma.user.findUnique({ where: {email: profile.email }})

                if(!userExists) {
                    await prisma.user.create({
                        data: {
                            email: profile.email,
                            name: profile.name,
                            image: profile.picture
                        }
                    })
                }

                return true
            } catch(error) {
               console.error(error)
               return false
            }
     }
   }
})

export { handler as GET, handler as POST }