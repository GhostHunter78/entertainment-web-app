import SearchField from "../Components/SearchField";
import MoviesData from "../Components/MoviesData";

const Home = () => {
  return (
    <>
      <div className="text-white">
        <SearchField />
        <MoviesData />
      </div>
    </>
  );
};

export default Home;
