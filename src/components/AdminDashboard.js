import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner"; // Assume Spinner is in the same directory

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  useEffect(() => {
    axios
      .get("https://movieapp-api-lms1.onrender.com/movies/getMovies")
      .then((response) => {
        setMovies(response.data.movies || []);
        setIsLoading(false); // Set loading to false after fetching data
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setIsLoading(false); // Set loading to false even on error
      });
  }, []);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  return (
    <div className="text-gray-100 p-3">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-center my-5">Admin Dashboard</h1>

        <button
          type="button"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Add Movie
        </button>
      </div>

      {/* Spinner or Movie Table */}
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto my-5">
          <table className="min-w-full border-collapse bg-gray-800 text-gray-200">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2 border border-gray-600">Name</th>
                <th className="px-4 py-2 border border-gray-600">
                  Description
                </th>
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
                  <td className="p-2 border border-gray-600">
                    <div className="flex flex-col gap-2">
                      <button className="w-20 h-9 py-1 px-3 text-sm font-medium bg-blue-500 text-white rounded hover:bg-blue-600">
                        Edit
                      </button>
                      <button className="w-20 h-9 text-sm font-medium bg-red-500 text-white rounded hover:bg-red-600">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Buttons */}
      {!isLoading && (
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
      )}
    </div>
  );
};

export default AdminDashboard;
