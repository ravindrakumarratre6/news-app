import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebaseInt";
import styles from "../../styles/Login.module.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Check if user information is present in local storage
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const user = JSON.parse(storedUser);
      // You can use the user information for any necessary logic
      console.log('User information from local storage:', user);
    }
  }, []); // Empty dependency array to run this effect only once, similar to componentDidMount

  const handleLogin = async () => {
    try {
      // If user information is not present in local storage, perform login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Access user from userCredential
      const user = await userCredential.user;

      // Save user information in local storage
      localStorage.setItem('user', JSON.stringify(user));

      // Continue with any other logic after successful login
      console.log('Login successful:', user);
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginHeading}>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin} className={styles.loginButton}>Login</button>
    </div>
  );
};

export default Login;
