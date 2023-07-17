import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Movie, MoviePage } from "../models/movie"; // replace with path to your model file
import { searchForMovies, getUpcomingMovies } from "../api";
import SkeletonLoader from "../component/skeleton/SkeletonLoader";
import MoviePreview from "../component/moviePreview/MoviePreview";
import styles from "./home.module.css";

const SearchPage: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [movies, setMovies] = useState<Movie[]>([]);
	const [page, setPage] = useState(1);

	const fetchMovies = useCallback(async (term:string, pg:number) => {
		try {
			const moviesData: MoviePage = term === "" ? await getUpcomingMovies(pg + 3,7) : await searchForMovies(term, pg, 7);
			setMovies(moviesData.results);
			setPage(pg);
		} catch (error) {
			console.error(error);
		}
	}, []);

	const fetchMoreMovies = useCallback(async () => {
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
		}
	}, [searchTerm, page]);

	useEffect(() => {
		fetchMovies("", 1);
	}, [fetchMovies]);

	return (
		<div className={styles.container}>
			<div className={styles.searchArea}>
				<h2>Welcome.</h2>
				<h3> Millions of Movies to discover. Explore More</h3>
				<div className={styles.inputSection}>
					<input
						className={styles.input}
						type="text"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="Search for a movie"
					/>

					<button
						className={styles.searchBtn}
						onClick={() => fetchMovies(searchTerm, 1)}
					>
						Search
					</button>
				</div>
			</div>

			<div className={styles.mainContent}>
				<div className={styles.list}>
					{movies.length === 0
						? Array(9).fill(<SkeletonLoader />)
						: movies.map((movie) => (
								<MoviePreview key={movie.id} movie={movie} />
						  ))}
				</div>
			<button onClick={fetchMoreMovies}>Load More</button>
			</div>
		</div>
	);
};

export default SearchPage;
