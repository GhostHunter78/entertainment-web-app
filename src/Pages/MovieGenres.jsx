import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function MovieGenres({ currentPage }) {
  const [movieGenres, setMovieGenres] = useState([]);
  const navigate = useNavigate();

  const handleGenreClick = (genreId) => {
    navigate(`/movies/genre/${genreId}/${currentPage}`);
  };

  const { pathname } = useLocation(); // Gets the current route

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, [pathname]); // Runs whenever the route changes

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTk0NjQwNTBmM2ZlMGExNDM4MTllMmQzZmEzZjI5YiIsInN1YiI6IjY1ZjlhNGM1MDdlMjgxMDE2M2MxNWVhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mBDpl5xXooR_Ko0TQpZUSpRRujp4pLxUAnKPjWKOBYw",
      },
    };

    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
      .then((response) => response.json())
      .then((response) => {
        setMovieGenres(response.genres);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex flex-col items-center w-full lg:pr-[90px] lg:pl-[100px] lg:pt-[35px]">
      <div className="grid grid-cols-1 sm:grid-cols-3 w-full md:px-6 md:pt-6 lg:grid-cols-6 lg:ml-[90px]">
        {movieGenres &&
          movieGenres.map((genre, index, array) => {
            if (index + 1 === array.length) {
              return (
                <a
                  key={genre.id}
                  onClick={() => handleGenreClick(genre.id)}
                  className="col-span-full m-2 flex h-44  grow items-center justify-center rounded-lg p-8 text-center text-xl text-white font-medium even:bg-blue odd:bg-genreBlue cursor-pointer"
                >
                  {genre.name}
                </a>
              );
            } else {
              return (
                <a
                  key={genre.id}
                  onClick={() => handleGenreClick(genre.id)}
                  className="m-2 flex h-44  grow items-center justify-center rounded-lg p-8 text-center text-xl text-white font-medium even:bg-blue odd:bg-genreBlue cursor-pointer"
                >
                  {genre.name}
                </a>
              );
            }
          })}
      </div>
    </div>
  );
}

export default MovieGenres;
