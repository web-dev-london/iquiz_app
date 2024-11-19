import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MCQCounterProps } from "@/entries/Entries";
import { CheckCircle2, XCircle } from "lucide-react";

const MCQCounter = ({ correct_answers, wrong_answers }: MCQCounterProps) => {
  return (
    <Card className="flex flex-row items-center justify-center p-2">
      <CheckCircle2 color="green" size={30} />
      <span className="mx-3 text-2xl text-[green]">{correct_answers}</span>

      <Separator orientation="vertical" />

      <span className="mx-3 text-2xl text-[red]">{wrong_answers}</span>
      <XCircle color="red" size={30} />
    </Card>
  );
};

export default MCQCounter; 
