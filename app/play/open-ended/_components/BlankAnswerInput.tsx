import { BlankAnswerInputProps } from "@/entries/Entries";
import keyword_extractor from "keyword-extractor";
import { Fragment, useEffect, useMemo } from "react";


const BlankAnswerInput = (
  { answer, setBlankAnswer }: BlankAnswerInputProps) => {

  const blank = "_____";


  const keywords = useMemo(() => {
    if (!answer) return [];
    const words = keyword_extractor.extract(answer, {
      language: "english",
      remove_digits: true,
      return_changed_case: false,
      remove_duplicates: false,
    });
    return words.sort(() => 0.5 - Math.random()).slice(0, 2);
  }, [answer]);

  const answerWithBlanks = useMemo(() => {
    if (!answer) return "";
    return keywords.reduce((acc, curr) => acc.replaceAll(curr, blank), answer);
  }, [answer, keywords]);

  useEffect(() => {
    setBlankAnswer(answerWithBlanks);
  }, [answerWithBlanks, setBlankAnswer]);


  const answerParts = useMemo(() => answerWithBlanks.split(blank), [answerWithBlanks]);


  const listOfAnswerParts = answerParts.map((part, index) => (
    <Fragment key={index}>
      {part}
      {index < answerParts.length - 1 && (
        <input
          id="user-blank-input"
          className="text-center border-b-2 border-black dark:border-white w-28 focus:outline-none focus:ring-0 mx-1"
          type="text"
        />
      )}
    </Fragment>
  ))

  return (
    <div className="flex justify-start w-full mt-4">
      <h1 className="text-xl font-semibold">
        {listOfAnswerParts}
      </h1>
    </div>
  );
};

export default BlankAnswerInput;

