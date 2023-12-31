// import NextAuth from "next-auth"
// // import GooglePro from "next-auth/providers/github"
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GITHUB_SECRET!,
//     }),
//     // ...add more providers here
//   ],
// }

// export default NextAuth(authOptions)

import NextAuth from "next-auth"

const handler = NextAuth({
  ...
})

export { handler as GET, handler as POST }