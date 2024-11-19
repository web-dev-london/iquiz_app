import React from "react";
import { Card } from "@/components/ui/card";
import { Percent, } from "lucide-react";
import targetAverage from "@/assets/target.png"
import Image from "next/image";
import { OpenEndedPercentageView } from "@/entries/Entries";

const OpenEndedPercentage = ({ percentage }: OpenEndedPercentageView) => {
  return (
    <Card className="flex flex-row items-center p-2">
      <Image src={targetAverage} alt="target" width={30} height={30} priority />
      <span className="ml-3 text-2xl opacity-75">{percentage}</span>
      <Percent className="" size={20} />
    </Card>
  );
};

export default OpenEndedPercentage;
