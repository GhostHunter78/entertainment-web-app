import Logo from "../SVGs/Logo";
import IconHome from "../SVGs/IconHome";
import IconMovies from "../SVGs/IconMovies";
import IconSeries from "../SVGs/IconSeries";
import IconBookmark from "../SVGs/IconBookmark";

const Header = () => {
  return (
    <>
      <div className="w-screen bg-blue px-4 py-4 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-6">
          <IconHome />
          <IconMovies />
          <IconSeries />
          <IconBookmark />
        </div>
        <img src="./assets/icons/icon-avatar.png" />
      </div>
    </>
  );
};

export default Header;
