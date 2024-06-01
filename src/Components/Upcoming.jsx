import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Upcoming({ currentPathName, currentPage, movieOrTv }) {
  const [upcomingData, setUpcomingData] = useState(null);

  const getUpcoming = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTk0NjQwNTBmM2ZlMGExNDM4MTllMmQzZmEzZjI5YiIsInN1YiI6IjY1ZjlhNGM1MDdlMjgxMDE2M2MxNWVhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mBDpl5xXooR_Ko0TQpZUSpRRujp4pLxUAnKPjWKOBYw",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => setUpcomingData(response.results))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getUpcoming();
  }, []);
  return (
    <div className="mt-10 w-screen px-4">
      <div className="flex flex-row items-center w-full justify-between">
        <div className="flex items-center gap-[8px]">
          <p className="outfit text-white text-[20px]">Upcoming</p>
          <p className="rounded-md border-2 py-1 px-2 text-[8px] text-white font-medium">
            MOVIE
          </p>
        </div>
        <Link to={`/${currentPathName}/${movieOrTv}/${currentPage}`}>
          <p className="text-xs font-semibold outfit text-seeMore hover:underline">
            SEE MORE
          </p>
        </Link>
      </div>
      {upcomingData && (
        <>
          <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            {upcomingData.slice(0, 6).map((movie, index) => (
              <div key={index} className="relative">
                <div className="h-[133px] overflow-hidden rounded-lg">
                  <img
                    src={`${
                      movie.backdrop_path &&
                      `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                    } || "none"`}
                    alt={`Movie Poster: ${movie.title || "Unknown"}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-2 w-full">
                  <div className="mb-1 flex text-[11px] font-light items-center">
                    <p>
                      {movie.release_date && movie.release_date.substring(0, 4)}
                    </p>
                    <div className="bg-white rounded-full w-[2px] h-[2px] ml-2"></div>
                    <svg
                      className="ml-1"
                      width="12"
                      height="12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.173 0H1.827A1.827 1.827 0 0 0 0 1.827v8.346C0 11.183.818 12 1.827 12h8.346A1.827 1.827 0 0 0 12 10.173V1.827A1.827 1.827 0 0 0 10.173 0ZM2.4 5.4H1.2V4.2h1.2v1.2ZM1.2 6.6h1.2v1.2H1.2V6.6Zm9.6-1.2H9.6V4.2h1.2v1.2ZM9.6 6.6h1.2v1.2H9.6V6.6Zm1.2-4.956V2.4H9.6V1.2h.756a.444.444 0 0 1 .444.444ZM1.644 1.2H2.4v1.2H1.2v-.756a.444.444 0 0 1 .444-.444ZM1.2 10.356V9.6h1.2v1.2h-.756a.444.444 0 0 1-.444-.444Zm9.6 0a.444.444 0 0 1-.444.444H9.6V9.6h1.2v.756Z"
                        fill="#FFF"
                        opacity=".75"
                      />
                    </svg>
                    <p className="ml-2 capitalize">Movie</p>
                  </div>
                  <p className="text-ellips w-[160px] truncate text-sm font-bold capitalize text-white">
                    {movie.title}
                  </p>
                </div>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  );
}

export default Upcoming;
