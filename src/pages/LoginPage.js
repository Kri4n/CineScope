import React from "react";
import { Link } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import { Notyf } from "notyf";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const notyf = new Notyf();

  const loginUser = (e) => {
    e.preventDefault();

    axios
      .post("https://movieapp-api-lms1.onrender.com/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data && response.data.access) {
          // Check for access token
          localStorage.setItem("token", response.data.access);
          retrieveUserId(response.data.access);
        } else {
          notyf.error("Invalid credentials");
        }
      })
      .catch((error) => {
        console.error(error);
        notyf.error("User does not exist");
      });
  };

  const retrieveUserId = (token) => {
    axios
      .get("https://movieapp-api-lms1.onrender.com/users/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser({
          id: response.data.user._id,
          isAdmin: response.data.user.isAdmin,
        });
        setIsLoggedIn(true);
        console.log("Welcome User");
        if (response.data.user.isAdmin) {
          notyf.success("Welcome Admin");
        } else {
          notyf.success("Welcome User");
        }
      })
      .catch((error) => {
        console.error("Error retrieving user details:", error);
        notyf.error("Failed to get user details");
      });
  };

  if (isLoggedIn || user.id !== null) {
    return <Navigate to="/movies" />;
  }

  return (
    <div className="h-screen mt-40 mx-5">
      <form class="max-w-sm mx-auto" onSubmit={loginUser}>
        <div class="mb-5">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-100"
          ></label>
          <input
            type="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="mb-5">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-100"
          ></label>
          <input
            type="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          class="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
