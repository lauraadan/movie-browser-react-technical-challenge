import React from "react";

import { useParams, useSearchParams } from "react-router-dom";
import { IMG, fetchMovie, TMDBMovie } from "../service/api";
import { useInitialData } from "../common/hooks/useInitialData";
import { useWishlist } from "../common/hooks/useWishlist";
import Loading from "../common/components/Loading";
import BackToHome from "../common/components/BackToHome";

export default function MovieDetail() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const cat = params.get("cat") || "popular";
  const initial = useInitialData<{ movie?: TMDBMovie; category?: string }>();
  const [movie, setMovie] = React.useState<TMDBMovie | null>(
    initial.movie || null
  );
  const { add, remove, has } = useWishlist();

  React.useEffect(() => {
    if (!movie && id) {
      fetchMovie(id).then(setMovie);
    }
  }, [id]);

  if (!movie) return <Loading />;

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
      });
    }
  };

  return (
    <div className="detail">
      <BackToHome />
      <div className="detail__banner">
        <img
          src={IMG.backdrop(movie.backdrop_path, "w1280")}
          alt={movie.title}
        />
      </div>

      <div className="detail__content">
        <img
          className="detail__poster"
          src={IMG.poster(movie.poster_path, "w342")}
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
                  : " btn btn--wishlist-primary"
              }
              onClick={handleToggle}
            >
              <span className="material-symbols-outlined">favorite</span>
              {isFav ? "Remove from wishlist" : "Add to wishlist"}
            </button>
          </div>
          <div className="detail__info">
            <span>Rating: {movie.vote_average.toFixed(1)}</span>
            <span>Release: {movie.release_date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
