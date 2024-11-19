import HistoryTableView from '@/app/history/_components/HistoryTableView';
import PaginationView from '@/app/history/_components/PaginationView';
import { buttonVariants } from '@/components/ui/button';
import { columns } from '@/helper/links';
import prisma from '@/prisma/client';
import { GameType } from '@prisma/client';
import { LucideLayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getUserSession } from '../auth/getUserSession';
import { HistoryViewProps } from '@/entries/Entries';
import { Metadata } from 'next';




const HistoryView = async ({ searchParams }: HistoryViewProps) => {
  const session = await getUserSession();
  if (!session?.user) {
    return redirect("/");
  }

  const topics = Object.values(GameType);
  const isValidTopic = topics.includes(searchParams.gameType) ? searchParams.gameType : undefined;

  const orderDirection = searchParams.order === 'asc' ? 'asc' : 'desc';
  const orderBy = columns.map((column) => column.value).includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: orderDirection }
    : undefined;

  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 4;
  const where = {
    userId: session.user.id,
    gameType: isValidTopic,
  };

  const games = await prisma.game.findMany({
    where,
    orderBy,
    skip: (page - 1) * limit,
    take: limit,
  });

  const totalNumberOfGames = await prisma.game.count({
    where,
  });

  return (
    <>
      <div className="px-4 py-6 mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">History</h1>
          <Link className={buttonVariants()} href="/dashboard">
            <LucideLayoutDashboard className="mr-2" />
            Back to Dashboard
          </Link>
        </div>
        <HistoryTableView games={games} searchParams={searchParams} />
        <div className="flex flex-row-reverse gap-4 flex-wrap-reverse md:flex-nowrap items-center">
          <PaginationView
            pageSize={limit}
            currentPage={page}
            totalItems={totalNumberOfGames}
          />
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing {page} of {Math.ceil(totalNumberOfGames / limit)}
          </p>
        </div>
      </div>
    </>
  );
};

export const metadata: Metadata = {
  title: "History",
  description: "History page",
}

export default HistoryView
