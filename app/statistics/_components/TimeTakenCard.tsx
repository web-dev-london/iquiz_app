import hourGlass from "@/assets/hourglass.png";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimeTakenCardProps } from "@/entries/Entries";
import { formatTimeDelta } from "@/lib/utils";
import { differenceInSeconds } from "date-fns";
import Image from "next/image";


const TimeTakenCard = ({ timeEnded, timeStarted }: TimeTakenCardProps) => {
  return (
    <Card className="md:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">Time Taken</CardTitle>
        <Image priority src={hourGlass} alt="hourglass" width={40} height={40} />
      </CardHeader>
      <CardContent>
        <div className="text-sm font-medium">
          {formatTimeDelta(differenceInSeconds(timeEnded, timeStarted))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeTakenCard;