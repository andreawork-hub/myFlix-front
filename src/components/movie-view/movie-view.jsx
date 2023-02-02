import { useParams } from "react-router";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  return (
    <div className="bg-dark text-white mt-5">
      <div>
        <img className="w-100 mb-3" src={movie.image} />
      </div>
      <div>
        <h1 style={{ fontWeight: "bold" }}>{movie.title}</h1>
      </div>
      <div className="mb-5 mt-3">
        <span>{movie.description}</span>
      </div>
      <div>
        <span style={{ fontStyle: "italic" }}>{movie.director}</span>
      </div>
      <div className="mb-5">
        <span style={{ fontStyle: "italic" }}>{movie.genre}</span>
      </div>
      <Link to={`/`}>
        <Button style={{ cursor: "pointer" }} variant="danger">
          Back
        </Button>
      </Link>
    </div>
  );
};
