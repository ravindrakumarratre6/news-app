import axios from "axios";

const fetchNews = async () => {
  try {
    const apiKey = "e86e3cd1a6c74710aa87e523a3816e94"; // Replace with your actual API key
    const apiUrl = "https://newsapi.org/v2/everything";
    const queryString = "tesla";
    const fromDate = "2023-11-05";
    const sortBy = "publishedAt";

    const response = await axios.get(
      `${apiUrl}?q=${queryString}&from=${fromDate}&sortBy=${sortBy}&apiKey=${apiKey}`
    );
    if (
      response.data &&
      response.data.articles &&
      Array.isArray(response.data.articles)
    ) {
      console.log("res", response.data.articles);
      return response.data.articles;
    } else {
      console.error("Invalid data structure received:", response.data);
      return []; // or handle the error as needed
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    return []; // or handle the error as needed
  }
};

export { fetchNews };
