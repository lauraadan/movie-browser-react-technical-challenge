import React, { FC } from "react";
import Carousel from "../../components/Carousel/Carousel";
import Banner from "../../components/Banner/Banner";
import Loading from "../../components/Loading/Loading";
import { useMovies } from "../../hooks/useMovies/useMovies";
import Error from "../../components/Error/Error";

// GESTIONAR MEDIA QUERIES
// BOTONES HOVER

const Home: FC = () => {
  const popular = useMovies("popular");
  const topRated = useMovies("top_rated");
  const nowPlaying = useMovies("now_playing");

  const loading = popular.loading || topRated.loading || nowPlaying.loading;
  const error = popular.error || topRated.error || nowPlaying.error;

  if (loading) return <Loading />;
  if (error) return <Error />;

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
};

export default Home;
