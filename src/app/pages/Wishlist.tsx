import { IMG, TMDBMovie } from "../service/api";
import { useInitialData } from "../common/hooks/useInitialData";
import { useWishlist } from "../common/hooks/useWishlist";
import Loading from "../common/components/Loading";

export default function Wishlist() {
  const initial = useInitialData<{ wishlist?: TMDBMovie[] }>();
  const { list, remove } = useWishlist();

  const items = list.length ? list : initial.wishlist || [];
  if (!list) return <Loading />;
  return (
    <>
      <h1>Wishlist</h1>
      {items.length === 0 && <p className="muted">Your wishlist is empty.</p>}
      <div className="wishlist">
        {items.map((m) => (
          <div key={m.id} className="wishlist__item">
            <img src={IMG.poster(m.poster_path, "w185")} alt={m.title} />
            <div className="wishlist__meta">
              <strong className="wishlist__title">{m.title}</strong>

              <button
                className="btn--wishlist-secondary btn"
                onClick={() => remove(m.id)}
              >
                Remove from wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
