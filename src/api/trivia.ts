export default class TriviaApi {
  static async getCategories(): Promise<TriviaCategory[]> {
    const response = await fetch("https://opentdb.com/api_category.php", {
      next: {
        revalidate: 3600,
      },
    });
    const data = await response.json();
    return data["trivia_categories"];
  }
  static async getQuiz(
    amount: number | string,
    categoryId: number | string,
    difficulty: string
  ): Promise<TriviaBooleanQuiz> {
    let url = `https://opentdb.com/api.php?type=boolean&amount=${amount}&difficulty=${difficulty}`;
    if (categoryId) {
      url += `&category=${categoryId}`;
    }
    console.log(url);
    const response = await fetch(url, {
      next: {
        revalidate: 3600,
      },
    });
    const data = await response.json();

    return data;
  }
  static resolveResponseCode(responseCode: number) {
    switch (responseCode) {
      case 1:
        return "Not enough results";
      case 2:
        return "Invalid parameters";
      case 3:
        return "Internal server error";
      case 4:
        return "Internal server error";
      case 5:
        return "Too many requests";
      default:
        return "Unknown error";
    }
  }
}

type TriviaQuestionDifficulty = "easy" | "medium" | "hard";

type TriviaQuestion = {
  difficulty: TriviaQuestionDifficulty;
  category: string;
  question: string;
};

export type TriviaBooleanQuiz = {
  response_code: number;
  results: TriviaBooleanQuestion[];
};

export type TriviaBooleanQuestion = TriviaQuestion & {
  correct_answer: "True" | "False";
  incorrect_answers: string[];
};

export type TriviaCategory = {
  id: number;
  name: string;
};

export type TriviaDifficulties = "easy" | "medium" | "hard";
