import Logo from "../SVGs/Logo";
import IconHome from "../SVGs/IconHome";
import IconMovies from "../SVGs/IconMovies";
import IconSeries from "../SVGs/IconSeries";
import IconBookmark from "../SVGs/IconBookmark";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="w-screen bg-blue px-4 py-4 flex items-center justify-between">
        <Link to={"/home"}>
          <Logo />
        </Link>
        <div className="flex items-center gap-6">
          <Link to={"/home"}>
            <IconHome />
          </Link>
          <Link to={"/movie-genres"}>
            <IconMovies />
          </Link>
          <Link to={"/series-genres"}>
            <IconSeries />
          </Link>
          <IconBookmark />
        </div>
        <img src="./assets/icons/icon-avatar.png" />
      </div>
    </>
  );
};

export default Header;
