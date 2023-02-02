import React from "react";
import { Card } from "react-bootstrap";

export const MovieList = (props) => {
  const FavoriteComponent = props.favoriteComponent;

  return (
    <>
      {props.movies.map((movie, index) => (
        <Card
          key={movie.i}
          className="h-100 bg-dark mt-5 d-flex justify-content-start m-3"
          style={{ width: "18rem" }}
        >
          <Card.Img variant="top" src={movie.image} alt="movie" />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.director}</Card.Text>
            <div
              onClick={() => props.handleFavoriteClicks(movie)}
              className="d-flex align-items-center justify-content-center"
            >
              <FavoriteComponent />
            </div>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};
