import React, { useState } from 'react';
import axios from 'axios';

const CreateDirector: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const apiUrl = import.meta.env.VITE_API_URL;

  const storedToken = localStorage.getItem('token');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      if (image) {
        formData.append('image', image);
      }

      const response = await axios.post(
        `${apiUrl}/api/create-director/`,
        formData,
        {
          headers: {
            Authorization: `Token ${storedToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(' Director created:', response.data);
    } catch (error) {
      console.error('Error creating director:', error);
      setError('Error creating director. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create Director</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Image:
          <input type="file" onChange={handleImageChange} />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateDirector;
