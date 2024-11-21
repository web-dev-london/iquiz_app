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
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error("Email not found in profile");
      }

      await prisma.user.upsert({
        where: {
          email: profile.email,
        },
        create: {
          email: profile.email,
          name: profile.name,
        },
        update: {
          name: profile.name,
          image: profile.image,

        },
      })

      return true;
    },

    async jwt({ token, user }) {
      try {
        if (user) {
          token.id = user.id;
        }
        return token;
      } catch (error) {
        console.error("JWT Callback Error:", error);
        return token;
      }
    },
    async session({ session, token }) {
      try {
        if (token) {
          session.user.id = token.id;
        }
        return session;
      } catch (error) {
        console.error("Session Callback Error:", error);
        return session;
      }
    }
  },





  // callbacks: {
  // async jwt({ token, user }) {
  //   try {
  //     if (user) {
  //       token.id = user.id;
  //     }
  //     return token;
  //   } catch (error) {
  //     console.error("JWT Callback Error:", error);
  //     return token;
  //   }
  // },
  // async session({ session, token }) {
  //   try {
  //     if (token) {
  //       session.user.id = token.id;
  //     }
  //     return session;
  //   } catch (error) {
  //     console.error("Session Callback Error:", error);
  //     return session;
  //   }
  // }
  // },
  events: {
    signIn: async ({ user, account, profile }) => {
      console.log("User signed in:", user, account, profile);

    }
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
}
