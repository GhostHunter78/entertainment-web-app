import { useEffect, useState } from "react";
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import { SearchField } from "../Components";

function MoviesByGenre({ currentPage, setCurrentPage }) {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  let genreName = "";

  switch (genreId) {
    case "28":
      genreName = "Action";
      break;
    case "12":
      genreName = "Adventure";
      break;
    case "16":
      genreName = "Animation";
      break;
    case "35":
      genreName = "Comedy";
      break;
    case "80":
      genreName = "Crime";
      break;
    case "99":
      genreName = "Documentary";
      break;
    case "18":
      genreName = "Drama";
      break;
    case "10751":
      genreName = "Family";
      break;
    case "14":
      genreName = "Fantasy";
      break;
    case "36":
      genreName = "History";
      break;
    case "16":
      genreName = "Animation";
      break;
    case "27":
      genreName = "Horror";
      break;
    case "10402":
      genreName = "Music";
      break;
    case "9648":
      genreName = "Mystery";
      break;
    case "10749":
      genreName = "Romance";
      break;
    case "878":
      genreName = "Science Fiction";
      break;
    case "10770":
      genreName = "TV Movie";
      break;
    case "53":
      genreName = "Thriller";
      break;
    case "10752":
      genreName = "War";
      break;
    case "37":
      genreName = "Western";
      break;
    default:
      genreName = "";
  }

  const handleNextButtonClick = () => {
    const nextPage =
      parseInt(currentPage, 10) < 500 ? parseInt(currentPage, 10) + 1 : 500;
    setCurrentPage(nextPage);
    navigate(`/movies/genre/${genreId}/${nextPage}`);
  };

  const handlePrevButtonClick = () => {
    const prevPage =
      parseInt(currentPage, 10) > 1 ? parseInt(currentPage, 10) - 1 : 1;
    setCurrentPage(prevPage);
    navigate(`/movies/genre/${genreId}/${prevPage}`);
  };

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTk0NjQwNTBmM2ZlMGExNDM4MTllMmQzZmEzZjI5YiIsInN1YiI6IjY1ZjlhNGM1MDdlMjgxMDE2M2MxNWVhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mBDpl5xXooR_Ko0TQpZUSpRRujp4pLxUAnKPjWKOBYw",
        },
      };

      try {
        setLoading(true);

        const [
          popularMoviesResponse,
          nowPlayingMoviesResponse,
          topRatedMoviesResponse,
          upcomingMoviesResponse,
        ] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${currentPage}`,
            options
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${currentPage}`,
            options
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${currentPage}`,
            options
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${currentPage}`,
            options
          ),
        ]);

        if (
          !popularMoviesResponse.ok ||
          !nowPlayingMoviesResponse.ok ||
          !topRatedMoviesResponse.ok ||
          !upcomingMoviesResponse.ok
        ) {
          throw new Error("Failed to fetch data");
        }

        const popularMoviesData = await popularMoviesResponse.json();
        const nowPlayingMoviesData = await nowPlayingMoviesResponse.json();
        const topRatedMoviesData = await topRatedMoviesResponse.json();
        const upcomingMoviesData = await upcomingMoviesResponse.json();

        const combinedMovies = [
          ...popularMoviesData?.results,
          ...nowPlayingMoviesData?.results,
          ...topRatedMoviesData?.results,
          ...upcomingMoviesData?.results,
        ];

        const uniqueMovies = Array.from(
          new Map(combinedMovies.map((movie) => [movie.id, movie])).values()
        );

        const filteredMovies = uniqueMovies.filter((movie) =>
          movie.genre_ids.includes(parseInt(genreId, 10))
        );

        setMovies(filteredMovies);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesByGenre();
  }, [genreId, currentPage]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-screen text-white lg:pr-[90px] lg:pl-[160px]">
      <SearchField />
      <div className="w-full text-white px-4 mt-[1.5rem] md:px-8">
        <h1 className="text-left text-3xl lg:text-[32px]">{genreName}</h1>
        <div className="flex flex-col grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {movies.length > 0 && (
            <>
              <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 lg:grid-cols-4 lg:gap-8">
                {movies.slice(0, 20).map((movie, index) => (
                  <div key={index} className="relative">
                    <div className="h-[133px] overflow-hidden rounded-lg lg:h-[180px]">
                      <img
                        src={`${
                          movie.backdrop_path
                            ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                            : "none"
                        }`}
                        alt={`Movie Poster: ${movie.title || "Unknown"}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-2 w-full">
                      <div className="mb-1 flex text-[11px] font-light items-center lg:text-[14px]">
                        <p>
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
                            d="M10.173 0H1.827A1.827 1.827 0 0 0 0 1.827v8.346C0 11.183.818 12 1.827 12h8.346A1.827 1.827 0 0 0 12 10.173V1.827A1.827 1.827 0 0 0 10.173 0ZM2.4 5.4H1.2V4.2h1.2v1.2ZM1.2 6.6h1.2v1.2H1.2V6.6Zm9.6-1.2H9.6V4.2h1.2v1.2ZM9.6 6.6h1.2v1.2H9.6V6.6Zzm1.2-4.956V2.4H9.6V1.2h.756a.444.444 0 0 1 .444.444ZM1.644 1.2H2.4v1.2H1.2v-.756a.444.444 0 0 1 .444-.444ZM1.2 10.356V9.6h1.2v1.2h-.756a.444.444 0 0 1-.444-.444Zm9.6 0a.444.444 0 0 1-.444.444H9.6V9.6h1.2v.756Z"
                            fill="#FFF"
                            opacity=".75"
                          />
                        </svg>
                        <p className="ml-2 capitalize">Movie</p>
                      </div>
                      <p className="text-ellips w-[160px] truncate text-sm font-bold capitalize text-white lg:text-[20px]">
                        {movie.original_title}
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
    </div>
  );
}

export default MoviesByGenre;
