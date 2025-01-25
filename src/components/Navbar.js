import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const Navbar = () => {
  const { user } = useContext(UserContext);

  return (
    <nav className="bg-gray-800 border-b border-gray-700 navbar">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/">
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
            {user.id !== null ? (
              user.isAdmin ? (
                <>
                  <li className="text-gray-200 hover:text-yellow-400 relative group">
                    <Link to="/movies">Dashboard</Link>
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                  </li>
                  <li className="text-gray-200 hover:text-yellow-400 relative group">
                    <Link to="/logout">Logout</Link>
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                  </li>
                </>
              ) : (
                <>
                  <li className="text-gray-200 hover:text-yellow-400 relative group">
                    <Link to="/movies">Movies</Link>
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                  </li>
                  <li className="text-gray-200 hover:text-yellow-400 relative group">
                    <Link to="/logout">Logout</Link>
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                  </li>
                </>
              )
            ) : (
              <>
                <li className="text-gray-200 hover:text-yellow-400 relative group">
                  <Link to="/movies">Movies</Link>
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                </li>
                <li className="text-gray-200 hover:text-yellow-400 relative group">
                  <Link to="/login">Login</Link>
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                </li>
                <li className="text-gray-200 hover:text-yellow-400 relative group">
                  <Link to="/register">Register</Link>
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
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
