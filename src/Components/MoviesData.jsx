import React from "react";
import { useEffect } from "react";
// import { json } from "react-router-dom";

function MoviesData() {
  const getMovies = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=399464050f3fe0a143819e2d3fa3f29b"
    )
      .then((res) => res.json())
      .then((json) => console.log(json.results));
  };

  useEffect(() => {
    getMovies();
  }, []);

  return <></>;
}

export default MoviesData;
