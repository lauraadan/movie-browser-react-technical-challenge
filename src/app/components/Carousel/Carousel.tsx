import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { IMG } from "../../service/api";
import { CarouselProps } from "../../../types/interfaces";

export default function Carousel({ title, category, items }: CarouselProps) {
  const ref = useRef<HTMLDivElement>(null);

  const scrollBy = (dx: number) =>
    ref.current?.scrollBy({ left: dx, behavior: "smooth" });

  return (
    <section className="carousel">
      <div className="carousel__header">
        <h2 className="carousel__title">{title}</h2>
      </div>
      <div className="carousel__wrapper">
        <div className="carousel__gradient carousel__gradient--left"></div>
        <div className="carousel__scroller" ref={ref}>
          {items.map((m) => (
            <Link
              key={m.id}
              to={`/movie/${m.id}?cat=${category}`}
              className="movie"
            >
              <img
                loading="lazy"
                src={IMG.poster(m.poster_path ?? null, "w342")}
                alt={m.title}
              />
              <div className="movie__overlay">
                <span className="movie__title">{m.title}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="carousel__gradient carousel__gradient--right"></div>
        <button
          className="carousel__arrow carousel__arrow--left"
          onClick={() => scrollBy(-300)}
          aria-label="Scroll left"
        >
          <span className="material-icons">chevron_left</span>
        </button>
        <button
          className="carousel__arrow carousel__arrow--right"
          onClick={() => scrollBy(300)}
          aria-label="Scroll right"
        >
          <span className="material-icons">chevron_right</span>
        </button>
      </div>
    </section>
  );
}
