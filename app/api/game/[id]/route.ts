import { getUserSession } from "@/app/auth/getUserSession";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {

  const session = await getUserSession();
  if (!session?.user) {
    return NextResponse.json(
      { error: "You must be logged in to view the game." },
      { status: 401 }
    );
  }

  const game = await prisma.game.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!game) {
    return NextResponse.json({ error: "Game not found" }, { status: 404 });
  }

  await prisma.game.delete({
    where: {
      id: game.id,
    },
  });

  return NextResponse.json({ message: "Game deleted" }, { status: 200 });
}