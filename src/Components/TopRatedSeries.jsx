import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TopRatedSeries({ currentPathName, currentPage, movieOrTv }) {
  const [topRatedSeriesData, setTopRatedSeriesData] = useState(null);

  const getTopRatedSeries = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/top_rated?api_key=399464050f3fe0a143819e2d3fa3f29b"
      );
      if (!response.ok) {
        throw new Error(`Error fetching top rated series: ${response.status}`);
      }
      const data = await response.json();
      setTopRatedSeriesData(data.results);
    } catch (error) {
      console.error("Error fetching top rated series:", error);
    }
  };

  useEffect(() => {
    getTopRatedSeries();
  }, []);
  return (
    <div className="mt-6 w-screen px-4 md:px-8 lg:pr-[90px] lg:pl-[160px]">
      <div className="flex flex-row items-center w-full justify-between">
        <div className="flex items-center gap-[8px]">
          <p className="outfit text-white text-[20px] md:text-[24px] lg:text-[32px]">
            Top Rated
          </p>
          <p className="rounded-md border-2 py-1 px-2 text-[8px] text-black bg-white font-medium lg:text-[10px]">
            TV SERIES
          </p>
        </div>
        <Link to={`/see-more/${currentPathName}/${movieOrTv}/${currentPage}`}>
          <p className="text-xs font-semibold outfit text-seeMore hover:underline">
            SEE MORE
          </p>
        </Link>
      </div>
      {topRatedSeriesData && (
        <>
          <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 gap-y-[2rem] lg:grid-cols-4 lg:gap-8">
            {topRatedSeriesData.slice(0, 6).map((series, index) => (
              <Link
                key={index}
                className={`relative ${index >= 4 ? "lg:col-span-2" : ""}`}
                to={`/${series.id}/tv/${series.name.split(" ").join("-")}`}
              >
                <div
                  key={index}
                  className={`relative ${index >= 4 ? "lg:col-span-2" : ""}`}
                >
                  <div className="h-[133px] overflow-hidden rounded-lg lg:h-[180px]">
                    <img
                      src={`${
                        series.backdrop_path &&
                        `https://image.tmdb.org/t/p/w500${series.backdrop_path}`
                      } || "none"`}
                      alt={`series Poster: ${series.title || "Unknown"}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-2 w-full">
                    <div className="mb-1 flex text-[11px] font-light items-center lg:text-[14px]">
                      <p>
                        {series.first_air_date &&
                          series.first_air_date.substring(0, 4)}
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
                      <p className="ml-2 uppercase">tv</p>
                    </div>
                    <p className="text-ellips w-[160px] truncate text-sm font-bold capitalize text-white lg:text-[20px]">
                      {series.name}
                    </p>
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

export default TopRatedSeries;
