import { z } from 'zod';

export const formSchema = z.object({
  topic: z.string()
    .min(4, { message: 'Topic must be at least 4 characters' })
    .max(50, { message: 'Topic must be less than 50 characters' }),
  type: z.enum(['mcq', 'open_ended'], { required_error: 'Type is required' }),
  amount: z.number().min(1, { message: 'Amount must be at least 1' })
    .max(10, { message: 'Amount must be less than 10' })
})
export const checkAnswerSchema = z.object({
  questionId: z.string(),
  userAnswer: z.string(),
});

export const endGameSchema = z.object({
  gameId: z.string(),
});

export type Input = z.infer<typeof formSchema>;
