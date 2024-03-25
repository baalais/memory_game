// ProfileSettings.jsx

import React, { useState } from 'react';
import '../style/ProfileSettings.css';

function ProfileSettings() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
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
    const isFormValid = isPasswordValid && isConfirmPasswordValid;
    setIsFormValid(isFormValid);

    // If form is valid, submit data
    if (isFormValid) {
      // Perform profile update actions
      console.log('Profile updated successfully!');
    }
  };

  return (
    <div className="ProfileSettings">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={handleFullNameChange}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={handlePasswordChange}
          className={!isPasswordValid ? 'invalid' : ''}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className={!isConfirmPasswordValid ? 'invalid' : ''}
        />
        <button type="submit" disabled={!isFormValid}>Save Changes</button>
      </form>
    </div>
  );
}

export default ProfileSettings;
