import { getUserSession } from '@/app/auth/getUserSession'
import prisma from '@/prisma/client'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { LucideLayoutDashboard } from 'lucide-react'
import AccuracyCard from '@/app/statistics/_components/AccuracyCard'
import QuestionsList from '@/app/statistics/_components/QuestionsList'
import ResultsCard from '@/app/statistics/_components/ResultsCard'
import TimeTakenCard from '@/app/statistics/_components/TimeTakenCard'
import { StatisticsProps } from '@/entries/Entries'
import { Metadata } from 'next'



const Statistics = async ({ params: { gameId } }: StatisticsProps) => {
  const session = await getUserSession();

  if (!session?.user) {
    redirect('/')
  }

  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: {
      questions: true
    }
  });

  if (!game) {
    redirect('/quiz')
  }

  let accuracy = 0;

  if (game.gameType === "mcq") {
    const totalCorrect = game.questions.reduce((acc, question) => {
      if (question.isCorrect) {
        return acc + 1
      }
      return acc
    }, 0)
    accuracy = Math.round((totalCorrect / game.questions.length) * 100)
  }

  if (game.gameType === "open_ended") {
    const totalPercentage = game.questions.reduce((acc, question) => {
      return acc + (question.percentageCorrect ?? 0)
    }, 0)
    accuracy = totalPercentage / game.questions.length
  }
  accuracy = Math.round(accuracy * 100) / 100


  return (
    <>
      <div className="p-4 mx-auto max-w-7xl">
        <div className="flex items-center flex-wrap justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Summary</h2>
          <div className="flex items-center space-x-2">
            <Link href="/dashboard" className={buttonVariants()}>
              <LucideLayoutDashboard className="mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-4 mt-4 md:grid-cols-7">
          <ResultsCard accuracy={accuracy} />
          <AccuracyCard accuracy={accuracy} />
          <TimeTakenCard
            timeEnded={new Date(game.timeEnded ?? 0)}
            timeStarted={new Date(game.timeStarted ?? 0)}
          />
        </div>
        <QuestionsList questions={game.questions} />
      </div>
    </>
  )
}

export const metadata: Metadata = {
  title: "Statistics",
  description: "Statistics page",
}

export default Statistics;