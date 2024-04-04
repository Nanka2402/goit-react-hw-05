import { Link, useLocation } from "react-router-dom";
import MovieItem from "../MovieItem/MovieItem";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();
  return (
    <div>
      {Array.isArray(movies) && movies.length > 0 && (
        <ul className={css.list}>
          {movies.map((movie) => {
            return (
              <li key={movie.id} className={css.item}>
                <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                  <MovieItem movie={movie} />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
