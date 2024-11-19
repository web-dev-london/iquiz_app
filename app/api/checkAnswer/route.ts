import { NextRequest, NextResponse } from "next/server";
import { checkAnswerSchema } from "@/schemas/formSchema";
import prisma from "@/prisma/client";
import stringSimilarity from "string-similarity";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { questionId, userAnswer } = checkAnswerSchema.parse(body);
    const question = await prisma.question.findUnique({ where: { id: questionId } });

    if (!question) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    await prisma.question.update({
      where: { id: questionId },
      data: { userAnswer },
    });

    if (question.questionType === "mcq") {
      const isCorrect =
        question.answer.toLowerCase().trim() === userAnswer.toLowerCase().trim();

      await prisma.question.update({
        where: { id: questionId },
        data: { isCorrect },
      });

      return NextResponse.json({ isCorrect }, { status: 200 });
    } if (question.questionType === "open_ended") {
      let percentageSimilar = stringSimilarity.compareTwoStrings(
        question.answer.toLowerCase().trim(),
        userAnswer.toLowerCase().trim()
      );

      percentageSimilar = Math.round(percentageSimilar * 100);

      await prisma.question.update({
        where: { id: questionId },
        data: { percentageCorrect: percentageSimilar },
      });
      return NextResponse.json({
        percentageSimilar,
      }, { status: 200 });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 
