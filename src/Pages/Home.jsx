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

const Home = ({ currentPage, currentPathName }) => {
  return (
    <>
      <div className="text-white">
        <SearchField />
        <TrendingMovies
          currentPathName={"trending"}
          currentPage={currentPage}
        />
        <PopularMovies currentPathName={"popular"} currentPage={currentPage} />
        <NowPlaying currentPathName={"now_playing"} currentPage={currentPage} />
        <Upcoming currentPathName={"upcoming"} currentPage={currentPage} />
        <TopRated currentPathName={"top_rated"} currentPage={currentPage} />
        <TrendingSeries />
        <PopularSeries />
        <AiringToday />
        <OnAir />
        <TopRatedSeries />
      </div>
    </>
  );
};

export default Home;
