import React, { useState, useEffect } from 'react';
import '../style/ProfileSettings.css';

function ProfileSettings() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [backgroundColor, setBackgroundColor] = useState(
    localStorage.getItem('backgroundColor') || '#ffffff'
  );

  useEffect(() => {
    localStorage.setItem('backgroundColor', backgroundColor);
  }, [backgroundColor]);

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if all fields are empty
    if (!fullName && !email && !password && !confirmPassword) {
      setMessage('Please change at least something.');
      return;
    }

    // Email validation
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage('Please enter a valid email.');
      return;
    }

    // Password validation
    if (password && password.length < 8) {
      setMessage('Password must be at least 8 characters long.');
      return;
    }

    // Confirm password validation
    if (password && (!confirmPassword || confirmPassword !== password)) {
      setMessage('Passwords do not match.');
      return;
    }

    // If form is valid, submit data
    console.log('Profile updated successfully!');
    setMessage('Profile updated successfully!');
  };

  return (
    <div className="ProfileSettings">
      <div className="Profile-background" style={{ backgroundColor }}>
        <h2>Edit Profile</h2>
        <form className="Profile-form" onSubmit={handleSubmit}>
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
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <button type="submit" className="transparent">Save Changes</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default ProfileSettings;
