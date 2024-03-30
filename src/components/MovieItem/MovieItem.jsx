import css from "./MovieItem.module.css";

export default function MovieItem({
  movie: { title, poster_path, release_date, vote_average },
}) {
  const rating = vote_average.toFixed(1);
  return (
    <>
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt="movie poster"
        className={css.img}
      />
      <div className={css.movieDesc}>
        <p>Title: {`"${title}"`}</p>
        <p>Release Date: {`"${release_date}"`}</p>
        <p>Rating: {rating}/10</p>
      </div>
    </>
  );
}
