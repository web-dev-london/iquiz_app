import prisma from "@/prisma/client";
import { endGameSchema } from "@/schemas/formSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { gameId } = endGameSchema.parse(body);

    const game = await prisma.game.findUnique({
      where: { id: gameId },
    });

    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    await prisma.game.update({
      where: { id: gameId },
      data: {
        timeEnded: new Date(),
      },
    })
    return NextResponse.json({ message: "Game ended" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}