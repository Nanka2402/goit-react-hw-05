import { useEffect, useState } from "react";
import { trendReq } from "../../API/API";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [loading, setIsloading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchFilms() {
      try {
        setIsloading(true);
        const res = await trendReq();
        console.log(res);
        setMovies(res);
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
      }
    }
    fetchFilms();
  }, []);

  return (
    <main>
      <h1 className={css.hometitle}>Trending today</h1>
      {loading && <Loader />}
      {movies && movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
}
