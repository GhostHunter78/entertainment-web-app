import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";

function MoviePage({ setMovieName, setFilmId }) {
  const { filmId, movieName } = useParams();

  const [detailsData, setDetailsData] = useState({});
  const [castData, setCastData] = useState({});
  const [similarMoviesData, setSimilarMoviesData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCastWindow = () => {
    setIsOpen(!isOpen);
  };

  isOpen
    ? (document.body.style.overflowY = "hidden")
    : (document.body.style.overflowY = "visible");

  useEffect(() => {
    if (filmId && movieName) {
      setMovieName(movieName);
      setFilmId(filmId);
    }
  }, [filmId, movieName, setFilmId, setMovieName]);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const getMovieCast = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTk0NjQwNTBmM2ZlMGExNDM4MTllMmQzZmEzZjI5YiIsIm5iZiI6MTcyNTU0OTE0NS4xNTE2NzUsInN1YiI6IjY1ZjlhNGM1MDdlMjgxMDE2M2MxNWVhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TMXhDTvJVHUMYlFXlHUtaCsd0Lr0cbP4szEmclBUXfg",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${filmId}/credits?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => setCastData(response))
      .catch((err) => console.error(err));
  };

  const getMovieDetails = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTk0NjQwNTBmM2ZlMGExNDM4MTllMmQzZmEzZjI5YiIsIm5iZiI6MTcyNTU0OTE0NS4xNTE2NzUsInN1YiI6IjY1ZjlhNGM1MDdlMjgxMDE2M2MxNWVhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TMXhDTvJVHUMYlFXlHUtaCsd0Lr0cbP4szEmclBUXfg",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${filmId}?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => setDetailsData(response))
      .catch((err) => console.error(err));
  };

  const getSimilarMovies = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTk0NjQwNTBmM2ZlMGExNDM4MTllMmQzZmEzZjI5YiIsIm5iZiI6MTcyNTU0OTE0NS4xNTE2NzUsInN1YiI6IjY1ZjlhNGM1MDdlMjgxMDE2M2MxNWVhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TMXhDTvJVHUMYlFXlHUtaCsd0Lr0cbP4szEmclBUXfg",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${filmId}/similar?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setSimilarMoviesData(response))
      .catch((err) => console.error(err));
  };

  console.log(castData);

  useEffect(() => {
    getMovieDetails();
    getMovieCast();
    getSimilarMovies();
  }, [filmId]);

  const voteAverage = detailsData.vote_average || 0;
  const ratingPercentage = Math.floor((voteAverage / 10) * 100);

  const runtime = detailsData.runtime;

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  const formattedRuntime = `${hours}h ${minutes}m`;

  return (
    <div>
      <div
        className="mt-6 w-screen px-4 md:px-8 lg:pr-[90px] lg:pl-[160px]"
        style={
          isOpen
            ? { filter: "blur(5px)", transition: "filter 0.3s ease-in-out" }
            : { filter: "blur(0px)", transition: "filter 0.3s ease-in-out" }
        }
      >
        <Link to={"/home"}>
          <div className="w-fit pl-[10px] flex items-center gap-2">
            <FaArrowLeft className="fill-white" />
            <p className="text-white ">Go Back</p>
          </div>
        </Link>
        <div className="w-full flex flex-col items-center justify-center mt-[30px] md:flex-row md:items-start md:gap-[40px] lg:gap-[100px]">
          <img
            className="w-[85%] max-w-[400px] rounded-[25px] md:w-fit md:max-w-[300px] lg:max-w-[400px]"
            src={`https://image.tmdb.org/t/p/w500${
              detailsData.poster_path && detailsData.poster_path
            }`}
            alt={detailsData.title || "Movie Poster"}
          />
          <div className="md:flex md:flex-col md:items-start">
            <h1 className="text-white text-[28px] mt-5 font-bold md:mt-0">
              {detailsData.title && detailsData.title}
            </h1>
            <h1 className="text-white text-[28px] font-bold">
              (
              {detailsData.release_date &&
                detailsData.release_date.substring(0, 4)}
              )
            </h1>
            <h1 className="text-gray-300 text-[18px] mt-4">
              {detailsData.tagline && detailsData.tagline}
            </h1>
            <div className="flex items-center justify-center gap-5 mt-[40px]">
              <div className="flex flex-col items-center gap-y-1">
                <h2 className="text-white text-[24px]">User Score</h2>
                <h2 className="text-gray-300 text-[16px]">
                  ({detailsData.vote_count && detailsData.vote_count} voted)
                </h2>
              </div>
              <div className="circular-progress-wrapper">
                <svg className="circular-progress" viewBox="0 0 36 36">
                  <path
                    className="circle-bg"
                    d="M18 2.0845
         a 15.9155 15.9155 0 0 1 0 31.831
         a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="circle"
                    strokeDasharray={`${ratingPercentage}, 100`}
                    d="M18 2.0845
         a 15.9155 15.9155 0 0 1 0 31.831
         a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="20.35" className="percentage-text">
                    {ratingPercentage}%
                  </text>
                </svg>
              </div>
            </div>
            <div className="w-full flex items-start justify-between mt-9">
              <div className="flex flex-col items-center gap-y-1">
                <h2 className="text-gray-400 font-semibold text-[18px]">
                  Length
                </h2>
                <p className="text-white text-[16px] font-normal">
                  {formattedRuntime}
                </p>
              </div>
              <div className="flex flex-col items-center gap-y-1">
                <h2 className="text-gray-400 font-semibold text-[18px]">
                  Language
                </h2>
                <p className="text-white text-[16px] font-normal uppercase">
                  {detailsData.original_language &&
                    detailsData.original_language}
                </p>
              </div>
              <div className="flex flex-col items-center gap-y-1">
                <h2 className="text-gray-400 font-semibold text-[18px]">
                  Country
                </h2>
                <p className="text-white text-[16px] font-normal">
                  {detailsData.origin_country && detailsData.origin_country[0]}
                </p>
              </div>
              <div className="flex flex-col items-center gap-y-1">
                <h2 className="text-gray-400 font-semibold text-[18px]">
                  Status
                </h2>
                <p className="text-white text-[16px] font-normal">Released</p>
              </div>
            </div>
            <div className="w-full mt-9 flex flex-col justify-start items-start">
              <p className=" text-white font-bold text-[18px]">Genres</p>
              <div className="w-full flex items-center gap-2 mt-2">
                {detailsData.genres &&
                  detailsData.genres.map((genre) => (
                    <div
                      key={genre.id}
                      className="w-fit px-2 py-1 bg-white rounded-lg"
                    >
                      {genre.name}
                    </div>
                  ))}
              </div>
              <p className="text-white font-bold mt-9 text-[18px]">Synopsis</p>
              <p className="w-full mt-2 text-[16px] text-white">
                {detailsData.overview && detailsData.overview}
              </p>
            </div>
          </div>
        </div>
        <section className="mt-9">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-white font-semibold text-[18px]">Cast</h2>
            {castData.cast && castData.cast.length > 12 ? (
              <p onClick={toggleCastWindow} className="text-white font-normal">
                See More
              </p>
            ) : null}
          </div>
          <div className="flex mt-4 overflow-x-auto gap-x-4">
            {castData.cast &&
              castData.cast.slice(0, 8).map((castMember) => (
                <div
                  key={castMember.id && castMember.id}
                  className="flex-shrink-0 w-[120px] mb-4"
                >
                  <div className="h-[180px] w-[120px] overflow-hidden rounded-lg">
                    <img
                      src={
                        castMember.profile_path !== null
                          ? `https://image.tmdb.org/t/p/w500${castMember.profile_path}`
                          : "/assets/images/mobile/unknown-cast-pfp.webp"
                      }
                      alt={castMember.name && castMember.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-white text-sm mt-2">
                    {castMember.name && castMember.name}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {castMember.character && castMember.character}
                  </p>
                </div>
              ))}
          </div>
        </section>

        <section className="mt-6">
          {similarMoviesData.results && similarMoviesData.results.length > 0 ? (
            <>
              <h2 className="text-white font-semibold text-[18px]">
                You may also like
              </h2>
              <div className="relative flex gap-x-4 overflow-x-scroll mt-4 md:gap-x-[2.5rem] gap-y-[2rem]">
                {similarMoviesData.results &&
                  similarMoviesData.results.slice(0, 8).map((movie, index) => (
                    <Link
                      key={index}
                      to={`/${movie.id}/movie/${movie.title
                        .split(" ")
                        .join("-")}`}
                    >
                      <div className="relative w-full rounded-lg" key={index}>
                        <div className="relative w-[240px] h-[140px] rounded-lg md:w-[470px] md:h-[230px] mb-4">
                          <img
                            src={
                              movie.backdrop_path
                                ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                                : "path/to/placeholder/image.jpg"
                            }
                            alt={movie.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <div className="overlay absolute inset-0 bg-black rounded-lg bg-opacity-30"></div>
                          <div className="absolute left-4 bottom-4 z-40 h-fit w-fit truncate text-ellipsis">
                            <div className="mb-1 flex text-[11px] font-light items-center lg:text-[14px]">
                              <p className="text-white">
                                {movie.release_date &&
                                  movie.release_date.substring(0, 4)}
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
                              <p className="ml-2 capitalize text-white">
                                {movie.media_type || "movie"}
                              </p>
                            </div>
                            <p className="text-ellipsis w-[200px] truncate text-sm font-bold capitalize text-white lg:text-[20px]">
                              {movie.title || movie.original_title}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </>
          ) : null}
        </section>
      </div>

      {isOpen ? (
        <div className="w-screen fixed bottom-[150px] left-0 z-100 px-4 overflow-y-scroll">
          <div className="w-full bg-white rounded-lg md:w-[350px] ml-auto mr-auto">
            <div className="w-full pt-2 px-4 flex items-end justify-end">
              <FaWindowClose
                onClick={() => setIsOpen(!isOpen)}
                className="fill-red w-[30px] h-[30px]"
              />
            </div>
            {castData.cast &&
              castData.cast.slice(9, 14).map((pfp) => (
                <div
                  key={pfp.id}
                  className="w-full px-4 border-b-gray-200 border-b py-3 rounded-lg flex items-center gap-3"
                >
                  <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
                    <img
                      src={
                        pfp.profile_path !== null
                          ? `https://image.tmdb.org/t/p/w500${pfp.profile_path}`
                          : "/assets/images/mobile/unknown-cast-pfp.webp"
                      }
                      alt={pfp.name && pfp.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="text-gray-400 font-bold text-sm">
                      {pfp.name && pfp.name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {pfp.character && pfp.character}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default MoviePage;
