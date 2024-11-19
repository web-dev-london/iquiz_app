"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HelpCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import { listOfTech } from "@/helper/tech";



const DetailsDialog = () => {

  const listOfImages = listOfTech.map((tech) => (
    <div key={tech.name} className="flex items-center gap-2">
      <Image
        className="img_icon"
        alt={tech.alt}
        src={tech.src}
        width={30}
        height={30}
        priority
      />
      <span>{tech.name}</span>
    </div>
  ))

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          What is this
          <HelpCircle className="w-5 h-5 ml-1" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] md:w-[60vw] max-w-2xl rounded-lg">
        <DialogHeader>
          <DialogTitle
            className="text-2xl mt-2"
          >
            Welcome to iQuiz!
          </DialogTitle>
          <DialogDescription className="my-2 mt-4">
            Are you tired of mundane and repetitive quizzes? Say goodbye to
            the ordinary and embrace the extraordinary with iQuiz! Our
            platform is revolutionizing the quiz and trivia experience by
            harnessing the immense potential of <strong>artificial intelligence</strong>.
          </DialogDescription>
        </DialogHeader>
        <hr />

        <div className="my-2 font-semibold text-[14px]">
          <h4 className="text-base font-semibold">Built with</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2 gap-y-3 md:gap-y-4">
            {listOfImages}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};


export default DetailsDialog;