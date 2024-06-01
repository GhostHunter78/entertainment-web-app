import { useEffect, useState } from "react";
import { SearchField } from "../Components";
import { ImArrowLeft2 } from "react-icons/im";
import { ImArrowRight2 } from "react-icons/im";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function SeeMoreMoviesPage({
  currentPage,
  setCurrentPage,
  setCurrentPathName,
  movieOrTv,
  setMovieOrTv,
}) {
  const [popularData, setPopularData] = useState(null);
  const [trendingData, setTrendingData] = useState(null);

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const firstPart = location.pathname.split("/");
  const apiAddress = firstPart[1];

  const pathnameParts = location.pathname.split("/");
  const mediaType = pathnameParts[2];
  const combinedPath = `${apiAddress}/${mediaType}`;

  localStorage.getItem("movieOrTv");
  localStorage.getItem("currentPathName");

  const movieCategory = () => {
    switch (apiAddress) {
      case "popular":
        return "popular";
      case "now_playing":
        return "now playing";
      case "upcoming":
        return "upcoming";
      case "top_rated":
        return "top rated";
      case "trending":
        return "trending";
      case "airing_today":
        return "airing today";
      case "on_the_air":
        return "on the air";
      default:
        return null;
    }
  };

  // Handle page change
  const handleNextButtonClick = () => {
    const nextPage =
      parseInt(currentPage, 10) < 500 ? parseInt(currentPage, 10) + 1 : 500;
    setCurrentPage(nextPage);
    navigate(`/${apiAddress}/${movieOrTv}/${nextPage}`);
  };

  const handlePrevButtonClick = () => {
    const prevPage =
      parseInt(currentPage, 10) > 1 ? parseInt(currentPage, 10) - 1 : 1;
    setCurrentPage(prevPage);
    navigate(`/${apiAddress}/${movieOrTv}/${prevPage}`);
  };

  const getSeeMoreMoviesPage = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${movieOrTv}/${apiAddress}?language=en-US&page=${currentPage}`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTk0NjQwNTBmM2ZlMGExNDM4MTllMmQzZmEzZjI5YiIsInN1YiI6IjY1ZjlhNGM1MDdlMjgxMDE2M2MxNWVhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mBDpl5xXooR_Ko0TQpZUSpRRujp4pLxUAnKPjWKOBYw",
          },
        }
      );
      setPopularData(response.data.results);
    } catch (err) {
      console.error(err);
    }
  };

  const getTrendingMoviesPage = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${combinedPath}/day?language=en-US`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTk0NjQwNTBmM2ZlMGExNDM4MTllMmQzZmEzZjI5YiIsInN1YiI6IjY1ZjlhNGM1MDdlMjgxMDE2M2MxNWVhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mBDpl5xXooR_Ko0TQpZUSpRRujp4pLxUAnKPjWKOBYw",
          },
        }
      );
      setTrendingData(response.data.results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setCurrentPage(params.currentPage);
    setCurrentPathName(params.apiAddress);
    setMovieOrTv(params.movieOrTv);
    getSeeMoreMoviesPage();
    if (apiAddress === "trending") {
      getTrendingMoviesPage();
    }
  }, [params.currentPage, params.apiAddress, params.movieOrTv]);

  useEffect(() => {
    getSeeMoreMoviesPage();
  }, [currentPage]);

  return (
    <div className="w-screen text-white">
      <SearchField />
      <div className="px-4">
        <p className="text-white text-[20px] mt-4 capitalize">
          {movieCategory()} {movieOrTv === "movie" ? "Movies" : "TV Series"}
        </p>
        {apiAddress === "trending"
          ? trendingData && (
              <>
                <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                  {trendingData.slice(0, 20).map((movie, index) => (
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
                            {movieOrTv === "movie"
                              ? movie.release_date &&
                                movie.release_date.substring(0, 4)
                              : movie.first_air_date &&
                                movie.first_air_date.substring(0, 4)}
                          </p>
                          <div className="bg-white rounded-full w-[2px] h-[2px] ml-2"></div>
                          <svg
                            className="ml-1"
                            width="12"
                            height="12"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.173 0H1.827A1.827 1.827 0 0 0 0 1.827v8.346C0 11.183.818 12 1.827 12h8.346A1.827 1.827 0 0 0 12 10.173V1.827A1.827 1.827 0 0 0 10.173 0ZM2.4 5.4H1.2V4.2h1.2v1.2ZM1.2 6.6h1.2v1.2H1.2V6.6Zm9.6-1.2H9.6V4.2h1.2v1.2ZM9.6 6.6h1.2v1.2H9.6V6.6Zzm1.2-4.956V2.4H9.6V1.2h.756a.444.444 0 0 1 .444.444ZM1.644 1.2H2.4v1.2H1.2v-.756a.444.444 0 0 1 .444-.444ZM1.2 10.356V9.6h1.2v1.2h-.756a.444.444 0 0 1-.444-.444Zm9.6 0a.444.444 0 0 1-.444.444H9.6V9.6h1.2v.756Z"
                              fill="#FFF"
                              opacity=".75"
                            />
                          </svg>
                          <p className="ml-2 capitalize">
                            {movieOrTv === "movie" ? "Movie" : "TV"}
                          </p>
                        </div>
                        <p className="text-ellips w-[160px] truncate text-sm font-bold capitalize text-white">
                          {movieOrTv === "movie" ? movie.title : movie.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </section>
              </>
            )
          : popularData && (
              <>
                <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                  {popularData.slice(0, 20).map((movie, index) => (
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
                            {movieOrTv === "movie"
                              ? movie.release_date &&
                                movie.release_date.substring(0, 4)
                              : movie.first_air_date &&
                                movie.first_air_date.substring(0, 4)}
                          </p>
                          <div className="bg-white rounded-full w-[2px] h-[2px] ml-2"></div>
                          <svg
                            className="ml-1"
                            width="12"
                            height="12"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.173 0H1.827A1.827 1.827 0 0 0 0 1.827v8.346C0 11.183.818 12 1.827 12h8.346A1.827 1.827 0 0 0 12 10.173V1.827A1.827 1.827 0 0 0 10.173 0ZM2.4 5.4H1.2V4.2h1.2v1.2ZM1.2 6.6h1.2v1.2H1.2V6.6Zm9.6-1.2H9.6V4.2h1.2v1.2ZM9.6 6.6h1.2v1.2H9.6V6.6Zzm1.2-4.956V2.4H9.6V1.2h.756a.444.444 0 0 1 .444.444ZM1.644 1.2H2.4v1.2H1.2v-.756a.444.444 0 0 1 .444-.444ZM1.2 10.356V9.6h1.2v1.2h-.756a.444.444 0 0 1-.444-.444Zm9.6 0a.444.444 0 0 1-.444.444H9.6V9.6h1.2v.756Z"
                              fill="#FFF"
                              opacity=".75"
                            />
                          </svg>
                          <p className="ml-2 capitalize">
                            {movieOrTv === "movie" ? "Movie" : "TV"}
                          </p>
                        </div>
                        <p className="text-ellips w-[160px] truncate text-sm font-bold capitalize text-white">
                          {movieOrTv === "movie"
                            ? movie.original_title
                            : movie.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </section>
                <div className="max-w-[390px] m-auto self-center mt-16 flex justify-around rounded-lg border-[2px] border-white">
                  <button
                    className="flex items-center gap-2 font-medium pl-4 pr-6 py-2"
                    onClick={handlePrevButtonClick}
                    disabled={currentPage === 1}
                  >
                    <ImArrowLeft2 /> Prev
                  </button>
                  <div className="flex items-center gap-2 font-medium pl-4 pr-4 bg-white text-black">
                    Page {currentPage} of 500
                  </div>
                  <button
                    className="flex items-center gap-2 font-medium pl-4 pr-6 py-2"
                    onClick={handleNextButtonClick}
                    disabled={currentPage === 500}
                  >
                    <ImArrowRight2 /> Next
                  </button>
                </div>
              </>
            )}
      </div>
    </div>
  );
}

export default SeeMoreMoviesPage;
