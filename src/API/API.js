import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTEwNTE0MzA1NWRmZmFiZGZlMThlNmZiNDQ4ODZlYyIsInN1YiI6IjY2MDg2MzQ3YTg5NGQ2MDE2MjYzZjI3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.55A-gZgwglAqsLcLZVQ8DzradPd2lg6C47l-t7y5NOg",
  },
};

const trendReq = async () => {
  const res = await axios.get("/trending/movie/week", options);

  return res.data.results;
};

const queryReq = async (query) => {
  const res = await axios.get(
    `/search/movie?include_adult=true&page=1&query=${query}`,
    options
  );

  return res.data.results;
};

const movieDetailsReq = async (movieId) => {
  const res = await axios.get(`/movie/${movieId}`, options);

  return res.data;
};

const movieCastReq = async (movieId) => {
  const res = await axios.get(`/movie/${movieId}/credits`, options);

  return res.data;
};

const movieReviewsReq = async (movieId) => {
  const res = await axios.get(`/movie/${movieId}/reviews`, options);

  return res.data;
};

export { trendReq, queryReq, movieDetailsReq, movieCastReq, movieReviewsReq };
