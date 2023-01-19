import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Interstellar",
      image:
        "https://www.imdb.com/title/tt0816692/mediaviewer/rm4043724800/?ref_=tt_ov_i",
      director: "Christopher Nolan",
    },
    {
      id: 2,
      title: "Inception",
      image:
        "https://www.imdb.com/title/tt1375666/mediaviewer/rm3426651392/?ref_=tt_ov_i",
      director: "Christopher Nolan",
    },
    {
      id: 3,
      title: "Doctor Strange",
      image:
        "https://www.imdb.com/title/tt1211837/mediaviewer/rm3012758016/?ref_=tt_ov_i",
      director: "Scott Derrickson",
    },
    {
      id: 4,
      title: "Miss Sloane",
      image:
        "https://www.imdb.com/title/tt4540710/mediaviewer/rm2662272000/?ref_=tt_ov_i",
      director: "John Madden",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
