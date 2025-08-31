import React from "react";
import Carousel from "../components/Carousel";
import Banner from "../components/Banner";
import { useInitialData } from "../common/hooks/useInitialData";
import { fetchCategory, TMDBMovie } from "../service/api";
import Loading from "../common/components/Loading";

// TODO GESTIONAR ERROR
// TODO GESTIONAR MEDIA QUERIES
// TODO GESTIONAR CONTEXT DONDE VENGA LOS ERRORS Y LOADINGS
// TODO Hover en botones
// TODO Mover interface a archivo externo

type HomeData = {
  categories?: {
    popular: TMDBMovie[];
    top_rated: TMDBMovie[];
    now_playing: TMDBMovie[];
  };
};

export default function Home() {
  const initial = useInitialData<HomeData>();
  const [data, setData] = React.useState<HomeData["categories"] | null>(
    initial.categories || null
  );

  React.useEffect(() => {
    if (!data) {
      Promise.all([
        fetchCategory("popular"),
        fetchCategory("top_rated"),
        fetchCategory("now_playing"),
      ]).then(([popular, top_rated, now_playing]) =>
        setData({ popular, top_rated, now_playing })
      );
    }
  }, []);

  if (!data) return <Loading />;

  return (
    <>
      <div className="hero">
        <Banner items={data.popular.slice(0, 5)} category="popular" />
      </div>

      <Carousel title="Popular" category="popular" items={data.popular} />
      <Carousel title="Top Rated" category="top_rated" items={data.top_rated} />
      <Carousel
        title="Now Playing"
        category="now_playing"
        items={data.now_playing}
      />
    </>
  );
}
