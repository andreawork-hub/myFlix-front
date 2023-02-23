import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieList = (props) => {
  const FavoriteComponent = props.favoriteComponent;

  return (
    <>
      {props.movies.map((movie) => (
        <Card
          className="movie-card bg-dark text-white mh-100 d-flex justify-content-start m-3"
          style={{ width: "18rem" }}
          key={movie.id}
        >
          <Card.Img
            className="card-image"
            variant="top"
            src={movie.image}
            alt="movie"
          />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.director}</Card.Text>
          </Card.Body>
          <Card.Footer className="mb-3 justify-content-between">
            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
              <Button variant="danger">Open</Button>
            </Link>

            <Button
              variant="danger"
              onClick={() => props.handleFavoriteClick(movie)}
            >
              <FavoriteComponent />
            </Button>
          </Card.Footer>
        </Card>
      ))}
    </>
  );
};

MovieList.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string,
    }),
  }).isRequired,
};
