'use client';
import { Progress } from "./ui/progress";
import { useEffect, useState } from "react";
import LoadingAnimation from "./effects/LoadingAnimation";

type Props = {
  finished: boolean;
};

const loadingTexts = [
  "Generatioing questions...",
  "Unleashing the power of AI...",
  "Exploring the unknown...",
  "Diving into the depths...",
  "Enriching your knowledge...",
  "Connecting with the world...",
  "Transforming reality...",
  "Unlocking the secrets...",
  "Infusing wisdom...",
]

export default function LoadingView({ finished }: Props) {
  const [progress, setProgress] = useState(10);
  const [loadingText, setLoadingText] = useState(loadingTexts[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingTexts.length);
      setLoadingText(loadingTexts[randomIndex]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (finished) return 100;
        if (prevProgress === 100) {
          return 0;
        }
        if (Math.random() < 0.1) {
          return prevProgress + 2;
        }
        return prevProgress + 0.5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [finished]);


  return (
    <>
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[70vw] md:w-[60vw] flex flex-col items-center">
        <LoadingAnimation />
        <Progress value={progress} className="w-full mt-4" />
        <h1 className="mt-2 text-xl">{loadingText}</h1>
      </div>
    </>
  )
}