import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
import targetAverage from "@/assets/target.png"
import { AccuracyCardProps } from "@/entries/Entries";
import Image from "next/image";


const AccuracyCard = ({ accuracy }: AccuracyCardProps) => {
  accuracy = Math.round(accuracy * 100) / 100;
  return (
    <>
      <Card className="md:col-span-3">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-2xl font-bold">Average Accuracy</CardTitle>
          <Image src={targetAverage} alt="target" width={30} height={30} priority />
        </CardHeader>
        <CardContent>
          <p className="text-sm font-medium">{accuracy.toString() + "% accuracy"}</p>
        </CardContent>
      </Card>
    </>
  )
}

export default AccuracyCard;