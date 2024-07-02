"use client";

import { TriviaBooleanQuestion } from "@/api/trivia";
import { sanitize } from "dompurify";
import Link from "next/link";

type Props = {
  questions: TriviaBooleanQuestion[];
  answers: boolean[];
  startOver: () => void;
};

const Results = ({ answers, questions, startOver }: Props) => {
  const isCorrect = (correctAnswer: string, index: number) => {
    if (correctAnswer === "True" && answers[index]) {
      return true;
    }
    if (correctAnswer === "False" && !answers[index]) {
      return true;
    }
    return false;
  };

  const countCorrect = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (isCorrect(questions[index].correct_answer, index)) {
        correct++;
      }
    });
    return correct;
  };

  return (
    <div className="flex flex-col gap-y-2">
      <h1 className="text-3xl font-semibold">Results</h1>
      <h2>
        Correct: {countCorrect()} / {questions.length}
      </h2>
      {questions.map((question, index) => {
        return (
          <div className="border-2 p-2 border-primary rounded-md" key={index}>
            <p
              dangerouslySetInnerHTML={{ __html: sanitize(question.question) }}
            ></p>
            <p
              className={`${
                isCorrect(question.correct_answer, index)
                  ? "text-success"
                  : "text-error"
              }`}
            >
              {question.correct_answer}
            </p>
          </div>
        );
      })}
      <div className="w-full flex gap-x-2">
        <button onClick={startOver} className="btn btn-secondary">
          Play again
        </button>
        <Link href="/" className="btn btn-accent">
          Start a new quiz
        </Link>
      </div>
    </div>
  );
};

export default Results;
