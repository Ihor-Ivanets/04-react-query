import css from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";

interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}

function MovieGrid({ onSelect, movies }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((mov) => (
        <li key={mov.id} onClick={() => onSelect(mov)}>
          <div className={css.card}>
            <img
              className={css.image}
              src={`https://image.tmdb.org/t/p/w500${mov.poster_path}`}
              alt={mov.title}
              loading="lazy"
            />
            <h2 className={css.title}>{mov.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MovieGrid;
