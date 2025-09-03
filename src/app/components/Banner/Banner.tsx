import React, { useState, useEffect } from "react";
import { IMG } from "../../service/api";
import { TMDBMovie, BannerProps } from "../../../types/interfaces";
import { Link } from "react-router-dom";

export default function Banner({ items, category }: BannerProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const length = items.length;

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % length);
    }, 5000);
    return () => clearInterval(interval);
  }, [length]);

  if (!items.length) return null;

  const currentMovie: TMDBMovie = items[currentIndex];

  return (
    <Link
      to={`/movie/${currentMovie.id}?cat=${category}`}
      className="hero__carousel-item"
    >
      <img
        src={IMG.backdrop(currentMovie.backdrop_path ?? null, "w780")}
        alt={currentMovie.title}
      />
      <div className="hero__text">
        <h1>{currentMovie.title}</h1>
        <p>{currentMovie.overview ?? ""}</p>
      </div>
    </Link>
  );
}
