import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner"; // Assume Spinner is in the same directory
import { Notyf } from "notyf";

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const moviesPerPage = 10;

  // New movie input fields value
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState(0);
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");

  const notyf = new Notyf();

  const fetchMovies = () => {
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
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const addMovie = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");

    axios
      .post(
        "https://movieapp-api-lms1.onrender.com/movies/addMovie",
        {
          title: title,
          director: director,
          year: year,
          description: description,
          genre: genre,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        notyf.success("Movie added");
        fetchMovies();
        setIsModalOpen(false);
      })
      .catch((error) => {
        notyf.error("Error adding movie");
      });
  };

  // Edit Movie

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [editTitle, setEditTitle] = useState("");
  const [editDirector, setEditDirector] = useState("");
  const [editYear, setEditYear] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editGenre, setEditGenre] = useState("");
  const [editMovieId, setEditMovieId] = useState(null);

  const openEditModal = (editMovieId) => {
    setEditMovieId(editMovieId);
    setIsEditModalOpen(true);
  };

  const updateMovie = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");

    axios
      .patch(
        `https://movieapp-api-lms1.onrender.com/movies/updateMovie/${editMovieId}`,
        {
          title: editTitle,
          director: editDirector,
          year: editYear,
          description: editDescription,
          genre: editGenre,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        notyf.success("Movie updated successfully");
        fetchMovies();
        setIsEditModalOpen(false);
      })
      .catch((error) => {
        notyf.error("Error updating movie");
      });
  };

  // Delete movie
  const deleteMovie = (deleteMovieId) => {
    let token = localStorage.getItem("token");
    axios
      .delete(
        `https://movieapp-api-lms1.onrender.com/movies/deleteMovie/${deleteMovieId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        notyf.success("Movie deleted");
        fetchMovies();
      })
      .catch((error) => {
        notyf.error("Failed to delete movie");
      });
  };

  return (
    <div className="text-gray-100 p-3">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-center my-5">Admin Dashboard</h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="block text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Add Movie
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-sm dark:bg-gray-700 w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-600 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add New Movie
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form className="p-4" onSubmit={addMovie}>
              <div className="grid gap-4 mb-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter movie title"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="director"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Director
                  </label>
                  <input
                    onChange={(e) => setDirector(e.target.value)}
                    type="text"
                    id="director"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter director"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="year"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Year
                  </label>
                  <input
                    onChange={(e) => setYear(e.target.value)}
                    type="text"
                    id="year"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter year released"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    id="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter description"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="genre"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Genre
                  </label>
                  <input
                    onChange={(e) => setGenre(e.target.value)}
                    type="text"
                    id="genre"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter genre"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Add Movie
              </button>
            </form>
          </div>
        </div>
      )}

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
                      <button
                        onClick={() => openEditModal(movie._id)}
                        className="w-20 h-9 py-1 px-3 text-sm font-medium bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteMovie(movie._id)}
                        className="w-20 h-9 text-sm font-medium bg-red-500 text-white rounded hover:bg-red-600"
                      >
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

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-700 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-white">Edit Movie</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
              >
                <svg
                  className="w-3 h-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                  />
                </svg>
              </button>
            </div>
            <form className="p-4" onSubmit={updateMovie}>
              <div className="grid gap-4 mb-4">
                <div>
                  <label
                    htmlFor="editTitle"
                    className="block text-sm font-medium text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="editTitle"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg text-gray-900"
                  />
                </div>
                <div>
                  <label
                    htmlFor="editDirector"
                    className="block text-sm font-medium text-white"
                  >
                    Director
                  </label>
                  <input
                    type="text"
                    id="editDirector"
                    value={editDirector}
                    onChange={(e) => setEditDirector(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg text-gray-900"
                  />
                </div>
                <div>
                  <label
                    htmlFor="editYear"
                    className="block text-sm font-medium text-white"
                  >
                    Year
                  </label>
                  <input
                    type="number"
                    id="editYear"
                    value={editYear}
                    onChange={(e) => setEditYear(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg text-gray-900"
                  />
                </div>
                <div>
                  <label
                    htmlFor="editDescription"
                    className="block text-sm font-medium text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="editDescription"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg text-gray-900"
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlFor="editGenre"
                    className="block text-sm font-medium text-white"
                  >
                    Genre
                  </label>
                  <input
                    type="text"
                    id="editGenre"
                    value={editGenre}
                    onChange={(e) => setEditGenre(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg text-gray-900"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </form>
          </div>
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
