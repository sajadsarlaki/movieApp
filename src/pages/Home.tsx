import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Movie, MoviePage } from "../models/movie"; // replace with path to your model file
import { searchForMovies, getUpcomingMovies } from "../api";
import MoviePreviewSkeleton from "../component/skeleton/moviePreviewSkeleton/MoviePreviewSkeleton";
import MoviePreview from "../component/moviePreview/MoviePreview";
import styles from "./home.module.css";

const SearchPage: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [movies, setMovies] = useState<Movie[]>([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [isFetchingMore, setIsFetchingMore] = useState(false);

	const fetchMovies = useCallback(async (term: string, pg: number) => {
		setIsLoading(true);
		try {
			const moviesData: MoviePage =
				term === ""
					? await getUpcomingMovies(pg, 7)
					: await searchForMovies(term, pg, 7);
			setMovies(moviesData.results);
			setPage(pg);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const fetchMoreMovies = useCallback(async () => {
		setIsFetchingMore(true);
		try {
			const nextPage = page + 1;
			const moreMoviesData: MoviePage =
				searchTerm === ""
					? await getUpcomingMovies(nextPage, 7)
					: await searchForMovies(searchTerm, nextPage, 7);

			setMovies((prevMovies) => [...prevMovies, ...moreMoviesData.results]);
			setPage(nextPage);
		} catch (error) {
			console.error(error);
		} finally {
			setIsFetchingMore(false);
		}
	}, [searchTerm, page]);

	useEffect(() => {
		fetchMovies("", 1);
	}, [fetchMovies]);

	const handleSearch = () => {
		fetchMovies(searchTerm, 1);
	};

	return (
		<div className={styles.container}>
			<div className={styles.searchArea}>
				<h2>Welcome.</h2>
				<h3>Millions of Movies to discover. Explore More</h3>
				<div className={styles.inputSection}>
					<input
						className={styles.input}
						type="text"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="Search for a movie"
					/>

					<button className={styles.searchBtn} onClick={handleSearch}>
						Search
					</button>
				</div>
			</div>

			<div className={styles.mainContent}>
				<div className={styles.list}>
					{isLoading &&
						Array.from({ length: 7 }).map((_, index) => (
							<div key={index}>
								<MoviePreviewSkeleton />
							</div>
						))}
					{!isLoading &&
						movies.map((movie) => (
							<div key={movie.id}>
								<MoviePreview movie={movie} />
							</div>
						))}
					{isFetchingMore &&
						Array.from({ length: 7 }).map((_, index) => (
							<div key={index}>
								<MoviePreviewSkeleton />
							</div>
						))}
				</div>
				<button onClick={fetchMoreMovies}>Load More</button>
			</div>
		</div>
	);
};

export default SearchPage;
