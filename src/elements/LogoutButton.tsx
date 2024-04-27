import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const LogoutButton: React.FC = () => {
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    try {
      const storedToken = localStorage.getItem("token");

      await axios.post(
        'http://127.0.0.1:8000/api/logout/', 
        null, // No data to send in the request body
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${storedToken}`,
          },
          withCredentials: true // This option should be outside the headers object
        }
      );

      localStorage.removeItem('token'); // Clear token from localStorage upon logout
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <button className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
