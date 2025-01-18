import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import AdminDashboard from "../components/AdminDashboard";
import UserView from "../components/UserView";

const MoviesPage = () => {
  const { user } = useContext(UserContext);

  return user.isAdmin ? <AdminDashboard /> : <UserView />;
};

export default MoviesPage;
