import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./Layouts/Header";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Footer from "./Layouts/Footer";
import MovieGenres from "./Pages/MovieGenres";
import SeriesGenres from "./Pages/SeriesGenres";
import SeeMoreMoviesPage from "./Pages/SeeMoreMoviesPage";
import MoviesByGenre from "./Pages/MoviesByGenres";
import SeriesByGenre from "./Pages/SeriesByGenres";
import MoviePage from "./Pages/MoviePage";
import TvPage from "./Pages/TvPage";
import SearchResults from "./Pages/SearchResults";

// Layout component to render the Header and Footer
const Layout = () => {
  return (
    <>
      <div>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

const App = () => {
  // State for currentPage
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPathName, setCurrentPathName] = useState("popular");
  const [movieName, setMovieName] = useState("");
  const [filmId, setFilmId] = useState("");
  const [movieOrTv, setMovieOrTv] = useState("movie");

  localStorage.setItem("movieOrTv", movieOrTv);
  localStorage.setItem("currentPathName", currentPathName);
  localStorage.setItem("currentPage", currentPage);
  localStorage.setItem("filmId", filmId);
  localStorage.setItem("movieName", movieName);

  // Create the router configuration
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Login /> },
        { path: "registration", element: <Registration /> },
        {
          path: "home",
          element: (
            <Home
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              currentPathName={currentPathName}
              movieOrTv={movieOrTv}
              setMovieOrTv={setMovieOrTv}
              movieName={movieName}
              setMovieName={setMovieName}
              setFilmId={setFilmId}
              filmId={filmId}
            />
          ),
        },
        {
          path: "movie-genres",
          element: (
            <MovieGenres
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setCurrentPathName={setCurrentPathName}
            />
          ),
        },
        {
          path: "movies/genre/:genreId/:currentPage",
          element: (
            <MoviesByGenre
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setCurrentPathName={setCurrentPathName}
            />
          ),
        },
        {
          path: "series-genres",
          element: (
            <SeriesGenres
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setCurrentPathName={setCurrentPathName}
            />
          ),
        },
        {
          path: "series/genre/:genreId/:currentPage",
          element: (
            <SeriesByGenre
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setCurrentPathName={setCurrentPathName}
            />
          ),
        },
        // Passing currentPage as a prop to PopularMoviesPages
        {
          path: `see-more/:currentPathname/:movieOrTv/:currentPage`,
          element: (
            <SeeMoreMoviesPage
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              currentPathName={currentPathName}
              setCurrentPathName={setCurrentPathName}
              movieOrTv={movieOrTv}
              setMovieOrTv={setMovieOrTv}
            />
          ),
        },
        {
          path: `:filmId/movie/:movieName`,
          element: (
            <MoviePage
              movieName={movieName}
              setMovieName={setMovieName}
              setFilmId={setFilmId}
              filmId={filmId}
            />
          ),
        },
        {
          path: `:filmId/tv/:movieName`,
          element: (
            <TvPage
              movieName={movieName}
              setMovieName={setMovieName}
              setFilmId={setFilmId}
              filmId={filmId}
            />
          ),
        },
        {
          path: `search-results`,
          element: <SearchResults />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
