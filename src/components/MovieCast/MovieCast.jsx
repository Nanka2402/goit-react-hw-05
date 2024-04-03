import { lazy, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { movieCastReq } from "../../API/API";
import toast from "react-hot-toast";
import nophoto from "../../assest/noPhoto.png";
import css from "./MovieCast.module.css";

const Loader = lazy(() => import("../Loader/Loader"));
const ErrorMessage = lazy(() => import("../ErrorMessage/ErrorMessage"));

export default function MovieCast() {
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    const getCastData = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await movieCastReq(movieId);
        setCast(res);
      } catch (error) {
        setError(error.message);
        toast.error("Oops, something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    getCastData();
  }, [movieId]);
  return (
    <>
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {Array.isArray(cast) &&
        cast &&
        cast.map((actor) => {
          return (
            <li key={actor.id} className={css.actor}>
              <img
                width="150px"
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                    : nophoto
                }
              />
              <p>{actor.name}</p>
              <span>Known as: </span>
              <p>{actor.character}</p>
            </li>
          );
        })}
    </>
  );
}
