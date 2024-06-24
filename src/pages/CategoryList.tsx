// CategoryList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/category-list/`);
        setCategories(response.data.map((category: any) => category.name));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
