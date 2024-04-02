import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate
import '../style/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(true); // Initialize as true to prevent initial error message
  const [redirectToGame, setRedirectToGame] = useState(false);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    // Simple email validation
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);
    setIsEmailValid(isValid && newEmail.trim() !== ''); // Check if email is not empty
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    // Simple password validation
    const isValid = newPassword.length >= 6;
    setIsPasswordValid(isValid && newPassword.trim() !== ''); // Check if password is not empty
  };

  const handleConfirmPasswordChange = (event) => {
    const newPassword = event.target.value;
    setConfirmPassword(newPassword);

    // Confirm password validation
    const isValid = newPassword === password;
    setIsConfirmPasswordValid(isValid && newPassword.trim() !== ''); // Check if confirmPassword is not empty
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if all fields are valid and not empty
    const isFormValid = isEmailValid && isPasswordValid && isConfirmPasswordValid && email.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '';
    setIsFormValid(isFormValid);

    // If form is valid, submit data and redirect
    if (isFormValid) {
      // Perform registration or login actions
      console.log('Registration/Login successful!');
      // Set redirect flag to true
      setRedirectToGame(true);
    }
  };

  // Redirect to MemoryGame page if redirectToGame is true
  if (redirectToGame) {
    return <Navigate to="/MemoryGame" />;
  }

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
        {!isEmailValid && <p className="error-message">Please enter a valid email address</p>}
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          className={!isPasswordValid ? 'invalid' : ''}
        />
        {!isPasswordValid && <p className="error-message">Password must be at least 6 characters long</p>}
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className={!isConfirmPasswordValid ? 'invalid' : ''}
        />
        {!isConfirmPasswordValid && <p className="error-message">Passwords do not match</p>}
        <button type="submit" disabled={!isFormValid}>Register/Login</button>
      </form>
    </div>
  );
}

export default Login;
