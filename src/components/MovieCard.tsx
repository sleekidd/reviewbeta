import React, { useState, useEffect } from "react";
import axios from "axios";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";

interface Movie {
  id: number;
  image: string;
  title: string;
  cast: number[]; // Change the type of cast to an array of numbers (IDs)
  release_date: string;
  star_rating: number;
  total_reviews: number;
}

interface Cast {
  id: number;
  name: string;
}

const MovieCard: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [casts, setCasts] = useState<Cast[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${apiUrl}/items/`);
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const fetchCasts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/cast/`);
        setCasts(response.data);
      } catch (error) {
        console.error("Error fetching casts:", error);
      }
    };

    fetchMovies();
    fetchCasts();
  }, []);

  // Function to get the names of the casts from their IDs
  const getCastNames = (castIds: number[]): string => {
    return castIds
      .map((castId) => {
        const cast = casts.find((c) => c.id === castId);
        return cast ? cast.name : "";
      })
      .join(", ");
  };

  // Render movies only if both movies and casts are available
  if (movies.length === 0 || casts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
      <div className="flex flex-col justify-between items-center mb-12">
        <h2 className="text-[44px] font-semibold tracking-[-2px] header-text">
          Explore Categories
        </h2>
        <p className="text-lg text-center body-text">
          We are out to provide convenience and general body well being.
        </p>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 body-text">
        {movies.map((movie) => (
          <div
            key={movie.id} // Ensure each movie has a unique key
            className="max-w-[380px] rounded-[8px]"
            style={{
              border: "1px solid #f0f0f0",
            }}
          >
            <Link to={`/details/${movie.id}/`}>
              <div className="bg-white rounded-lg overflow-hidden">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-40 object-cover object-center"
                />
                <div className="p-4 space-y-2">
                  <h2 className="text-[18px] font-semibold">{movie.title}</h2>
                  <p
                    className="text-gray-500 text-[16px] font-medium"
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    {/* Use getCastNames function to get the names of the casts */}
                    {getCastNames(movie.cast)}
                  </p>
                  <p
                    className="text-gray-500 text-[14px]"
                    style={{
                      letterSpacing: "1px",
                    }}
                  >
                    {movie.release_date}
                  </p>
                  <div className="flex items-center mt-2">
                    <StarRating rating={movie.star_rating || 0} />
                    <p className="text-gray-500 text-[14px] font-semibold px-2">
                      {(movie.star_rating || 0).toFixed(1)} (
                      {movie.total_reviews || 0} reviews)
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>

      <div className="flex justify-center items-center mt-6">
        <button
          type="button"
          className="px-5 py-3 text-base font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          View All
          <svg
            className="w-4 h-4 text-white dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m9 5 7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
