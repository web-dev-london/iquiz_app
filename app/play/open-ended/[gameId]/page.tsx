import { getUserSession } from '@/app/auth/getUserSession'
import OpenEndedView from '@/app/play/open-ended/_components/OpenEndedView'
import { OpenEndedPageProps } from '@/entries/Entries'
import prisma from '@/prisma/client'
import { redirect } from 'next/navigation'


const OpenEndedPage = async ({ params: { gameId } }: OpenEndedPageProps) => {
  const session = await getUserSession();

  if (!session?.user) {
    redirect('/')
  }

  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          answer: true,
        }
      }
    },
  });

  if (!game || game.gameType !== "open_ended") {
    redirect('/quiz')
  }

  return (
    <div>
      <OpenEndedView game={game} />
    </div>
  )
}

export default OpenEndedPage