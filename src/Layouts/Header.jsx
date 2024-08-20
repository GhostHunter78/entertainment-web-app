import Logo from "../SVGs/Logo";
import IconHome from "../SVGs/IconHome";
import IconMovies from "../SVGs/IconMovies";
import IconSeries from "../SVGs/IconSeries";
import IconBookmark from "../SVGs/IconBookmark";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  // Extract the page name from the pathname
  const currentPage = location.pathname;

  return (
    <>
      <div className="w-screen bg-blue px-4 py-4 flex items-center justify-between md:px-8">
        <Link to={"/home"}>
          <Logo />
        </Link>
        <div className="flex items-center gap-6 md:gap-[5.5rem]">
          <Link to={"/home"}>
            <IconHome activePage={currentPage} />
          </Link>
          <Link to={"/movie-genres"}>
            <IconMovies activePage={currentPage} />
          </Link>
          <Link to={"/series-genres"}>
            <IconSeries activePage={currentPage} />
          </Link>
          <IconBookmark />
        </div>
        <img src="/assets/icons/icon-avatar.png" />
      </div>
    </>
  );
};

export default Header;
