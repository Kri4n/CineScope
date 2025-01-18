// Dependencies
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Context
import { UserProvider } from "./context/UserContext";

// Pages
import Homepage from "./pages/Homepage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MoviesPage from "./pages/MoviesPage";
import SingleMoviePage from "./pages/SingleMoviePage";
import Logout from "./pages/Logout";

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });

  const unsetUser = () => {
    localStorage.clear();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser({ id: null, isAdmin: false });
      return;
    }

    axios
      .get("https://movieapp-api-lms1.onrender.com/users/details", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data && response.data.user) {
          setUser({
            id: response.data.user._id,
            isAdmin: response.data.user.isAdmin,
          });
        } else {
          setUser({ id: null, isAdmin: null });
        }
      });
  }, []);

  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<SingleMoviePage />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
          <Footer />
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
