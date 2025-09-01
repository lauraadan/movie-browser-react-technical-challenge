import React from "react";
import Carousel from "../components/Carousel";
import Loading from "../common/components/Loading";
import { useMovieGenres, useMovies } from "../common/hooks/useMovies";
import Banner from "../components/Banner";
import Error from "../common/components/Error";

const Categories: React.FC = () => {
  const { genres, loading, error } = useMovieGenres();
  const topRated = useMovies("top_rated");

  if (loading) return <Loading />;
  if (error) return <Error />;

  const genresWithMovies = Array.isArray(genres)
    ? genres.filter((g) => g.movies && g.movies.length > 0)
    : [];

  return (
    <>
      <div className="hero">
        <Banner items={topRated.movies.slice(0, 5)} category="popular" />
      </div>
      <h1>Categorías</h1>
      {genresWithMovies.length > 0 ? (
        genresWithMovies.map((g) => (
          <Carousel
            key={g.genreId}
            title={g.genreName}
            category={g.genreName}
            items={g.movies}
          />
        ))
      ) : (
        <p>No se encontraron películas por género.</p>
      )}
    </>
  );
};

export default Categories;
