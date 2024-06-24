import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
}

interface Cast {
  id: number;
  name: string;
}

interface Genre {
  id: number;
  name: string;
}

interface Service {
  id: number;
  name: string;
}

interface Director {
    id: number;
    name: string;
  }

const CreateItem: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    image: '' as File | string,
    youtube_link: '',
    description: '',
    release_date: '',
    total_reviews: 0,
    star_rating: 0.0,
    phone_number: '',
    website: '',
    owner: '',
    address: '',
    cast: '', // Add cast field to formData
    genre: '', // Add genre field to formData
    service: '', // Add service field to formData
    director: '',
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [casts, setCasts] = useState<Cast[]>([]); // State for cast options
  const [genres, setGenres] = useState<Genre[]>([]); // State for genre options
  const [services, setServices] = useState<Service[]>([]); // State for service options
  const [directors, setDirectors] = useState<Director[]>([]);
  const [error, setError] = useState<string>('');
  const storedToken = localStorage.getItem('token');
  const apiUrl = import.meta.env.VITE_API_URL; 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/category-list/`
        );
        setCategories(response.data);
      } catch (error) {
        setError('Error fetching categories.');
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCasts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/cast/`);
        setCasts(response.data);
      } catch (error) {
        setError('Error fetching casts.');
      }
    };
    fetchCasts();
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/genre/`);
        setGenres(response.data);
      } catch (error) {
        setError('Error fetching genres.');
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/service/`);
        setServices(response.data);
      } catch (error) {
        setError('Error fetching services.');
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const fetchDirectors = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/director/`);
        setDirectors(response.data);
      } catch (error) {
        setError('Error fetching directors.');
      }
    };
    fetchDirectors();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
  
    // Check if the input is a multiselect
    const selectedOptions = type === 'select-multiple' ? getSelectedOptions(e.target as HTMLSelectElement) : value;
  
    // Update the state based on the field name
    setFormData({ ...formData, [name]: selectedOptions });
  };
  
  // Function to get selected options from a multiselect input
  const getSelectedOptions = (select: HTMLSelectElement): string[] => {
    const selectedOptions: string[] = [];
    for (let i = 0; i < select.options.length; i++) {
      const option = select.options[i];
      if (option.selected) {
        selectedOptions.push(option.value);
      }
    }
    return selectedOptions;
  };
  
  
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first selected file
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/api/create-item/`,
        formData,
        {
          headers: {
            Authorization: `Token ${storedToken}`,
            'Content-Type': 'multipart/form-data', 
          },
        }
      );
      console.log('Item created:', response.data);
      // Optionally, you can redirect the user or perform other actions after successful creation
    } catch (error) {
      setError('Error creating item.');
    }
  };


  return (
    <div>
      <h2>Create Item</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Category:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Image:
          <input type="file" name="image" onChange={handleImageChange} />
        </label>
        <label>
          YouTube Link:
          <input
            type="text"
            name="youtube_link"
            value={formData.youtube_link}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Release Date:
          <input
            type="date"
            name="release_date"
            value={formData.release_date}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </label>
        <label>
          Website:
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </label>
        <label>
          Owner:
          <input
            type="text"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <label>
          Cast:
          <select
            name="cast"
            value={formData.cast}
            onChange={handleChange}
          >
            <option value="">Select a cast</option>
            {casts.map((cast) => (
              <option key={cast.id} value={cast.id}>
                {cast.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Director:
          <select
            name="director"
            value={formData.director}
            onChange={handleChange}
          >
            <option value="">Select a director</option>
            {directors.map((director) => (
              <option key={director.id} value={director.id}>
                {director.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Genre:
          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          >
            <option value="">Select a genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Service:
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateItem;