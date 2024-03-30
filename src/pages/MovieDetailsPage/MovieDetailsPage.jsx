import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { movieDetailsReq } from "../../API/API";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import toast from "react-hot-toast";
import clsx from "clsx";
import css from "./MovieDetailsPage.module.css";

const MovieReviews = lazy(() =>
  import("../../components/MovieReviews/MovieReviews")
);
const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const ErrorMessage = lazy(() =>
  import("../../components/ErrorMessage/ErrorMessage")
);
const Loader = lazy(() => import("../../components/Loader/Loader"));

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/");
  useEffect(() => {
    if (!movieId) return;
    const getMovieData = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await movieDetailsReq(movieId);
        setMovie(res);
      } catch (error) {
        setError(error.message);
        toast.error("Oops, something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    getMovieData();
  }, [movieId]);
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <div>
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {movie && (
        <div className={css.content}>
          <img
            width={400}
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt="movie poster"
          />
          <div className={css.description}>
            <h2>{movie.title}</h2>
            <p>
              <b>Release Date</b>
              {": "}
              {movie.release_date}
            </p>
            <p>
              <b>Overview</b>
              {": "}
              {movie.overview}
            </p>
            <p>
              <b>Genres</b>
              {": "}
              {movie.genres &&
                movie.genres
                  .map((genre) => {
                    return genre.name;
                  })
                  .join(", ")}
            </p>
            <p>
              <b>Rating</b>
              {": "}
              {movie.vote_average.toFixed(1)}/10
            </p>
          </div>
        </div>
      )}
      <div>
        <NavLink
          to="cast"
          state={{ from: backLinkRef.current }}
          className={buildLinkClass}
        >
          Cast
        </NavLink>
        <NavLink
          to="reviews"
          state={{ from: backLinkRef.current }}
          className={buildLinkClass}
        >
          Movie Reviews
        </NavLink>
        <Link className={css.link} to={backLinkRef.current}>
          Go Back
        </Link>
      </div>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Routes>
      </Suspense>
    </div>
  );
}
