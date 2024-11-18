import React, { useEffect, useState } from 'react';
import {fetchUserProfile} from '../services/api';
import '../styles/Profile.css'; // Assuming custom styles

function Profile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {

   fetchUserProfile(localStorage.getItem('token')).then(
    user =>{
      if(user.status){
        setUser(user.data)
        setLoading(false)
      }else{
        setLoading(true)
      }

    }
   )
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-header">Your Profile</h2>
        <div className="profile-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Skills:</strong> {user.skills}</p>
          <p><strong>Location:</strong> {user.location}</p>
        </div>
        <button className="edit-button" onClick={() => alert('Edit profile functionality will be added soon.')}>
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
