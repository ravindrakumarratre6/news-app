
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseInt';
import styles from "../../styles/Register.module.css";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      // Use createUserWithEmailAndPassword directly inside handleRegister
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Access user from userCredential
      const user = await userCredential.user;
      
      // Save user information in local storage
      localStorage.setItem('user', JSON.stringify(user));

      // Continue with any other logic after successful registration
      console.log('Registration successful:', user);
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.registerHeading}>Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br/>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br/>
      <button onClick={handleRegister} className={styles.registerButton}>Register</button>
    </div>
  );
};

export default Register;
