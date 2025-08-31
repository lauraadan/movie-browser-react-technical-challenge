import React from "react";
import { TMDBMovie, IMG } from "../service/api";
import { Link } from "react-router-dom";

type Props = {
  items: TMDBMovie[];
  category: string;
};

export default function Banner({ items, category }: Props) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const length = items.length;

  // Auto-scroll
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % length);
    }, 4000);
    return () => clearInterval(interval);
  }, [length]);

  if (!items || items.length === 0) return null;

  const currentMovie = items[currentIndex];

  return (
    <Link
      to={`/movie/${currentMovie.id}?cat=${category}`}
      className="hero__carousel-item"
    >
      <img
        src={IMG.backdrop(currentMovie.backdrop_path, "w780")}
        alt={currentMovie.title}
      />
      <div className="hero__text">
        <h1>{currentMovie.title}</h1>
        <p>{currentMovie.overview}</p>
      </div>
    </Link>
  );
}
