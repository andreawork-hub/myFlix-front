import { useState, useEffect } from "react";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { MovieList } from "../movie-list/movie-list";
import { AddFavorite } from "../add-favorites/add-favorites";
import { RemoveFavorite } from "../remove-favorites/remove-favorites";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row, Col, Form } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [favorite, setFavorite] = useState([]);
  const [filtered, setFiltered] = useState(movies);

  useEffect(() => {
    if (!token) {
      return;
    } else {
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
    }
  }, [token]);

  const filterMovies = (e) => {
    console.log("movies: ", movies[0]);
    if (e.target.value !== "") {
      const result = movies.filter((movie) =>
        movie.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFiltered(result);
    } else {
      setFiltered(movies);
    }
  };

  // favorite movies
  useEffect(() => {
    const movieFavorite = JSON.parse(
      localStorage.getItem("react-my-flix-favorite")
    );
    if (movieFavorite) {
      setFavorite(movieFavorite);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-my-flix-favorite", JSON.stringify(items));
  };

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorite, movie];
    setFavorite([...new Set(newFavoriteList)]);
    saveToLocalStorage(newFavoriteList);
  };

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorite.filter(
      (favorite) => favorite.id !== movie.id
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
                  <Col md={8} style={{ marginTop: 75, marginBottom: 75 }}>
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
                <Row>
                  <Col md={5} style={{ marginTop: 75 }}>
                    <Form.Control
                      id="search-movie"
                      className="form-control"
                      onChange={filterMovies}
                      type="search"
                      placeholder="Search movie..."
                    />
                  </Col>
                </Row>

                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    <div
                      md={12}
                      className="container-fluid my-Flix"
                      style={{ marginTop: 75 }}
                    >
                      <div className="row">
                        <MovieList
                          movies={filtered}
                          handleFavoriteClick={addFavoriteMovie}
                          favoriteComponent={AddFavorite}
                        />
                      </div>
                    </div>
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
                    <Col md={5} style={{ marginTop: 75 }}>
                      <ProfileView user={user} token={token} />
                    </Col>

                    <div
                      md={12}
                      className="container-fluid my-Flix"
                      style={{ marginTop: 75, marginBottom: 75 }}
                    >
                      <div className="row d-flex mb-3">
                        <h4>Favorites</h4>
                      </div>

                      <div className="row" style={{ marginBottom: 75 }}>
                        <MovieList
                          movies={favorite}
                          handleFavoriteClick={removeFavoriteMovie}
                          favoriteComponent={RemoveFavorite}
                        />
                      </div>
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
