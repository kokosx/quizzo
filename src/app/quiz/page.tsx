import TriviaApi from "@/api/trivia";
import Quiz from "./Quiz";
import Link from "next/link";

type Props = {
  searchParams: {
    amount: string;
    category: string;
    difficulty: string;
  };
};

const page = async ({ searchParams }: Props) => {
  const quiz = await TriviaApi.getQuiz(
    searchParams.amount,
    searchParams.category,
    searchParams.difficulty
  );
  if (quiz.response_code !== 0) {
    const message = TriviaApi.resolveResponseCode(quiz.response_code);
    return (
      <div className="flex flex-col gap-y-2">
        <span>{message}</span>
        <Link href="/" className="btn btn-secondary">
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Quiz questions={quiz.results} />
    </div>
  );
};

export default page;
