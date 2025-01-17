import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]); // All movies
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const moviesPerPage = 10; // Number of movies per page

  useEffect(() => {
    axios
      .get("https://movieapp-api-lms1.onrender.com/movies/getMovies")
      .then((response) => {
        setMovies(response.data.movies || []);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
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

  // Placeholder functions for edit and delete actions
  const handleEdit = (id) => {
    console.log(`Edit movie with ID: ${id}`);
    // Add logic for editing a movie
  };

  const handleDelete = (id) => {
    console.log(`Delete movie with ID: ${id}`);
    // Add logic for deleting a movie
  };

  return (
    <div className="text-gray-100 p-3">
      <h1 className="text-5xl font-bold text-center py-5 my-5">
        Admin Dashboard - Manage Movies
      </h1>

      {/* Movie Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-gray-800 text-gray-200">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-2 border border-gray-600">Name</th>
              <th className="px-4 py-2 border border-gray-600">Description</th>
              <th className="px-4 py-2 border border-gray-600">Director</th>
              <th className="px-4 py-2 border border-gray-600">Year</th>
              <th className="px-4 py-2 border border-gray-600">Genre</th>
              <th className="px-4 py-2 border border-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentMovies.map((movie) => (
              <tr key={movie._id} className="hover:bg-gray-700">
                <td className="px-4 py-2 border border-gray-600">
                  {movie.title}
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  {movie.description}
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  {movie.director}
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  {movie.year}
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  {movie.genre}
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  <button
                    onClick={() => handleEdit(movie._id)}
                    className="py-1 px-3 text-sm font-medium bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(movie._id)}
                    className="py-1 px-3 ml-2 text-sm font-medium bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-4 gap-1">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 my-4 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
