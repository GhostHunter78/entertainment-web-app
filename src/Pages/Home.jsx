import PopularMovies from "../Components/PopularMovies";
import SearchField from "../Components/SearchField";
import TrendingMovies from "../Components/TrendingMovies";

const Home = () => {
  return (
    <>
      <div className="text-white">
        <SearchField />
        <TrendingMovies />
        <PopularMovies />
      </div>
    </>
  );
};

export default Home;
