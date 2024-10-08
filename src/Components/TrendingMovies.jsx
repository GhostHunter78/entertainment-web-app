import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TrendingMovies({ currentPathName, currentPage, movieOrTv }) {
  const [trendingData, setTrendingData] = useState(null);

  const getTrendingMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/movie/day?api_key=399464050f3fe0a143819e2d3fa3f29b"
      );
      if (!response.ok) {
        throw new Error(`Error fetching trending movies: ${response.status}`);
      }
      const data = await response.json();
      setTrendingData(data.results);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  useEffect(() => {
    getTrendingMovies();
  }, []);

  localStorage.getItem("movieOrTv");

  return (
    <div className="mt-6 w-screen px-4 md:px-8 lg:pr-[90px] lg:pl-[160px]">
      <div className="flex flex-row items-center w-full justify-between">
        <div className="flex items-center gap-[8px]">
          <p className="outfit text-white text-[20px] md:text-[24px] lg:text-[32px]">
            Trending
          </p>
          <p className="rounded-md border-2 py-1 px-2 text-[8px] text-white font-medium lg:text-[10px]">
            MOVIE
          </p>
        </div>
        <Link to={`/see-more/${currentPathName}/${movieOrTv}/${currentPage}`}>
          <p className="text-xs font-semibold outfit text-seeMore hover:underline">
            SEE MORE
          </p>
        </Link>
      </div>
      {trendingData && (
        <>
          <section className="relative flex gap-x-4 overflow-x-scroll mt-4 md:gap-x-[2.5rem] gap-y-[2rem]">
            {trendingData.slice(0, 10).map((movie, index) => (
              <Link
                key={index}
                to={`/${movie.id}/movie/${movie.title.split(" ").join("-")}`}
              >
                <div className="relative w-full rounded-lg" key={index}>
                  <div
                    key={index}
                    className="relative w-[240px] h-[140px] rounded-lg md:w-[470px] md:h-[230px]"
                  >
                    <img
                      src={`${
                        movie.backdrop_path &&
                        `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                      } || "none"`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="overlay absolute inset-0 bg-black rounded-lg bg-opacity-30"></div>
                    <div className="absolute left-4 bottom-4 z-40 h-fit w-fit truncate text-ellipsis">
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
                            d="M10.173 0H1.827A1.827 1.827 0 0 0 0 1.827v8.346C0 11.183.818 12 1.827 12h8.346A1.827 1.827 0 0 0 12 10.173V1.827A1.827 1.827 0 0 0 10.173 0ZM2.4 5.4H1.2V4.2h1.2v1.2ZM1.2 6.6h1.2v1.2H1.2V6.6Zm9.6-1.2H9.6V4.2h1.2v1.2ZM9.6 6.6h1.2v1.2H9.6V6.6Zm1.2-4.956V2.4H9.6V1.2h.756a.444.444 0 0 1 .444.444ZM1.644 1.2H2.4v1.2H1.2v-.756a.444.444 0 0 1 .444-.444ZM1.2 10.356V9.6h1.2v1.2h-.756a.444.444 0 0 1-.444-.444Zm9.6 0a.444.444 0 0 1-.444.444H9.6V9.6h1.2v.756Z"
                            fill="#FFF"
                            opacity=".75"
                          />
                        </svg>
                        <p className="ml-2 capitalize">
                          {movie.media_type && movie.media_type}
                        </p>
                      </div>
                      <p className="text-ellips w-[200px] truncate text-sm font-bold capitalize text-white lg:text-[20px]">
                        {movie.title}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        </>
      )}
    </div>
  );
}

export default TrendingMovies;
