// Example getUserSession using NextAuth.js
import { getServerSession } from "next-auth";
import { authOptions } from "./next-auth";


export async function getUserSession() {
  const session = await getServerSession(authOptions);
  return session;;
}