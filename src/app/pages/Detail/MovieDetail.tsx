import React, { FC, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import { IMG } from "../../service/api";
import { useMovieDetail } from "../../hooks/useMovies/useMovies";
import { useWishlist } from "../../hooks/useWishlist/useWishlist";
import Loading from "../../components/Loading/Loading";
import BackToHome from "../../components/BackToHome/BackToHome";
import Error from "../../components/Error/Error";
import NotFound from "../NotFound/NotFound";
import { TMDBMovie } from "../../../types/interfaces";

const normalizeCategory = (str: string) =>
  str
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");

const formatCategoryLabel = (str: string) =>
  str.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const MovieDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { movie, loading, error } = useMovieDetail(Number(id));
  const { add, remove, has } = useWishlist();

  const location = useLocation();

  const { categoryKey, categoryLabel } = useMemo(() => {
    const searchParams =
      typeof window !== "undefined"
        ? new URLSearchParams(location.search)
        : null;
    const catRaw = searchParams?.get("cat") || "general";
    return {
      categoryKey: normalizeCategory(catRaw),
      categoryLabel: formatCategoryLabel(catRaw),
    };
  }, [location.search]);

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!movie) return <NotFound />;

  const isFav = has(movie.id);

  console.log(categoryKey);

  const handleToggleWishlist = () => {
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
    <div className={`detail category--${categoryKey}`}>
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
          <span className="detail__badge">{categoryLabel}</span>
          <p className="detail__overview">{movie.overview}</p>

          <div className="detail__actions">
            <button
              className={
                isFav
                  ? "btn--wishlist-secondary btn"
                  : "btn btn--wishlist-primary"
              }
              onClick={handleToggleWishlist}
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
