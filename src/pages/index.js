import React, { useContext, useEffect, useState } from "react";
import NewsList from "../components/News/NewsList";
import styles from "../styles/index.module.css";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import { StateContext, StateProvider } from "../utils/state";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseInt";
const Home = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const { state, dispatch } = useContext(StateContext); 

  const toggleComponent = () => {
    setIsRegistered(!isRegistered);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        dispatch({ type: "SET_USER", payload: user });
      } else {
        // User is signed out
        dispatch({ type: "SET_USER", payload: null });
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, [auth, dispatch]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Sign-out successful.
    } catch (error) {
      console.error("Sign-out error:", error.message);
    }
  };

  return (
    <div className={styles.container}>
      {state && state.user ? (
        <div className={styles.newsListContainer}>
          <h1 className={styles.stateUserName}>Welcome, {state.user.email}!</h1>
          <button onClick={handleSignOut} className={styles.SignOutButton}>Sign Out</button>
          <NewsList />
        </div>
      ) : (
        <div className={styles.loginSignupTooggle}>
          {isRegistered ? <Register /> : <Login />}
          <button onClick={toggleComponent}>
           <span className={styles.buttonText}>Switch to {isRegistered ? "Login" : "Sign Up"}</span> 
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
