"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useQuizMutation from "@/hooks/useQuizMutation";
import { formSchema, Input } from "@/schemas/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useToast } from "../../../hooks/use-toast";
import LoadingView from "../../../components/LoadingView";
import QuizForm from "./QuizForm";
import { QuizCreationProps } from "@/entries/Entries";



const QuizCreation = ({ topic: topicParam }: QuizCreationProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [showLoader, setShowLoader] = React.useState(false);
  const [finishedLoading, setFinishedLoading] = React.useState(false);
  const { mutate: getQuestions, isPending } = useQuizMutation();


  const form = useForm<Input>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: topicParam ?? "",
      type: "mcq",
      amount: undefined,
    },
  });

  const onSubmit = async (data: Input) => {
    setShowLoader(true);
    getQuestions(data, {
      onError: (error) => {
        setShowLoader(false);
        if (error instanceof AxiosError) {
          if (error.response?.status === 500) {
            toast({
              title: "Error",
              description: "Something went wrong. Please try again later.",
              variant: "destructive",
            });
          }
        }
      },
      onSuccess: ({ gameId }: { gameId: string }) => {
        setFinishedLoading(true);
        setTimeout(() => {
          if (form.getValues("type") === "mcq") {
            router.push(`/play/mcq/${gameId}`);
          } else if (form.getValues("type") === "open_ended") {
            router.push(`/play/open-ended/${gameId}`);
          }
        }, 2000);
      },
    });
  };
  form.watch();

  if (showLoader) {
    return <LoadingView finished={finishedLoading} />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen pb-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Quiz Creation</CardTitle>
          <CardDescription>Choose a topic</CardDescription>
        </CardHeader>
        <CardContent>
          <QuizForm
            form={form}
            onSubmit={onSubmit}
            isPending={isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizCreation;
