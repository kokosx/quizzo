//https://opentdb.com/api.php?amount=10&category=25&difficulty=medium&type=boolean
class TriviaApi {
  async getCategories(): Promise<TriviaCategory[]> {
    const response = await fetch("https://opentdb.com/api_category.php", {
      cache: "force-cache",
      next: {
        revalidate: 3600,
      },
    });
    const data = await response.json();
    return data["trivia_categories"];
  }
}

type TriviaCategory = {
  id: number;
  name: string;
};
