import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MCQCardView } from '@/entries/Entries';

const MCQCard = ({ questionIndex, game, currentQuestion }: MCQCardView) => {
  return (
    <>
      <Card className="w-full mt-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
            <div className="text-base text-black-400">Q{questionIndex + 1}</div>
            <div className="text-base text-slate-400">{game.questions.length}</div>
          </CardTitle>
          <CardDescription
            className="text-lg text-center flex-grow"
          >
            {currentQuestion}
          </CardDescription>
        </CardHeader>
      </Card>
    </>
  )
}

export default MCQCard;