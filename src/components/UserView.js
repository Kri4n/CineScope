import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

const UserView = () => {
  const [movies, setMovies] = useState([]); // All movies
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [loading, setLoading] = useState(true); // Loading state
  const moviesPerPage = 10; // Number of movies per page

  useEffect(() => {
    setLoading(true); // Set loading to true before fetching
    axios
      .get("https://movieapp-api-lms1.onrender.com/movies/getMovies")
      .then((response) => {
        setMovies(response.data.movies || []);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after fetching
      });
  }, []);

  // Calculate indices for pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Total pages
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  return (
    <div className="text-gray-100 p-3">
      <h1 className="text-5xl font-bold text-center py-5 my-5">
        Discover Movies and TV Shows
      </h1>

      {loading ? (
        <Spinner />
      ) : (
        // Render movies if not loading
        <>
          <div className="flex justify-center flex-wrap gap-5 flex-row">
            {currentMovies.map((movie) => (
              <div
                key={movie._id}
                className="max-w-sm bg-gray-800 border-gray-700"
              >
                <img
                  className="rounded-t-lg h-2/5 w-full"
                  src="https://image.tmdb.org/t/p/original/cGm2qnmXx9tFabmzEIkJZjCJdQd.jpg"
                />

                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                      {movie.title}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {movie.description}
                  </p>
                  <button
                    type="button"
                    className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    <Link to={`/movies/${movie._id}`}>Details</Link>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Buttons */}
          <div className="flex justify-center mt-4 gap-1">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 my-20 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserView;
