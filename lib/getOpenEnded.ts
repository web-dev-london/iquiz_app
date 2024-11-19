import { strict_output } from "./chatGPT";
import z from "zod";

export const openQuestionSchema = z.object({
  question: z.string(),
  answer: z.string(),
})

export type OpenQuestion = z.infer<typeof openQuestionSchema>
export const openQuestionsSchema = z.array(openQuestionSchema)
export type OpenQuestions = z.infer<typeof openQuestionsSchema>
export async function getOpenEnded(topic: string, amount: number): Promise<OpenQuestions> {
  const output = await strict_output(
    "You are a helpful AI that is able to generate a pair of question and answers, the length of each answer should not be more than 15 words, store all the pairs of answers and return in a JSON array",
    new Array(amount).fill(`You are to generate a random hard open-ended question about ${topic}`),
    {
      question: "question",
      answer: "answer with max length of 15 words",
    }
  );
  const parsed = openQuestionsSchema.parse(output);
  return parsed
}