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

const Home = ({ currentPage, currentPathName, movieOrTv, setMovieOrTv }) => {
  return (
    <>
      <div className="text-white">
        <SearchField />
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
        <TrendingSeries movieOrTv={"tv"} />
        <PopularSeries movieOrTv={"tv"} />
        <AiringToday movieOrTv={"tv"} />
        <OnAir movieOrTv={"tv"} />
        <TopRatedSeries movieOrTv={"tv"} />
      </div>
    </>
  );
};

export default Home;
