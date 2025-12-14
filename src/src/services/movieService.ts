import axios from "axios";
import type { Movie } from "../types/movie";

export interface MoviesHttpResponse {
  results: Movie[];
  total_pages: number;
}

const myKey = import.meta.env.VITE_API_KEY;

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MoviesHttpResponse> => {
  const { data } = await axios.get<MoviesHttpResponse>(
    `https://api.themoviedb.org/3/search/movie`,
    {
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
      params: {
        query,
        page,
      },
    }
  );
  return data;
};
