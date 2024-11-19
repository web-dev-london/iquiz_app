import { getUserSession } from '@/app/auth/getUserSession'
import MCQView from '@/app/play/mcq/_components/MCQView'
import prisma from '@/prisma/client'
import { redirect } from 'next/navigation'

type Props = {
  params: {
    gameId: string
  }
}

const MCQPage = async ({ params: { gameId } }: Props) => {
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
          options: true,
        }
      }
    },
  });

  if (!game || game.gameType !== "mcq") {
    redirect('/quiz')
  }
  return (
    <>
      {/* <pre>
        {JSON.stringify(game, null, 2)}
      </pre> */}
      <MCQView game={game} />
    </>
  )
}

export default MCQPage