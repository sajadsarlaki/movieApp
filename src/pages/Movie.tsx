import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie, Ratings } from "../models/movie"; // replace with path to your model file
import { getMovie, getRatings, getCrew, getMainActors } from "../api";

const MoviePage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [movie, setMovie] = useState<Movie | null>(null);
	const [ratings, setRatings] = useState<Ratings | null>(null);
	const [crew, setCrew] = useState<any>(null);
	const [mainActors, setMainActors] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			const movieData: Movie = await getMovie(id);
			setMovie(movieData);

			const ratingsData = await getRatings(id);
			setRatings(ratingsData);

			// const crewData = await getCrew(id);
			// setCrew(crewData);

			// const mainActorsData = await getMainActors(id);
			// setMainActors(mainActorsData);
		};

		fetchData();
	}, [id]);

	if (!movie) {
		return <h2>Loading...</h2>;
	}

	return (
		<div>
			<h2>{movie.titleText ? movie.titleText.text : "Title Not Available"}</h2>
			<p>
				{`${movie.titleType ? movie.titleType.text : "Type Not Available"} - ${
					movie.releaseYear ? movie.releaseYear.year : "Year Not Available"
				}`}
			</p>
			<img
				src={movie.primaryImage ? movie.primaryImage.url : "default.jpg"}
				alt={movie.titleText ? movie.titleText.text : "Image Not Available"}
				width={100}
				height={100}
			/>
			<h3>Ratings:</h3>
			{ratings &&
				ratings.numVotes}
			<h3>Crew:</h3>
			{crew && crew}
			<h3>Main Actors:</h3>
			{mainActors &&
				mainActors}
		</div>
	);
};

export default MoviePage;
