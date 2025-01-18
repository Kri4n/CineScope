import React, { useState } from "react";
import axios from "axios";
import { Notyf } from "notyf";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const notyf = new Notyf();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset validation states
    setIsPasswordValid(true);
    setPasswordMismatch(false);

    // Validation
    let isValid = true;

    if (password.length < 8) {
      setIsPasswordValid(false);
      isValid = false;
    }

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      isValid = false;
    }

    if (isValid) {
      try {
        const response = await axios.post(
          "https://movieapp-api-lms1.onrender.com/users/register",
          { email, password },
          { headers: { "Content-Type": "application/json" } }
        );
        notyf.success("Registered Successfully");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        console.log(response.data); // For debugging purposes
      } catch (error) {
        notyf.error("An error occurred while registering.");
      }
    }
  };

  return (
    <div className="mt-40 h-screen mx-5">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2   dark:text-white dark:border-gray-600 dark:focus:border-yellow-400 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email address"
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="floating_password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  dark:text-white dark:border-gray-600 dark:focus:border-400 focus:outline-none focus:ring-0 focus:border-yellow-400 peer"
            placeholder=" "
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {!isPasswordValid && (
            <p className="py-2 text-red-500">
              Password must be at least 8 characters
            </p>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="repeat_password"
            id="floating_repeat_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-400 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            aria-label="Confirm password"
          />
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-yellow-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm password
          </label>
          {passwordMismatch && (
            <p className="py-2 text-red-500">Passwords do not match</p>
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
