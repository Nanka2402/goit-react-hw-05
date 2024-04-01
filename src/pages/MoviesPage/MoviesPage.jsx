import { useEffect, useState } from "react";
import SeachForm from "../../components/SearchForm/SearchForm";
import { queryReq } from "../../API/API";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

import Loader from "../../components/Loader/Loader";
import ErrorMessege from "../../components/ErrorMessage/ErrorMessage";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const query = searchParams.get("query") ?? "";
  useEffect(() => {
    const fetchQueryMovies = async () => {
      try {
        setIsloading(true);
        setError(null);
        setMovies([]);
        const res = await queryReq(query);
        setMovies(res);
      } catch (error) {
        setError(error.message);
        toast.error("Oops, something went wrong!");
      } finally {
        setIsloading(false);
      }
    };

    fetchQueryMovies();
  }, [query, error]);

  const handleSearch = (query) => {
    const nextParams = query !== "" ? { query } : {};
    setSearchParams(nextParams);
  };
  return (
    <main>
      {loading && <Loader />}
      {error && <ErrorMessege />}
      <SeachForm onSearch={handleSearch} />
      <MovieList movies={movies} />
    </main>
  );
}
