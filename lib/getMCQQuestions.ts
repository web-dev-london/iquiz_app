
import { strict_output } from "./chatGPT";
import z from "zod";

export const mcqQuestionSchema = z.object({
  question: z.string(),
  answer: z.string(),
  option1: z.string(),
  option2: z.string(),
  option3: z.string(),
})

export type MCQQuestion = z.infer<typeof mcqQuestionSchema>
export const mcqQuestionsSchema = z.array(mcqQuestionSchema)
export type MCQQuestions = z.infer<typeof mcqQuestionsSchema>

export async function getMCQQuestions(topic: string, amount: number): Promise<MCQQuestions> {
  const output = await strict_output(
    "You are a helpful AI that is able to generate multiple choice questions. Store all the questions in a JSON array.",
    new Array(amount).fill(`You are to generate a random hard mcq question about ${topic}`),
    {
      question: "question",
      answer: "answer with max length of 15 words",
      option1: "option1 with max length of 15 words",
      option2: "option2 with max length of 15 words",
      option3: "option3 with max length of 15 words",
    }
  );
  const parsed = mcqQuestionsSchema.parse(output);
  return parsed
}