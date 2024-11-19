"use client";
import { formatTimeDelta } from "@/lib/utils";
import { differenceInSeconds } from "date-fns";
import { ChevronRight, Loader2, Timer } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OpenEndedPercentage from '@/app/play/open-ended/_components/OpenEndedPercentage';
import BlankAnswerInput from '@/app/play/open-ended/_components/BlankAnswerInput';
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { checkAnswerSchema, endGameSchema } from "@/schemas/formSchema";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useMemo, useEffect, useCallback, useState, useRef } from "react";
import { OpenEndedProps } from "@/entries/Entries";
import CompletedView from "@/components/CompletedView";


const OpenEnded = ({ game }: OpenEndedProps) => {

  const [hasEnded, setHasEnded] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [blankAnswer, setBlankAnswer] = useState("");
  const [averagePercentage, setAveragePercentage] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [now, setNow] = useState(new Date());
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);



  useEffect(() => {
    setHydrated(true);
  }, []);

  const currentQuestion = useMemo(() => {
    return game.questions[questionIndex];
  }, [questionIndex, game.questions]);


  const { mutate: endGame } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof endGameSchema> = {
        gameId: game.id,
      };
      const response = await axios.post(`/api/endGame`, payload);
      return response.data;
    },
  });


  const { toast } = useToast();

  const { mutate: checkAnswer, isPending } = useMutation({
    mutationFn: async () => {
      let filledAnswer = blankAnswer;
      const inputElements = document.querySelectorAll<HTMLInputElement>("#user-blank-input");
      inputElements.forEach((inputElement) => {
        filledAnswer = filledAnswer.replace("_____", inputElement.value);
        inputElement.value = "";
      });
      const payload: z.infer<typeof checkAnswerSchema> = {
        questionId: currentQuestion.id,
        userAnswer: filledAnswer,
      };
      const response = await axios.post(`/api/checkAnswer`, payload);
      return response.data;
    },
  });


  useEffect(() => {
    if (!hasEnded) {
      const interval = setInterval(() => {
        setNow(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [hasEnded]);

  const handleNext = useCallback(() => {
    checkAnswer(undefined, {
      onSuccess: ({ percentageSimilar }) => {
        toast({
          title: `Your answer is ${percentageSimilar}% similar to the correct answer`,
        });
        setAveragePercentage((prev) => {
          return (prev + percentageSimilar) / (questionIndex + 1);
        });
        if (questionIndex === game.questions.length - 1) {
          endGame();
          setHasEnded(true);
          return;
        }
        setQuestionIndex((prev) => prev + 1);
      },
      onError: (error) => {
        console.error(error);
        toast({
          title: "Something went wrong",
          variant: "destructive",
        });
      },
    });
  }, [checkAnswer, questionIndex, toast, endGame, game.questions.length]);


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      if (key === "Enter") {
        handleNext();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext]);



  useEffect(() => {
    if (hasEnded && parseInt(averagePercentage.toFixed() || "0") === 100) {
      setShowConfetti(true);

      if (audioRef.current) {
        audioRef.current.play();
      }

      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [hasEnded, averagePercentage]);


  if (hasEnded) {
    return (
      <>
        {hydrated &&
          <CompletedView
            showConfetti={showConfetti}
            now={now}
            game={game}
            audioRef={audioRef}
          />
        }
      </>
    );
  }


  return (
    <div className="flex items-center justify-center min-h-screen">
      {hydrated && (
        <div className="max-w-4xl px-4">
          <div className="flex justify-between">
            <div className="flex flex-col">

              <p>
                <span className="text-slate-400">Topic</span> &nbsp;
                <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
                  {game.topic}
                </span>
              </p>
              <div className="flex self-start mt-3 text-slate-400">
                <Timer className="mr-2" />
                {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
              </div>
            </div>
            <OpenEndedPercentage percentage={parseInt(averagePercentage.toFixed())} />
          </div>

          <Card className="w-full mt-4">
            <CardHeader className="flex flex-row items-center">
              <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
                <div>Q{questionIndex + 1}</div>
                <div className="text-base text-slate-400">
                  {game.questions.length}
                </div>
              </CardTitle>
              <CardDescription className="flex-grow text-lg">
                {game.questions[questionIndex]?.question}
              </CardDescription>
            </CardHeader>
          </Card>
          <div className="flex flex-col items-center justify-center w-full mt-4">
            <BlankAnswerInput
              setBlankAnswer={setBlankAnswer}
              answer={game.questions[questionIndex]?.answer}
            />
            <Button
              variant="default"
              size="lg"
              className="mt-7"
              disabled={isPending || hasEnded}
              onClick={handleNext}
            >
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Next <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenEnded;
