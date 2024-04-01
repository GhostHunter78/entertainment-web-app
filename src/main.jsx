import React from "react";
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

// Layout component to conditionally render the Header
const Layout = () => {
  const currentPath = window.location.pathname;
  const isLoginPage = currentPath === "/" || currentPath === "/registration";

  return (
    <>
      {!isLoginPage && <Header />} <Outlet /> {!isLoginPage && <Footer />}
    </>
  );
};

// Create the router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Login /> },
      { path: "registration", element: <Registration /> },
      { path: "home", element: <Home /> },
      { path: "movie-genres", element: <MovieGenres /> },
      { path: "series-genres", element: <SeriesGenres /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
