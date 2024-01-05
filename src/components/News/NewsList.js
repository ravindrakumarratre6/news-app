"use client";
import React, { useContext, useEffect, useState } from "react";
import fetchData from "@/utils/api";
import { StateContext } from "@/utils/state";
import styles from "../../styles/NewsList.module.css"
const NewsList = () => {
  const { dispatch } = useContext(StateContext);
  const [news, setNews] = useState([]);
const [loading,setLoading] =useState(true)
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const data = await fetchData();
        console.log("data", data);
        if (Array.isArray(data)) {
          setLoading(false)
          setNews(data);
          dispatch({ type: "SET_NEWS", payload: data });
        } else {
          console.error("Invalid data structure received:", data);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNewsData();
  }, []);

  return (
    <div className={styles.newslistMainContainer}>
      <h2 className={styles.newslistHeading}>News List</h2>
      <ul className={styles.newslistListContainer}>
        {loading?<p className={styles.loading}>Loading.......</p>: news.map((article,index) => (
          <li key={index}>
            <div className={styles.newslistDetails}>
              <h3 className={styles.newsListTitle}>{article.title}</h3>
              <p className={styles.newsListAuthor}>Author: {article.author}</p>
              <p  className={styles.newsListPublish}>Published At: {article.publishedAt}</p>
              <p  className={styles.newsListDescription}>Description: {article.description}</p>
              <p  className={styles.newsListSourceName}>Source: {article.source.name}</p>
              <p>
                URL:
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.url}
                </a>
              </p>
              <img src={article.urlToImage} alt={article.title}  className={styles.newslistImage}/>
              <button className={styles.addButton}>Add News</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
