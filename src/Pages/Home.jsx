import PopularMovies from "../Components/PopularMovies";
import SearchField from "../Components/SearchField";
import TrendingMovies from "../Components/TrendingMovies";
import NowPlaying from "../Components/NowPlaying";
import Upcoming from "../Components/Upcoming";
import TopRated from "../Components/TopRated";
import TrendingSeries from "../Components/TrendingSeries";
import {
  AiringToday,
  OnAir,
  PopularSeries,
  TopRatedSeries,
} from "../Components";

const Home = ({ currentPage, currentPathName, movieOrTv }) => {
  return (
    <>
      <div className="text-white">
        <div className="lg:pr-[90px] lg:pl-[160px]">
          <SearchField />
        </div>
        <TrendingMovies
          currentPathName={"trending"}
          currentPage={currentPage}
          movieOrTv={"movie"}
        />
        <PopularMovies
          currentPathName={"popular"}
          currentPage={currentPage}
          movieOrTv={"movie"}
        />
        <NowPlaying
          currentPathName={"now_playing"}
          currentPage={currentPage}
          movieOrTv={"movie"}
        />
        <Upcoming
          currentPathName={"upcoming"}
          currentPage={currentPage}
          movieOrTv={"movie"}
        />
        <TopRated
          currentPathName={"top_rated"}
          currentPage={currentPage}
          movieOrTv={"movie"}
        />
        <TrendingSeries
          movieOrTv={"tv"}
          currentPathName={"trending"}
          currentPage={currentPage}
        />
        <PopularSeries
          movieOrTv={"tv"}
          currentPathName={"popular"}
          currentPage={currentPage}
        />
        <AiringToday
          movieOrTv={"tv"}
          currentPathName={"airing_today"}
          currentPage={currentPage}
        />
        <OnAir
          movieOrTv={"tv"}
          currentPathName={"on_the_air"}
          currentPage={currentPage}
        />
        <TopRatedSeries
          movieOrTv={"tv"}
          currentPathName={"top_rated"}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default Home;
