import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TrendingSeries({ currentPathName, currentPage, movieOrTv }) {
  const [trendingData, setTrendingData] = useState(null);

  const getTrendingSeries = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/tv/day?api_key=399464050f3fe0a143819e2d3fa3f29b"
      );
      if (!response.ok) {
        throw new Error(`Error fetching trending series: ${response.status}`);
      }
      const data = await response.json();
      setTrendingData(data.results);
    } catch (error) {
      console.error("Error fetching trending series:", error);
    }
  };

  useEffect(() => {
    getTrendingSeries();
  }, []);

  return (
    <div className="mt-6 w-screen px-4 md:px-8 lg:pr-[90px] lg:pl-[160px]">
      <div className="flex flex-row items-center w-full justify-between">
        <div className="flex items-center gap-[8px]">
          <p className="outfit text-white text-[20px] md:text-[24px] lg:text-[32px]">
            Trending
          </p>
          <p className="rounded-md border-2 py-1 px-2 text-[8px] text-black bg-white font-medium lg:text-[10px]">
            TV SERIES
          </p>
        </div>
        <Link to={`/${currentPathName}/${movieOrTv}/${currentPage}`}>
          <p className="text-xs font-semibold outfit text-seeMore hover:underline">
            SEE MORE
          </p>
        </Link>
      </div>
      {trendingData && (
        <>
          <section className="relative flex gap-x-4 overflow-x-scroll mt-4 gap-y-[2rem] md:gap-x-[2.5rem]">
            {trendingData.slice(0, 10).map((movie, index) => (
              <Link
                key={index}
                to={`/${movie.id}/tv/${movie.title.split(" ").join("-")}`}
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
                            d="M12 2.689H5.448L7.068.722 6.132 0 4.2 2.345 2.268.017l-.936.705 1.62 1.967H0V12h12V2.689Zm-4.8 8.147h-6V3.853h6v6.983Zm3-2.328H9V7.344h1.2v1.164Zm0-2.328H9V5.016h1.2V6.18Z"
                            fill="#FFF"
                            opacity=".75"
                          />
                        </svg>
                        <p className="ml-2 uppercase">
                          {movie.media_type && movie.media_type}
                        </p>
                      </div>
                      <p className="text-ellips w-[200px] truncate text-sm font-bold capitalize text-white lg:text-[20px]">
                        {movie.name}
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

export default TrendingSeries;
