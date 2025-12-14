import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import { useEffect, useState } from "react";

import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import type { MoviesHttpResponse } from "../../services/movieService";

import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import css from "./App.module.css";

function App() {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const { data, isLoading, isError, isSuccess } = useQuery<MoviesHttpResponse>({
    queryKey: ["movies", search, page],
    queryFn: () => fetchMovies(search as string, page),
    enabled: search !== "",
    placeholderData: keepPreviousData,
  });

  const handleSearch = (query: string) => {
    setSearch(query);
    setPage(1);
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    openModal();
  };

  useEffect(() => {
    if (isSuccess && data && data.results.length === 0) {
      toast.error("Sorry, the movie was not found.");
    }
  }, [isSuccess, data]);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}

      {isError && <ErrorMessage />}

      {isSuccess && data && data.results.length > 0 && (
        <>
          <ReactPaginate
            pageCount={data.total_pages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={page - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
          />
          <MovieGrid movies={data.results} onSelect={handleSelect} />
        </>
      )}

      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}

      <Toaster />
    </>
  );
}

export default App;
