'use client'
import CompletedView from '@/components/CompletedView';
import { Button } from '@/components/ui/button';
import { MCQViewProps } from '@/entries/Entries';
import { useToast } from '@/hooks/use-toast';
import { formatTimeDelta } from '@/lib/utils';
import { checkAnswerSchema, endGameSchema } from '@/schemas/formSchema';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { differenceInSeconds } from "date-fns";
import { ChevronRight, Loader2, Timer } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { z } from 'zod';
import MCQCard from './MCQCard';
import MCQCounter from './MCQCounter';
import SelectButton from '@/components/SelectButton';



const MCQView = ({ game }: MCQViewProps) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);
  const [stats, setStats] = useState({ correct_answers: 0, wrong_answers: 0 });
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [now, setNow] = useState<Date | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hydrated, setHydrated] = useState(false);


  useEffect(() => {
    setHydrated(true);
  }, []);


  const currentQuestion = useMemo(() => game.questions[questionIndex], [game.questions, questionIndex]);


  const options = useMemo<string[]>(() => {
    if (!currentQuestion || !currentQuestion.options) return [];
    try {
      return JSON.parse(currentQuestion.options as string) as string[];
    } catch (error) {
      console.error("Failed to parse options", error);
      return [];
    }
  }, [currentQuestion]);


  const { toast } = useToast();

  const checkAnswerMutation = useMutation({
    mutationFn: async () => {
      if (selectedChoice === null) return;
      const payload: z.infer<typeof checkAnswerSchema> = {
        questionId: currentQuestion?.id as string,
        userAnswer: options[selectedChoice],
      };
      const response = await axios.post(`/api/checkAnswer`, payload);
      return response.data;
    },
  });

  const endGameMutation = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof endGameSchema> = {
        gameId: game.id,
      };
      const response = await axios.post(`/api/endGame`, payload);
      return response.data;
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (!hasEnded) {
        setNow(new Date());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [hasEnded]);


  useEffect(() => {
    setNow(new Date());
  }, []);


  const allCorrect = stats.correct_answers === game.questions.length;

  useEffect(() => {
    if (allCorrect && hasEnded) {
      setShowConfetti(true);

      if (audioRef.current) {
        audioRef.current.play();
      }

      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [allCorrect, hasEnded]);

  const handleNext = useCallback(() => {
    if (selectedChoice === null) return;

    checkAnswerMutation.mutate(undefined, {
      onSuccess: ({ isCorrect }: { isCorrect: boolean }) => {
        setStats((prevStats) => ({
          correct_answers: prevStats.correct_answers + (isCorrect ? 1 : 0),
          wrong_answers: prevStats.wrong_answers + (!isCorrect ? 1 : 0),
        }));

        toast({
          title: isCorrect ? "Correct" : "Incorrect",
          description: isCorrect ? "You got it right!" : "You got it wrong!",
          variant: isCorrect ? "success" : "destructive",
        });

        if (questionIndex === game.questions.length - 1) {
          endGameMutation.mutate();
          setHasEnded(true);
        } else {
          setQuestionIndex((prevIndex) => prevIndex + 1);
          setSelectedChoice(null);
        }
      },
    });
  }, [selectedChoice, questionIndex, game.questions.length, checkAnswerMutation, endGameMutation, toast]);


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      const keyMapping: Record<string, number> = { "1": 0, "2": 1, "3": 2, "4": 3 };

      if (key in keyMapping) setSelectedChoice(keyMapping[key]);
      if (key === "Enter") handleNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleNext]);


  const listOfOptions = options.length > 0 ? (
    options.map((option, index) => (
      <SelectButton
        key={`${option}-${index}`}
        setSelectedChoice={setSelectedChoice}
        selectedChoice={selectedChoice}
        index={index}
        option={option}
      />
    ))
  ) : (
    <p>No options available for this question.</p>
  )

  if (hasEnded) {
    return (
      <CompletedView
        showConfetti={showConfetti}
        now={now}
        game={game}
        audioRef={audioRef}
      />
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      {hydrated && (
        <div className="max-w-3xl w-full px-4">
          <div className="flex justify-between flex-wrap gap-4">
            <div>
              <p>
                <span className="text-slate-400">Topic</span> &nbsp;
                <span className="px-2 py-1 text-white rounded-lg bg-slate-800">{game.topic}</span>
              </p>
              <div className="flex mt-3 text-slate-400">
                <Timer className="mr-2" />
                {formatTimeDelta(differenceInSeconds(now?.getTime() ?? 0, game.timeStarted))}
              </div>
            </div>
            <MCQCounter correct_answers={stats.correct_answers} wrong_answers={stats.wrong_answers} />
          </div>

          <MCQCard
            game={game}
            questionIndex={questionIndex}
            currentQuestion={currentQuestion.question}
          />

          <div className="flex flex-col items-center justify-center w-full mt-4">
            {listOfOptions}
            <Button
              variant="default"
              size="lg"
              disabled={checkAnswerMutation.isPending || hasEnded}
              onClick={handleNext}
            >
              {checkAnswerMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Next <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MCQView; 
