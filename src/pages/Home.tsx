import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Movie, MoviePage } from "../models/movie"; // replace with path to your model file
import { searchForMovies } from "../api";

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
		<div>
			<input
				type="text"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder="Search for a movie"
			/>

			<button onClick={fetchMovies}>Search</button>

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr 1fr",
					gridTemplateRows: "1fr 1fr 1fr",
					gap: "1rem",
					overflow: "scroll",
				}}
			>
				{movies.map(
					(
						movie: Movie // Type the movie parameter using the Movie type
					) => (
						<Link key={movie._id} to={`/movie/${movie.id}`}>
							<div style={{ border: "1px solid" }}>
								<h2>{movie.titleText.text}</h2>
								<p>{`${movie.titleType.text} - ${
									movie.releaseYear
										? movie.releaseYear.year
										: "Year not specified"
								}`}</p>
								<img
									src={
										movie.primaryImage ? movie.primaryImage.url : "default.jpg"
									}
									alt={movie.titleText.text}
									width={100}
									height={100}
								/>
								<p>
									{`${movie.releaseDate?.day}/ 
										${movie.releaseDate?.month}/
										${movie.releaseDate?.year}`}
								</p>
							</div>
						</Link>
					)
				)}
			</div>
			<button onClick={fetchMoreMovies}>Load More</button>
		</div>
	);
};

export default SearchPage;
