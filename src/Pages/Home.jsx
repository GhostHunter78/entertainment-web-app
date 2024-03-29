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

const Home = () => {
  return (
    <>
      <div className="text-white">
        <SearchField />
        <TrendingMovies />
        <PopularMovies />
        <NowPlaying />
        <Upcoming />
        <TopRated />
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
