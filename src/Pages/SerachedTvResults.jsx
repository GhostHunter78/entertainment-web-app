import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ImArrowLeft2 } from "react-icons/im";
import { ImArrowRight2 } from "react-icons/im";
import SearchMoviesField from "../Components/SearchMoviesField";
import SearchTvField from "../Components/SearchTvField";
import { FaArrowLeft } from "react-icons/fa6";

function SearchedTvResults({ currentPage, setCurrentPage }) {
  const { currentPage: pageParam } = useParams();
  const navigate = useNavigate();

  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  useEffect(() => {
    setCurrentPage(Number(pageParam) || 1);
  }, [pageParam, setCurrentPage]);

  const handleNextButtonClick = () => {
    const nextPage =
      parseInt(currentPage, 10) < 500 ? parseInt(currentPage, 10) + 1 : 500;
    setCurrentPage(nextPage);
    navigate(`/search-tv-results?query=${query}&page=${nextPage}`);
  };

  const handlePrevButtonClick = () => {
    const prevPage =
      parseInt(currentPage, 10) > 1 ? parseInt(currentPage, 10) - 1 : 1;
    setCurrentPage(prevPage);
    navigate(`/search-tv-results?query=${query}&page=${prevPage}`);
  };

  useEffect(() => {
    setCurrentPage(Number(pageParam) || 1);
  }, [pageParam, setCurrentPage]);

  const [results, setResults] = useState([]);
  const [data, setData] = useState({});
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTk0NjQwNTBmM2ZlMGExNDM4MTllMmQzZmEzZjI5YiIsIm5iZiI6MTcyNTU0OTE0NS4xNTE2NzUsInN1YiI6IjY1ZjlhNGM1MDdlMjgxMDE2M2MxNWVhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TMXhDTvJVHUMYlFXlHUtaCsd0Lr0cbP4szEmclBUXfg",
        },
      };

      fetch(
        `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=${currentPage}`,
        options
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Response:", data);
          console.log("Results:", data.results);
          setResults(data.results);
          setData(data);
        })
        .catch((err) => console.error(err));
    }
  }, [query, currentPage]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-screen text-white lg:pr-[90px] lg:pl-[160px]">
      <SearchTvField />
      <div
        className="w-fit pl-[15px] flex items-center gap-2 lg:cursor-pointer mt-5 mb-4"
        onClick={handleGoBack}
      >
        <FaArrowLeft className="fill-red" />
        <p className="text-red ">Go Back</p>
      </div>
      <div className="px-4 md:px-8">
        <h1 className="mt-[10px] md:text-[18px] lg:text-[22px]">
          Found {data.total_results} Results for "{query}"
        </h1>
        <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 lg:grid-cols-4 lg:gap-8">
          {results.length > 0 ? (
            results.map((movie) => (
              <Link
                key={movie.id}
                to={`/${movie.id}/tv
                }/${movie.tv}`}
              >
                <div key={movie.id} className="relative">
                  <div className="h-[133px] overflow-hidden rounded-lg lg:h-[180px]">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${
                        movie.backdrop_path
                          ? movie.backdrop_path
                          : movie.poster_path
                      }`}
                      alt={`Unable loading poster 😕`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-2 w-full">
                    <div className="mb-1 flex text-[11px] font-light items-center lg:text-[14px]">
                      <p>
                        {movie.first_air_date &&
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
                      <p className="ml-2 capitalize">TV</p>
                    </div>
                    <p className="text-ellips w-[160px] truncate text-sm font-bold capitalize text-white lg:text-[20px]">
                      {movie.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No results found.</p>
          )}
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
            Page {currentPage} of {data.total_pages}
          </div>
          <button
            className="flex items-center gap-2 font-medium pl-4 pr-6 py-2"
            onClick={handleNextButtonClick}
            disabled={currentPage === 500}
          >
            <ImArrowRight2 /> Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchedTvResults;
