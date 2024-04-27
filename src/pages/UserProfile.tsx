import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface UserData {
  id: number;
  username: string;
  email: string;
  phone_number: string;
  gender: string;
  country: string;
  state: string;
  profile_picture: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        const response = await axios.get('http://127.0.0.1:8000/api/user-profile/', {
          headers: {
            'Authorization': `Token ${storedToken}`,
          },
        });

        const userData: UserData = response.data;
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user ? (
        <div>
          <h2>User Profile</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Phone Number: {user.phone_number}</p>
          <p>Gender: {user.gender}</p>
          <p>Country: {user.country}</p>
          <p>State: {user.state}</p>
          {user.profile_picture ? (
            <img src={user.profile_picture} alt="Profile Picture" />
          ) : (
            <div>No profile picture available</div>
          )}
          {/* Additional user details can be displayed here */}
        </div>
      ) : (
        <div>No user found.</div>
      )}
    </div>
  );
};

export default UserProfile;
