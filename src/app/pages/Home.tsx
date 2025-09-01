import React from "react";
import Carousel from "../components/Carousel";
import Banner from "../components/Banner";
import { TMDBMovie } from "../service/api";
import Loading from "../common/components/Loading";
import { useMovies } from "../common/hooks/useMovies";

// TODO GESTIONAR ERROR
// TODO GESTIONAR MEDIA QUERIES
// TODO GESTIONAR CONTEXT DONDE VENGA LOS ERRORS Y LOADINGS
// TODO Hover en botones
// TODO Mover interface a archivo externo

export default function Home() {
  const popular = useMovies("popular");
  const topRated = useMovies("top_rated");
  const nowPlaying = useMovies("now_playing");
  const loading = popular.loading || topRated.loading || nowPlaying.loading;
  const error = popular.error || topRated.error || nowPlaying.error;

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="hero">
        <Banner items={popular.movies.slice(0, 5)} category="popular" />
      </div>

      <Carousel title="Popular" category="popular" items={popular.movies} />
      <Carousel
        title="Top Rated"
        category="top_rated"
        items={topRated.movies}
      />
      <Carousel
        title="Now Playing"
        category="now_playing"
        items={nowPlaying.movies}
      />
    </>
  );
}
