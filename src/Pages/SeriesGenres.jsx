import { useEffect, useState } from "react";

function SeriesGenres() {
  const [seriesGenres, setSeriesGenres] = useState([]);

  useEffect(() => {
    //   const options = {
    //     method: "GET",
    //     headers: {
    //       accept: "application/json",
    //       Authorization:
    //         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTk0NjQwNTBmM2ZlMGExNDM4MTllMmQzZmEzZjI5YiIsInN1YiI6IjY1ZjlhNGM1MDdlMjgxMDE2M2MxNWVhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mBDpl5xXooR_Ko0TQpZUSpRRujp4pLxUAnKPjWKOBYw",
    //     },
    //   };

    fetch("https://api.themoviedb.org/3/genre/tv/list?language=en", options)
      .then((response) => response.json())
      .then((response) => {
        setSeriesGenres(response.genres);
        // console.log(response);
      })
      .catch((err) => console.error(err));
  }, []);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTk0NjQwNTBmM2ZlMGExNDM4MTllMmQzZmEzZjI5YiIsInN1YiI6IjY1ZjlhNGM1MDdlMjgxMDE2M2MxNWVhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mBDpl5xXooR_Ko0TQpZUSpRRujp4pLxUAnKPjWKOBYw",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc",
    options
  )
    .then((response) => response.json())
    // .then((response) => console.log(response))
    .catch((err) => console.error(err));

  return (
    <div className="flex flex-col items-center w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 w-full">
        {seriesGenres &&
          seriesGenres.map((genre, index, array) => {
            if (index + 1 === array.length) {
              return (
                <a
                  key={genre.id}
                  className="col-span-full m-2 flex h-44  grow items-center justify-center rounded-lg p-8 text-center text-xl text-white font-medium even:bg-blue odd:bg-genreGreen"
                >
                  {genre.name}
                </a>
              );
            } else {
              return (
                <a
                  key={genre.id}
                  className="m-2 flex h-44  grow items-center justify-center rounded-lg p-8 text-center text-xl text-white font-medium even:bg-blue odd:bg-genreGreen"
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

export default SeriesGenres;
