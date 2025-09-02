import React, { FC } from "react";
import Carousel from "../../components/Carousel/Carousel";
import Loading from "../../components/Loading/Loading";
import { useMovieGenres, useMovies } from "../../hooks/useMovies/useMovies";
import Banner from "../../components/Banner/Banner";
import Error from "../../components/Error/Error";
import { GenreWithMovies, TMDBMovie } from "../../../types/interfaces";

const Categories: FC = () => {
  const { genres, loading, error } = useMovieGenres();
  const topRated = useMovies("top_rated");

  if (loading) return <Loading />;
  if (error) return <Error />;

  // Filter genres that have movies
  const genresWithMovies: GenreWithMovies[] = Array.isArray(genres)
    ? genres.filter(
        (g): g is GenreWithMovies =>
          Array.isArray(g.movies) && g.movies.length > 0
      )
    : [];

  return (
    <>
      <div className="hero">
        <Banner items={topRated.movies.slice(0, 5)} category="popular" />
      </div>
      <h1>Categories</h1>
      {genresWithMovies.length > 0 ? (
        genresWithMovies.map((g) => (
          <Carousel
            key={g.id}
            title={g.name}
            category={g.name}
            items={g.movies as TMDBMovie[]}
          />
        ))
      ) : (
        <p>No movies found for genres.</p>
      )}
    </>
  );
};

export default Categories;
