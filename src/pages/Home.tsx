import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Movie, MoviePage } from "../models/movie"; // replace with path to your model file
import { searchForMovies } from "../api";
import SkeletonLoader from "../component/skeleton/SkeletonLoader";
import MoviePreview from "../component/moviePreview/MoviePreview";
import styles from "./home.module.css"

const SearchPage: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [movies, setMovies] = useState<Movie[]>([]);
	const [page, setPage] = useState(1);

	const fetchMovies = useCallback(async () => {
		try {
			const moviesData: MoviePage = await searchForMovies(searchTerm, 1, 5);
			setMovies(moviesData.results);
			setPage(1);
		} catch (error) {
			console.error(error);
		}
	}, [searchTerm]);

	const fetchMoreMovies = useCallback(async () => {
		try {
			const nextPage = page + 1;
			const moreMoviesData: MoviePage = await searchForMovies(
				searchTerm,
				nextPage,
				5
			);
			setMovies((prevMovies) => [...prevMovies, ...moreMoviesData.results]);
			setPage((prevPage) => prevPage + 1);
		} catch (error) {
			console.error(error);
		}
	}, [searchTerm, page]);

	useEffect(() => {
		fetchMovies();
	}, [searchTerm, fetchMovies]);

	return (
		<div className={styles.container}>
			<div className={styles.inputSection}>
				<input
					className={styles.input}
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder="Search for a movie"
				/>

				<button onClick={fetchMovies}>Search</button>
			</div>

			<div className={styles.mainContent}>
				{movies === null
					? Array(9).fill(<SkeletonLoader />)
					: movies.map((movie) => (
							<MoviePreview key={movie._id} movie={movie} />
					  ))}
			</div>
			<button onClick={fetchMoreMovies}>Load More</button>
		</div>
	);
};

export default SearchPage;
