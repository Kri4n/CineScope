import React from "react";
import Logo from "../images/movie.png";

const Homepage = () => {
  return (
    <>
      <div className="flex justify-center items-center h-96 mb-60 pt-40 gap-2 text-center flex-col">
        <img src={Logo} className="size-40" />
        <h1 className="text-4xl text-gray-100">Welcome to CineScope</h1>

        <p className="text-lg text-gray-100">Discover and Read Movie Reviews</p>
      </div>
    </>
  );
};

export default Homepage;
