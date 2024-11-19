import prisma from "@/prisma/client";
import { Clock, CopyCheck, Edit2 } from "lucide-react";
import Link from "next/link";
import React from "react";


type Props = {
  limit: number;
  userId: string;
};

const ActivityCardContent = async ({ limit, userId }: Props) => {

  const games = await prisma.game.findMany({
    take: limit,
    where: {
      userId,
    },
    orderBy: {
      timeStarted: "desc",
    },
  });

  const listOfGames = games.map((game) => {
    return (
      <div className="flex items-center justify-between" key={game.id}>
        <div className="flex items-center">
          {game.gameType === "mcq" ? (
            <CopyCheck className="mr-3" />
          ) : (
            <Edit2 className="mr-3" />
          )}
          <div className="ml-4 space-y-1">
            <Link
              className="text-base font-medium leading-none underline"
              href={`/statistics/${game.id}`}
            >
              {game.topic}
            </Link>
            <p className="flex items-center px-2 py-1 text-xs rounded-md w-fit bg-yellow-400 dark:bg-yellow-600">
              <Clock className="w-4 h-4 mr-1" />
              {new Date(game.timeEnded ?? 0).toLocaleDateString()}
            </p>
            <p className="text-sm text-muted-foreground">
              {game.gameType === "mcq" ? "Multiple Choice" : "Open-Ended"}
            </p>
          </div>
        </div>
      </div>
    );
  })

  return (
    <div className="space-y-8">
      {listOfGames}
    </div>
  );
};

export default ActivityCardContent;
