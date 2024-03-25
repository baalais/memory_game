// ProfilePage.js

import React from 'react';
import '../style/ProfilePage.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ProfilePage() {
  return (
    <div className="ProfilePage">
      <div className="ProfileCard">
        <img src="data:image/jpeg;base64,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" alt="Profile" className="ProfilePicture" />
        <div className="ProfileInfo">
          <h2>John Doe</h2>
          <p>Email: johndoe@example.com</p>
          <p>Location: New York, USA</p>
          <p>Joined: January 1, 2022</p>
          <Link className={`{style.router}`} to="/ProfileSettings">Edit Profile</Link>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
