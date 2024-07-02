"use client";

import { TriviaBooleanQuestion } from "@/api/trivia";
import { useState } from "react";
import Results from "./Results";
import { sanitize } from "isomorphic-dompurify";

type Props = {
  questions: TriviaBooleanQuestion[];
};

const Quiz = ({ questions }: Props) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<boolean[]>([]);

  const [end, setEnd] = useState(false);

  const handleAnswer = (answer: boolean) => {
    setAnswers((p) => [...p, answer]);
    setCurrentQuestion((p) => p + 1);

    if (currentQuestion + 1 === questions.length) {
      setEnd(true);
    }
  };

  const startOver = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setEnd(false);
  };

  if (end) {
    return (
      <Results startOver={startOver} answers={answers} questions={questions} />
    );
  }

  return (
    <div className="flex flex-col gap-y-4 items-center">
      <p
        dangerouslySetInnerHTML={{
          __html: sanitize(questions[currentQuestion]?.question),
        }}
      ></p>
      <div className="space-x-4">
        <button onClick={() => handleAnswer(false)} className="btn btn-error">
          False
        </button>
        <button onClick={() => handleAnswer(true)} className="btn btn-success">
          True
        </button>
      </div>
    </div>
  );
};

export default Quiz;
