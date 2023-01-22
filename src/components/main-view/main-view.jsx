import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://movie-api-lnmw.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        console.log(movies);
        setMovies(movies);
      });
  }, [token]);
  /*const moviesFromApi = movies.map((movie) => {
            const { _id, ...rest } = movie;
            return {
              ...rest,
              id: movie._id,
              };
        });

        setMovies(moviesFromApi);
      });
  }, []); */

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <>
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          Logout
        </button>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      </>
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
          onMovieClick={() => setSelectedMovie(movie)}
        />
      ))}
    </div>
  );
};
