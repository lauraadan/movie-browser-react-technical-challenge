import React from "react";
import Carousel from "../components/Carousel";
import Loading from "../common/components/Loading";
import axios from "axios";

const API_KEY = "469fa9be60e1d7edf2e0ce3465ee7263";
const BASE_URL = "https://api.themoviedb.org/3";
const MOVIES_PER_PAGE = 10;

const Categories = () => {
  const [genresWithMovies, setGenresWithMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchGenresAndMovies = async () => {
      try {
        setLoading(true);

        const genreRes = await axios.get(
          `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es-ES`
        );
        const genres = genreRes.data.genres;

        const moviesPromises = genres.map(async (genre) => {
          const res = await axios.get(
            `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}&language=es-ES&page=1`
          );
          return {
            genreId: genre.id,
            genreName: genre.name,
            movies: res.data.results.slice(0, MOVIES_PER_PAGE),
          };
        });

        const results = await Promise.all(moviesPromises);
        const filteredGenres = results.filter((item) => item.movies.length > 0);

        setGenresWithMovies(filteredGenres);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching genres or movies:", error);
        setLoading(false);
      }
    };

    fetchGenresAndMovies();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <h1>Categorías</h1>
      {genresWithMovies.map((genre) => (
        <Carousel
          key={genre.genreId}
          title={genre.genreName}
          category={genre.genreName}
          items={genre.movies}
        />
      ))}
    </>
  );
};

export default Categories;
