import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../auth/next-auth'
import { redirect } from 'next/navigation'
import DetailsDialog from '@/app/dashboard/_components/DetailsDialog'
import QuizCard from '@/app/dashboard/_components/QuizCard'
import HistoryCard from '@/app/dashboard/_components/HistoryCard'
import TopicsCard from '@/app/dashboard/_components/TopicsCard'
import ActivityCard from '@/app/dashboard/_components/ActivityCard'


export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard page",
}
const DashboardPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      redirect('/')
    )
  }

  return (
    <>
      <main
        className='px-4 py-6 mx-auto max-w-7xl'
      >
        <div className="flex items-center gap-4">
          <h2 className="mr-2 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Dashboard
          </h2>
          <DetailsDialog />
        </div>
        <div className="grid gap-4 mt-10 md:grid-cols-2">
          <QuizCard />
          <HistoryCard />
        </div>
        <div className="grid gap-4 mt-10 md:grid-cols-2 lg:grid-cols-7">
          <TopicsCard />
          <ActivityCard />
        </div>
      </main>
    </>
  )
}

export default DashboardPage
