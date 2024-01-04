import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/prisma/client"

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log(url, baseUrl)
      return baseUrl
    },
    async signIn({user}) {
      const res = await prisma.user.findUnique({
        where: {
          email: user.email!
        }
      })
      if (!res) {
        return false
      }
      return true
    }
  }
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     return '/issues'
  //   }
  //   // redirect:
  // }
})

export { handler as GET, handler as POST }