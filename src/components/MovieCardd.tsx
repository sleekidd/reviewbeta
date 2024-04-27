import React, { useState, useEffect } from "react";
import axios from "axios";
import StarRating from "./StarRating";

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

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/items/");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const fetchCasts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/cast/");
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
      <div className="max-w-sm flex justify-between items-center mb-4">
        <h2
          className="text-xl font-bold"
          style={{ fontFamily: "Inter", fontSize: "24px" }}
        >
          Trending Movies
        </h2>
        <button
          className="text-blue-500 hover:underline"
          style={{ fontFamily: "Inter", fontSize: "16px" }}
        >
          View All
        </button>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            style={{
              width: "380px",
              border: "1px solid #f0f0f0",
              borderRadius: "9px",
            }}
          >
            <div
              key={movie.id}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img
                  className="rounded-t-lg"
                  src={movie.image}
                  alt={movie.title}
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {movie.title}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {getCastNames(movie.cast)}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {movie.release_date}
                </p>
                <div className="flex items-center mt-2">
                  <StarRating rating={movie.star_rating || 0} />
                  <p
                    className="text-gray-500 text-sm"
                    style={{
                      fontFamily: "Inter",
                      fontSize: "14px",
                      fontWeight: "600",
                      paddingLeft: "8px",
                    }}
                  >
                    {(movie.star_rating || 0).toFixed(1)} (
                    {movie.total_reviews || 0} reviews)
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default MovieCard;
