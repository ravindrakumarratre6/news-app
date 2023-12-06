import React, { useContext, useEffect, useState } from "react";
import { fetchNews } from "../../utils/api";
import { StateContext } from "../../utils/state";
import styles from "../../styles/NewsList.module.css";

const NewsList = () => {
  const { state, dispatch } = useContext(StateContext);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const data = await fetchNews();
        setNews(data);
        setLoading(false);
        dispatch({ type: "SET_NEWS", payload: data });
      } catch (error) {
        setLoading(false);
        console.error("Error fetching news:", error);
      }
    };
    fetchNewsData();
  }, [dispatch]);

  const handleToggleFavorite = (index) => {
    const updatedNews = [...news];
    updatedNews[index].isFavorite = !updatedNews[index].isFavorite;
    setNews(updatedNews);
  };

  return (
    <div className={styles.newslistMainContainer}>
      <h2 className={styles.newslistHeading}>News List</h2>
      <ul className={styles.newslistListContainer}>
        {loading ? (
          <p className={styles.loading}>Loading.......</p>
        ) : (
          news.map((article, index) => (
            <li key={index}>
              <div className={styles.newslistDetails}>
                <h3 className={styles.newsListTitle}>{article.title}</h3>
                <p className={styles.newsListAuthor}>
                  Author: {article.author}
                </p>
                <p className={styles.newsListPublish}>
                  Published At: {article.publishedAt}
                </p>
                <p className={styles.newsListDescription}>
                  Description: {article.description}
                </p>
                <p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.url}
                  </a>
                </p>
                <img
                  src={article.urlToImage}
                  className={styles.newslistImage}
                  alt={article.title}
                />
                <button
                  onClick={() => handleToggleFavorite(index)}
                  className={styles.favoriteButton}
                >
                  {article.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default NewsList;
