import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const Navbar = () => {
  const { user, unsetUser } = useContext(UserContext);

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/movies">
          <h1 className="text-gray-200 self-center text-2xl font-semibold whitespace-nowrap">
            CineScope
          </h1>
        </Link>

        <button
          data-collapse-toggle="navbar-multi-level"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-multi-level"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className="hidden w-full md:block md:w-auto"
          id="navbar-multi-level"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li className="text-gray-200 hover:text-yellow-400">
              <Link to="/movies">Movies</Link>
            </li>
            {user.id ? (
              <>
                <li
                  className="text-gray-200 hover:text-yellow-400 cursor-pointer"
                  onClick={() => {
                    unsetUser();
                  }}
                >
                  Logout
                </li>
              </>
            ) : (
              <>
                <li className="text-gray-200 hover:text-yellow-400">
                  <Link to="/login">Login</Link>
                </li>
                <li className="text-gray-200 hover:text-yellow-400">
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
