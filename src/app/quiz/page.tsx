import TriviaApi from "@/api/trivia";
import Quiz from "./Quiz";

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
    return <div>{message}</div>;
  }

  return (
    <div>
      <Quiz questions={quiz.results} />
    </div>
  );
};

export default page;
