import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import MoviePoster from "../images/MoviePoster.jpg";

const SingleMoviePage = () => {
  const { user } = useContext(UserContext);

  const { movieId } = useParams();

  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState(null);
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`https://movieapp-api-lms1.onrender.com/movies/getMovie/${movieId}`)
      .then((response) => {
        setTitle(response.data.title);
        setDirector(response.data.director);
        setYear(response.data.year);
        setDescription(response.data.description);
        setGenre(response.data.genre);
        setComments(response.data.comments);
      })
      .catch((error) => console.error(error));
  }, [user]);

  return (
    <>
      <div className="grid grid-cols-3 mx-36 my-20">
        <div className="col-span-1">
          <img src={MoviePoster} className="w-80" />
          <h1 className="text-4xl text-gray-100 my-5">{title}</h1>
        </div>

        <div className="flex flex-col gap-4 col-span-2 my-20">
          <p className="text-gray-100 text-xl">{description}</p>
          <p className="text-gray-100 text-lg">
            <span className="font-bold">Director:</span> {director}
          </p>
          <p className="text-gray-100 text-lg">
            <span className="font-bold">Year:</span> {year}
          </p>
          <p className="text-gray-100 text-lg">
            <span className="font-bold">Genre:</span> {genre}
          </p>

          <p className="text-gray-100 text-2xl">Comments</p>
          <hr></hr>
          {{ comments } > 0 ? (
            <p>{comments}</p>
          ) : (
            <p className="text-gray-100">No Comments Available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleMoviePage;
