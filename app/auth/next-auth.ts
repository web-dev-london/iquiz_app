/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { DefaultSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";



declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      try {
        if (user?.email) { // Ensure email exists and is not null
          const db_user = await prisma.user.upsert({
            where: { email: user.email }, // Now this is a valid string
            update: {},
            create: {
              email: user.email,
              name: user.name || '',
              image: user.image || '',
            },
          });
          token.id = db_user.id;
        } else {
          // Handle the case where email is missing
          console.error("No email found for user", user);
        }
      } catch (error) {
        console.error("Error in JWT callback:", error);
      }
      return token;
    },
    session: ({ session, token }) => {
      try {
        if (token) {
          session.user.id = token.id;
          session.user.name = token.name || session.user.name;
          session.user.email = token.email || session.user.email;
          session.user.image = typeof token.image === 'string' ? token.image : session.user.image;
        }
      } catch (error) {
        console.error("Error in Session callback:", error);
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
}
