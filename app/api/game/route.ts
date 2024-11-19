import { getUserSession } from "@/app/auth/getUserSession";
import { getMCQQuestions, MCQQuestion } from "@/lib/getMCQQuestions";
import { getOpenEnded, OpenQuestion } from "@/lib/getOpenEnded";
import prisma from "@/prisma/client";
import { formSchema } from "@/schemas/formSchema";
import { NextResponse } from "next/server";
import { z } from "zod";


export async function POST(req: Request) {
  try {
    // Log start of the request
    console.log("Starting POST request...");

    const session = await getUserSession();
    console.log('Session retrieved:', session);

    if (!session?.user) {
      console.log("User not logged in");
      return NextResponse.json(
        { error: "You must be logged in to view the game." },
        { status: 401 }
      );
    }

    // Parse the request body and validate against schema
    const body = await req.json();
    console.log("Request body received:", body);

    const { topic, type, amount } = formSchema.parse(body);
    console.log("Parsed body:", { topic, type, amount });

    // Create the game
    const game = await prisma.game.create({
      data: {
        gameType: type,
        timeStarted: new Date(),
        userId: session.user.id,
        topic,
      },
    });
    console.log("Game created:", game);

    // Upsert topic count
    await prisma.topic_count.upsert({
      where: { topic },
      create: { topic, count: 1 },
      update: { count: { increment: 1 } },
    });
    console.log("Topic count updated or inserted for:", topic);

    // Fetch questions from external API
    const apiUrl = process.env.API_URL as string;
    console.log("Fetching questions from:", apiUrl);


    // Process MCQ type questions
    if (type === "mcq") {
      const questions = await getMCQQuestions(topic, amount);
      const manyData = questions.map((question: MCQQuestion) => {
        const options = [
          question.option1,
          question.option2,
          question.option3,
          question.answer,
        ].filter((option) => option !== null)
          .sort(() => Math.random() - 0.5);

        return {
          question: question.question,
          answer: question.answer,
          options: JSON.stringify(options),
          gameId: game.id,
          questionType: "mcq",
        } as const;
      });

      await prisma.question.createMany({
        data: manyData,
      });
      console.log("MCQ questions saved to Database.");
    }

    // Process Open-ended questions
    else if (type === "open_ended") {
      const questions = await getOpenEnded(topic, amount);
      await prisma.question.createMany({
        data: questions.map((question: OpenQuestion) => {
          return {
            question: question.question,
            answer: question.answer,
            gameId: game.id,
            questionType: "open_ended",
          };
        }),
      });
      console.log("Open-ended questions saved to Database.");
    }

    // Return success response with game ID
    console.log("POST request completed successfully.");
    return NextResponse.json({ gameId: game.id }, { status: 200 });

  } catch (error) {
    console.error("Error caught in POST request:", error);

    if (error instanceof z.ZodError) {
      console.log("Validation error:", error.issues);
      return NextResponse.json(
        { error: error.issues },
        { status: 400 }
      );
    } else {
      console.error("Unexpected error occurred:", error);
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        { status: 500 }
      );
    }
  }
}

export async function GET(req: Request) {
  try {
    console.log("Starting GET request...");

    const session = await getUserSession();
    if (!session?.user) {
      console.log("User not logged in");
      return NextResponse.json(
        { error: "You must be logged in to view the game." },
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const gameId = url.searchParams.get("gameId");

    if (!gameId) {
      console.log("No gameId provided");
      return NextResponse.json(
        { error: "You must provide a game id." },
        { status: 400 }
      );
    }

    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: { questions: true },
    });

    if (!game) {
      console.log("Game not found for ID:", gameId);
      return NextResponse.json(
        { error: "Game not found." },
        { status: 404 }
      );
    }

    console.log("Game found:", game);
    return NextResponse.json({ game }, { status: 200 });

  } catch (error) {
    console.error("Error caught in GET request:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
} 
