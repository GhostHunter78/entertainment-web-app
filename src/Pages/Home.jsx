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
        <div className="lg:pr-[90px] lg:pl-[160px]">
          <SearchField />
        </div>
        <TrendingMovies
          currentPathName={"trending"}
          currentPage={currentPage}
          movieOrTv={"movie"}
          setMovieOrTv={setMovieOrTv}
          setFilmId={setFilmId}
          setMovieName={setMovieName}
        />
        <PopularMovies
          currentPathName={currentPathName}
          currentPage={currentPage}
          movieOrTv="movie"
          setMovieOrTv={setMovieOrTv}
          setFilmId={setFilmId}
          setMovieName={setMovieName}
        />
        <NowPlaying
          currentPathName={"now_playing"}
          currentPage={currentPage}
          movieOrTv={"movie"}
          setMovieOrTv={setMovieOrTv}
          setFilmId={setFilmId}
          setMovieName={setMovieName}
        />
        <Upcoming
          currentPathName={"upcoming"}
          currentPage={currentPage}
          movieOrTv={"movie"}
          setMovieOrTv={setMovieOrTv}
          setFilmId={setFilmId}
          setMovieName={setMovieName}
        />
        <TopRated
          currentPathName={"top_rated"}
          currentPage={currentPage}
          movieOrTv={"movie"}
          setMovieOrTv={setMovieOrTv}
          setFilmId={setFilmId}
          setMovieName={setMovieName}
        />
        <TrendingSeries
          movieOrTv={"tv"}
          currentPathName={"trending"}
          currentPage={currentPage}
          setMovieOrTv={setMovieOrTv}
          setFilmId={setFilmId}
          setMovieName={setMovieName}
        />
        <PopularSeries
          currentPathName={"popular"}
          currentPage={currentPage}
          movieOrTv="tv"
          setMovieOrTv={setMovieOrTv}
          setFilmId={setFilmId}
          setMovieName={setMovieName}
        />
        <AiringToday
          movieOrTv={"tv"}
          currentPathName={"airing_today"}
          currentPage={currentPage}
          setMovieOrTv={setMovieOrTv}
          setFilmId={setFilmId}
          setMovieName={setMovieName}
        />
        <OnAir
          movieOrTv={"tv"}
          currentPathName={"on_the_air"}
          currentPage={currentPage}
          setMovieOrTv={setMovieOrTv}
          setFilmId={setFilmId}
          setMovieName={setMovieName}
        />
        <TopRatedSeries
          movieOrTv={"tv"}
          currentPathName={"top_rated"}
          currentPage={currentPage}
          setMovieOrTv={setMovieOrTv}
          setFilmId={setFilmId}
          setMovieName={setMovieName}
        />
      </div>
    </>
  );
};

export default Home;
