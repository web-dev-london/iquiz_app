import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/schemas/formSchema';
import { Game, GameType, Question } from '@prisma/client';
import { FieldPath } from 'react-hook-form'
import { Dispatch } from 'react';


interface QuizCreationProps {
  topic: string;
};

interface QuizViewProps {
  searchParams: {
    topic?: string;
  };
}

interface QuizFormProps {
  form: UseFormReturn<Input>
  onSubmit: (data: Input) => Promise<void>
  isPending: boolean
}

interface HistoryViewProps {
  searchParams: GameQueryParams
}

interface GameQueryParams {
  orderBy: keyof Game
  order: 'asc' | 'desc';
  page: string;
  gameType: GameType
  limit?: string
}

interface HistoryTableViewProps {
  games: Game[]
  searchParams: GameQueryParams
}

interface PaginationViewProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

interface StatisticsProps {
  params: {
    gameId: string
  }
}

interface QuestionListProps {
  questions: Question[]
}

interface ResultProps {
  accuracy: number
};

interface AccuracyCardProps {
  accuracy: number;
}

interface TimeTakenCardProps {
  timeEnded: Date;
  timeStarted: Date;
};

interface QuizButtonTypesView {
  formGetValues: (name: FieldPath<Input>) => string
  formSetValues: (name: FieldPath<Input>, value: string) => void
}

interface MCQViewProps {
  game: Game & {
    questions: Pick<Question, 'id' | 'options' | 'question'>[];
  };
};


interface MCQCardView {
  questionIndex: number;
  game: Game & {
    questions: Pick<Question, 'id' | 'options' | 'question'>[];
  };
  currentQuestion: string
}

interface MCQCounterProps {
  correct_answers: number;
  wrong_answers: number;
};

interface OpenEndedPageProps {
  params: {
    gameId: string
  }
}

interface OpenEndedProps {
  game: Game & { questions: Pick<Question, "id" | "question" | "answer">[] };
};

interface OpenEndedPercentageView {
  percentage: number;
};

interface BlankAnswerInputProps {
  answer: string;
  setBlankAnswer: React.Dispatch<React.SetStateAction<string>>;
};

interface CompletedViewProps {
  showConfetti: boolean;
  now: Date | null;
  game: Game;
  audioRef: React.RefObject<HTMLAudioElement>;
}

interface SelectButtonProps {
  selectedChoice: number | null
  index: number;
  option: string
  setSelectedChoice: Dispatch<React.SetStateAction<number | null>>
}

export type {
  QuizCreationProps,
  QuizViewProps,
  QuizFormProps,
  HistoryViewProps,
  HistoryTableViewProps,
  GameQueryParams,
  PaginationViewProps,
  StatisticsProps,
  QuestionListProps,
  ResultProps,
  AccuracyCardProps,
  TimeTakenCardProps,
  QuizButtonTypesView,
  MCQViewProps,
  MCQCardView,
  MCQCounterProps,
  OpenEndedPageProps,
  OpenEndedProps,
  OpenEndedPercentageView,
  BlankAnswerInputProps,
  CompletedViewProps,
  SelectButtonProps,
}