import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../auth/next-auth';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import QuizFormView from '@/app/quiz/_components/QuizFormView';
import { QuizViewProps } from '@/entries/Entries';


const QuizView = async ({ searchParams }: QuizViewProps) => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/')
  }
  return (
    <>
      <QuizFormView topic={searchParams?.topic ?? ""} />
    </>
  )
}

export const metadata: Metadata = {
  title: "Quiz",
  description: "Quiz page",
}

export default QuizView
