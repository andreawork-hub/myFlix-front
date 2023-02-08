import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { MovieList } from "../movie-list/movie-list";
import { AddFavorite } from "../add-favorites/add-favorites";
import { RemoveFavorite } from "../remove-favorites/remove-favorites";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row, Col, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [favorite, setFavorite] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://movie-api-lnmw.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            image: movie.ImagePath,
            description: movie.Description,
            genre: movie.Genre.Name,
            director: movie.Director.Name,
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  useEffect(() => {
    const movieFavorite = JSON.parse(
      localStorage.getItem("react-my-flix-favorite")
    );
    if (movieFavorites) {
      setFavorite(movieFavorite);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-my-flix-favorite", JSON.stringify(items));
  };

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorite, movie];
    setFavorite(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorite.filter(
      (favorite) => favorite.Id !== movie.Id
    );
    setFavorite(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-5" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" />
                ) : (
                  <>
                    <Col md={8}>
                      <ProfileView />
                    </Col>
                  </>
                )}
              </>
            }
          />
          <Route
            path="/movielist"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" />
                ) : (
                  <>
                    <div md={8} className="container-fluid movie-app">
                      <div className="row">
                        <MovieList
                          movies={movies}
                          handleFavoriteClick={addFavoriteMovie}
                          favoriteComponent={AddFavorite}
                        />
                      </div>
                      <div className="row d-flex align-items-center mt-4 mb-4">
                        <h1>Favorites</h1>
                      </div>
                      <MovieList
                        movies={favorite}
                        handleFavoriteClick={removeFavoriteMovie}
                        favoriteComponent={RemoveFavorite}
                      />
                    </div>
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
