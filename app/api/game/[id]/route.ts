import { getUserSession } from "@/app/auth/getUserSession";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  console.log("Starting DELETE request...");
  const session = await getUserSession();
  // if (!session?.user) {
  //   return NextResponse.json(
  //     { error: "You must be logged in to view the game." },
  //     { status: 401 }
  //   );
  // }
  // console.log("User logged in", session.user.id);
  const game = await prisma.game.findUnique({
    where: {
      id: params.id,
    },
  });
  console.log("Game retrieved", game);
  if (!game) {
    return NextResponse.json({ error: "Game not found" }, { status: 404 });
  }

  await prisma.game.delete({
    where: {
      id: game.id,
    },
  });
  console.log("Game deleted", game);
  return NextResponse.json({ message: "Game deleted" }, { status: 200 });
}