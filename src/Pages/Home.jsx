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

const Home = ({
  currentPage,
  currentPathName,
  movieOrTv,
  setMovieOrTv,
  movieName,
  setMovieName,
  setFilmId,
  filmId,
}) => {
  return (
    <>
      <div className="text-white">
        <div className="w-screen lg:pr-[90px] lg:pl-[160px]">
          <SearchField />
        </div>
        <TrendingMovies
          currentPathName={"trending"}
          currentPage={1}
          movieOrTv={"movie"}
          setMovieOrTv={setMovieOrTv}
          setFilmId={setFilmId}
          setMovieName={setMovieName}
        />
        <PopularMovies
          currentPathName={currentPathName}
          currentPage={1}
          movieOrTv="movie"
          setMovieOrTv={setMovieOrTv}
          setFilmId={setFilmId}
          setMovieName={setMovieName}
        />
        <NowPlaying
          currentPathName={"now_playing"}
          currentPage={1}
          movieOrTv={"movie"}
          setMovieOrTv={setMovieOrTv}
          setFilmId={setFilmId}
          setMovieName={setMovieName}
        />
        <Upcoming
          currentPathName={"upcoming"}
          currentPage={1}
          movieOrTv={"movie"}
          setMovieOrTv={setMovieOrTv}
          setFilmId={setFilmId}
          setMovieName={setMovieName}
        />
        <TopRated
          currentPathName={"top_rated"}
          currentPage={1}
          movieOrTv={"movie"}
          setMovieOrTv={setMovieOrTv}
          setFilmId={setFilmId}
          setMovieName={setMovieName}
        />
        <TrendingSeries
          movieOrTv={"tv"}
          currentPathName={"trending"}
          currentPage={1}
          setMovieOrTv={setMovieOrTv}
          setFilmId={setFilmId}
          setMovieName={setMovieName}
        />
        <PopularSeries
          currentPathName={"popular"}
          currentPage={1}
          movieOrTv="tv"
          setMovieOrTv={setMovieOrTv}
          setFilmId={setFilmId}
          setMovieName={setMovieName}
        />
        <AiringToday
          movieOrTv={"tv"}
          currentPathName={"airing_today"}
          currentPage={1}
          setMovieOrTv={setMovieOrTv}
          setFilmId={setFilmId}
          setMovieName={setMovieName}
        />
        <OnAir
          movieOrTv={"tv"}
          currentPathName={"on_the_air"}
          currentPage={1}
          setMovieOrTv={setMovieOrTv}
          setFilmId={setFilmId}
          setMovieName={setMovieName}
        />
        <TopRatedSeries
          movieOrTv={"tv"}
          currentPathName={"top_rated"}
          currentPage={1}
          setMovieOrTv={setMovieOrTv}
          setFilmId={setFilmId}
          setMovieName={setMovieName}
        />
      </div>
    </>
  );
};

export default Home;
