import React from "react";
import { Button } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div class="bg-dark text-white m-3">
      <div>
        <img className="w-100" src={movie.ImagePath} />
      </div>
      <div>
        <h3>{movie.Title}</h3>
      </div>
      <div class="mb-4 mt-4">
        <h5>
          {movie.Director.Name} , {movie.Genre.Name}
        </h5>
        <span>{movie.Description}</span>
      </div>
      <Button
        onClick={onBackClick}
        style={{ cursor: "pointer" }}
        variant="danger"
      >
        Back
      </Button>
    </div>
  );
};
