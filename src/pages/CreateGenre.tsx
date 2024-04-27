import React, { useState } from 'react';
import axios from 'axios';

const CreateGenre: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');

  const storedToken = localStorage.getItem('token');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);

      const response = await axios.post(
        'http://127.0.0.1:8000/api/create-genre/',
        formData,
        {
          headers: {
            Authorization: `Token ${storedToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(' Genre created:', response.data);
    } catch (error) {
      console.error('Error creating genre:', error);
      setError('Error creating genre. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create Genre</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateGenre;