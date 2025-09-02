import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { IMG } from "../service/api";
import { useMovieDetail } from "../common/hooks/useMovies";
import { useWishlist } from "../common/hooks/useWishlist";
import Loading from "../common/components/Loading";
import BackToHome from "../common/components/BackToHome";
import Error from "../common/components/Error";
import NotFound from "./NotFound";
import { TMDBMovie } from "../../types/interfaces";

const MovieDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { movie, loading, error } = useMovieDetail(Number(id));
  const { add, remove, has } = useWishlist();

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!movie) return <NotFound />;

  const isFav = has(movie.id);

  const handleToggle = () => {
    if (isFav) {
      remove(movie.id);
    } else {
      add({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        addedAt: new Date().toISOString(),
      } as TMDBMovie);
    }
  };

  return (
    <div className="detail">
      <BackToHome />

      <div className="detail__banner">
        <img
          src={IMG.backdrop(movie.backdrop_path ?? null, "w1280")}
          alt={movie.title}
        />
      </div>

      <div className="detail__content">
        <img
          className="detail__poster"
          src={IMG.poster(movie.poster_path ?? null, "w342")}
          alt={movie.title}
        />
        <div className="detail__meta">
          <h1 className="detail__title">{movie.title}</h1>
          <p className="detail__overview">{movie.overview}</p>

          <div className="detail__actions">
            <button
              className={
                isFav
                  ? "btn--wishlist-secondary btn"
                  : "btn btn--wishlist-primary"
              }
              onClick={handleToggle}
            >
              <span className="material-symbols-outlined">favorite</span>
              {isFav ? "Remove from wishlist" : "Add to wishlist"}
            </button>
          </div>

          <div className="detail__info">
            <span>Rating: {movie.vote_average?.toFixed(1)}</span>
            <span>Release: {movie.release_date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
