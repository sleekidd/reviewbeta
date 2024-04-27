// ListCategories.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
}

const ListCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const storedToken = localStorage.getItem('token'); // Retrieve token from localStorage

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>('http://127.0.0.1:8000/api/categories/', {
          headers: {
            Authorization: `Token ${storedToken}`, // Include token in request headers
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [storedToken]); // Trigger useEffect when token changes

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListCategories;
