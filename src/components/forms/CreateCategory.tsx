import React, { useState } from 'react';
import axios from 'axios';

const CreateCategory: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const storedToken = localStorage.getItem('token');
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image!);
      const response = await axios.post(
        `${apiUrl}/api/create-category/`,
        formData,
        {
          headers: {
            'Authorization': `Token ${storedToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Category created:', response.data);
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <div>
      <h2>Create Category</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Image:
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files![0])} />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateCategory;
