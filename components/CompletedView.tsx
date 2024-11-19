import React from 'react'
import ConfettiAnimation from './effects/ConfettiAnimation'
import { formatTimeDelta, cn } from '@/lib/utils'
import { differenceInSeconds } from 'date-fns'
import { BarChart } from 'lucide-react'
import { buttonVariants } from './ui/button'
import { CompletedViewProps } from '@/entries/Entries'
import Link from 'next/link'

const CompletedView = ({ showConfetti, now, game, audioRef }: CompletedViewProps) => {

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        {showConfetti && <ConfettiAnimation />}
        <div className="px-4 py-2 mt-2 font-semibold text-white bg-green-500 rounded-md">
          You Completed in {" "}
          {formatTimeDelta(differenceInSeconds(now?.getTime() ?? 0, game.timeStarted))}
        </div>
        <Link href={`/statistics/${game.id}`} className={cn(buttonVariants({ size: "lg" }), "mt-2")}>
          View Statistics <BarChart className="w-4 h-4 ml-2" />
        </Link>
        <audio
          ref={audioRef}
          id="winAudio"
        >
          <source
            src="/audio/happy-logo.mp3"
            type="audio/mpeg"
          />
        </audio>
      </div>
    </>
  )
}

export default CompletedView;