import React from 'react'
import { Separator } from "@/components/ui/separator";
import { CopyCheck, BookOpen } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { QuizButtonTypesView } from '@/entries/Entries';



const QuizButtonTypes = ({ formGetValues, formSetValues }: QuizButtonTypesView) => {
  return (
    <>
      <div className="flex justify-between">
        <Button
          variant={
            formGetValues("type") === "mcq" ? "default" : "secondary"
          }
          className="w-1/2 rounded-none rounded-l-lg"
          onClick={() => {
            formSetValues("type", "mcq");
          }}
          type="button"
        >
          <CopyCheck className="w-4 h-4 mr-2" /> Multiple Choice
        </Button>
        <Separator orientation="vertical" />
        <Button
          variant={
            formGetValues("type") === "open_ended"
              ? "default"
              : "secondary"
          }
          className="w-1/2 rounded-none rounded-r-lg"
          onClick={() => formSetValues("type", "open_ended")}
          type="button"
        >
          <BookOpen className="w-4 h-4 mr-2" /> Open Ended
        </Button>
      </div>
    </>
  )
}

export default QuizButtonTypes