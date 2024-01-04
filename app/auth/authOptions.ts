import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/prisma/client"
import { NextAuthOptions } from "next-auth"


const authOptions: NextAuthOptions = {
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
      // console.log(url, baseUrl)
      // if (url.startsWith("/")) return `${baseUrl}${url}`
      // // Allows callback URLs on the same origin
      // else if (new URL(url).origin === baseUrl) return url
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
    },
    // async signOut()
      
    // }
  }
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     return '/issues'
  //   }
  //   // redirect:
  // }
}

export default authOptions;