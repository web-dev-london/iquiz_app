import SignInButton from "@/components/navbar/SignInButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/next-auth";
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect('/dashboard')
  }

  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen"
      >
        <Card
          className="w-96"
        >
          <CardHeader>
            <CardTitle>
              Welcome to iQuiz 👋
            </CardTitle>
            <CardDescription>
              Get started by creating a new quiz
              and submitting your answers.
              <br />
              <br />
              Thank you for your interest.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignInButton text="Sign In" />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
