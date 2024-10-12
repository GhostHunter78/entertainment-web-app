import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function SearchResults() {
  const [results, setResults] = useState([]);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTk0NjQwNTBmM2ZlMGExNDM4MTllMmQzZmEzZjI5YiIsIm5iZiI6MTcyNTU0OTE0NS4xNTE2NzUsInN1YiI6IjY1ZjlhNGM1MDdlMjgxMDE2M2MxNWVhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TMXhDTvJVHUMYlFXlHUtaCsd0Lr0cbP4szEmclBUXfg",
        },
      };

      fetch(
        `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
        options
      )
        .then((response) => response.json())
        .then((data) => {
          setResults(data.results);
        })
        .catch((err) => console.error(err));
    }
  }, [query]);

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      <div className="results-grid">
        {results.length > 0 ? (
          results.map((movie) => (
            <div key={movie.id}>
              <h2>{movie.title}</h2>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
