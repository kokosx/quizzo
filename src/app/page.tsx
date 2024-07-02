import TriviaApi from "@/api/trivia";
import StartForm from "./StartForm";

const page = async () => {
  const categories = await TriviaApi.getCategories();
  return (
    <div>
      <h2 className="text-4xl font-semibold">Quizzo</h2>
      <h3>Generate quizzes and check your knowledge!</h3>
      <StartForm categories={categories} />
    </div>
  );
};

export default page;
