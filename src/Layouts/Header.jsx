import Logo from "../SVGs/Logo";
import IconHome from "../SVGs/IconHome";
import IconMovies from "../SVGs/IconMovies";
import IconSeries from "../SVGs/IconSeries";
import IconBookmark from "../SVGs/IconBookmark";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const location = useLocation();

  // Extract the page name from the pathname
  const currentPage = location.pathname;

  return (
    <>
      <div className="w-screen bg-blue px-4 py-4 flex items-center justify-between md:px-8 lg:fixed lg:z-50 lg:flex-col lg:left-8 lg:top-[9%] lg:w-fit lg:rounded-lg lg:gap-y-[100px] lg:px-[18px] lg:py-[25px] lg:h-[83%]">
        <Link to={"/"}>
          <Logo />
        </Link>
        <div className="flex items-center gap-6 md:gap-[5.5rem] lg:flex-col lg:gap-y-[50px]">
          <Link to={"/"}>
            <IconHome activePage={currentPage} />
          </Link>
          <Link to={"/movie-genres"}>
            <IconMovies activePage={currentPage} />
          </Link>
          <Link to={"/series-genres"}>
            <IconSeries activePage={currentPage} />
          </Link>
          {/* <IconBookmark /> */}
        </div>
        <FaUserCircle className="fill-iconGray w-[23px] h-[23px]" />
      </div>
    </>
  );
};

export default Header;
