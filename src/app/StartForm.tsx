"use client";

import { useEffect, useState } from "react";
import { TriviaCategory, TriviaDifficulties } from "../api/trivia";
import { useRouter } from "next/navigation";

type Props = {
  categories: TriviaCategory[];
};

const StartForm = ({ categories }: Props) => {
  //A string because of how text input works
  const [amount, setAmount] = useState("10");
  const [categoryId, setCategoryId] = useState(categories[0].id);
  const [difficulty, setDifficulty] = useState<TriviaDifficulties>("medium");

  const router = useRouter();

  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const _amount = Number(amount);
    if (_amount < 1 || _amount > 50) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [amount]);

  const startQuiz = () => {
    router.push(
      `/quiz?amount=${amount}&category=${categoryId}&difficulty=${difficulty}`
    );
  };

  return (
    <div className="flex flex-col gap-y-2 ">
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Amount of questions (max 50)</span>
        </div>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="10"
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Pick a category</span>
        </div>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          className="select select-bordered w-"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Select difficulty</span>
        </div>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as TriviaDifficulties)}
          className="select select-bordered w-"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
      <button
        onClick={startQuiz}
        disabled={!isValid}
        className="btn  btn-primary w-full"
      >
        Generate
      </button>
    </div>
  );
};

export default StartForm;
