const apiUrl = 'https://newsapi.org/v2/everything?q=bitcoin&apiKey=e86e3cd1a6c74710aa87e523a3816e94';

const fetchData = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
    return data.articles; // Assuming you want the articles array
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

export default fetchData;
