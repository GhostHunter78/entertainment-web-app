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

// Layout component to render the Header and Footer
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const App = () => {
  // State for currentPage
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPathName, setCurrentPathName] = useState("");
  const [movieOrTv, setMovieOrTv] = useState("movie");

  localStorage.setItem("movieOrTv", movieOrTv);
  localStorage.setItem("currentPathName", currentPathName);
  localStorage.setItem("currentPage", currentPage);

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
          path: "genre/:genreId/:currentPage",
          element: (
            <MoviesByGenre
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setCurrentPathName={setCurrentPathName}
            />
          ),
        },
        { path: "series-genres", element: <SeriesGenres /> },
        // Passing currentPage as a prop to PopularMoviesPage
        {
          path: `:currentPathname/:movieOrTv/:currentPage`,
          element: (
            <SeeMoreMoviesPage
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setCurrentPathName={setCurrentPathName}
              movieOrTv={movieOrTv}
              setMovieOrTv={setMovieOrTv}
            />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
