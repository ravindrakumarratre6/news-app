import React from "react";
import NewsList from "../components/News/NewsList";
import styles from "../styles/index.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <NewsList />
    </div>
  );
};

export default Home;
