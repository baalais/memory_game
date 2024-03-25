// App.js

import React, { useState } from 'react';
import '../style/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    // Simple email validation
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);
    setIsEmailValid(isValid);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    // Simple password validation
    const isValid = newPassword.length >= 6;
    setIsPasswordValid(isValid);
  };

  const handleConfirmPasswordChange = (event) => {
    const newPassword = event.target.value;
    setConfirmPassword(newPassword);

    // Confirm password validation
    const isValid = newPassword === password;
    setIsConfirmPasswordValid(isValid);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if all fields are valid
    const isFormValid = isEmailValid && isPasswordValid && isConfirmPasswordValid;
    setIsFormValid(isFormValid);

    // If form is valid, submit data
    if (isFormValid) {
      // Perform registration or login actions
      console.log('Registration/Login successful!');
    }
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          className={!isEmailValid ? 'invalid' : ''}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          className={!isPasswordValid ? 'invalid' : ''}
        />
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className={!isConfirmPasswordValid ? 'invalid' : ''}
        />
        <button type="submit" disabled={!isFormValid}>Register/Login</button>
      </form>
    </div>
  );
}

export default Login;
