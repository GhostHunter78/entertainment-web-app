import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
  useParams,
} from "react-router-dom";
import Header from "./Layouts/Header";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Footer from "./Layouts/Footer";
import MovieGenres from "./Pages/MovieGenres";
import SeriesGenres from "./Pages/SeriesGenres";
import PopularMoviesPage from "./Pages/PopularMoviesPage";

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

  // let currentPathName = "";

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
            />
          ),
        },
        { path: "movie-genres", element: <MovieGenres /> },
        { path: "series-genres", element: <SeriesGenres /> },
        // Passing currentPage as a prop to PopularMoviesPage
        {
          path: `:currentPathname/movies/:currentPage`,
          element: (
            <PopularMoviesPage
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setCurrentPathName={setCurrentPathName}
            />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
