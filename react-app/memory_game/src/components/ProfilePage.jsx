import React, { useState, useEffect } from 'react';
import '../style/ProfilePage.css';
import { Link } from 'react-router-dom';

function ProfilePage() {
  const [backgroundColor, setBackgroundColor] = useState(
    localStorage.getItem('backgroundColor') || '#ffffff'
  );

  useEffect(() => {
    localStorage.setItem('backgroundColor', backgroundColor);
  }, [backgroundColor]);

  return (
    <div className="ProfilePage">
      <div className="background-overlay" style={{ backgroundColor }}></div>
      <div className="ProfileCard">
        <div className="ProfileInfo">
          <h2>John Doe</h2>
          <p>Email: johndoe@example.com</p>
          <p>Location: New York, USA</p>
          <p>Joined: January 1, 2022</p>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
          <Link className="edit-profile" to="/ProfileSettings">Edit Profile</Link>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
