export const MovieCard = ({ movie }) => {
  return (
    <div
      onClick={() => {
        setSelectedMovie(movie);
      }}
    >
      {movie.title}
    </div>
  );
};
