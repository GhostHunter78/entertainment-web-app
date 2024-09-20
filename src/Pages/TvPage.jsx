import { useEffect } from "react";
import { useParams } from "react-router-dom";

function TvPage({ setMovieName, setFilmId }) {
  const { filmId, movieName } = useParams();

  useEffect(() => {
    if (filmId && movieName) {
      setMovieName(movieName);
      setFilmId(filmId);
    }
  }, [filmId, movieName, , setFilmId, setMovieName]);

  return (
    <div className="bg-red">
      <h1>{movieName}</h1>
      <p>ID: {filmId}</p>
    </div>
  );
}

export default TvPage;
