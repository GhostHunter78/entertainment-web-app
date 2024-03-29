import PopularMovies from "../Components/PopularMovies";
import SearchField from "../Components/SearchField";
import TrendingMovies from "../Components/TrendingMovies";
import NowPlaying from "../Components/NowPlaying";
import Upcoming from "../Components/Upcoming";
import TopRated from "../Components/TopRated";

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
      </div>
    </>
  );
};

export default Home;
