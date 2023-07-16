import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie, Ratings } from "../models/movie"; // replace with path to your model file
import { getMovie, getRatings, getCrew, getMainActors } from "../api";
import styles from "./movie.module.css";
import RatingComponent from "../component/rating/RatingComponent";


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
		<div className={styles.container}>
			<div
				className={styles.mainBackground}
				style={{
					backgroundImage: `url(${
						movie.primaryImage ? movie.primaryImage.url : "default.jpg"
					})`,
				}}
			>
				<div className={styles.mainContent}>
					<img
						className={styles.movieImage}
						src={
							movie.primaryImage
								? movie.primaryImage.url
								: "/assets/imgs/Movie-Placeholder.jpg"
						}
						alt={movie.titleText ? movie.titleText.text : "Image Not Available"}
						style={{
							aspectRatio: `${
								movie.primaryImage?.width / movie.primaryImage?.height
							}`,
						}}
					/>
					<div className={styles.data}>
						<h2>
							{movie.titleText ? movie.titleText.text : "Title Not Available"} (
							{movie.releaseYear.year})
						</h2>
						{/* <p>
							{`${
								movie.titleType ? movie.titleType.text : "Type Not Available"
							} - ${
								movie.releaseYear
									? movie.releaseYear.year
									: "Year Not Available"
							}`}
						</p> */}
						<RatingComponent rate={ratings?.averageRating || 0} />
						<br />
						<h3 className={styles.inline}>Out of:</h3>{" "}
						{ratings?.numVotes || 0 } vote
						<br />
						<h3 className={styles.inline}>Crew:</h3>
						<span>{crew ? crew.join("-") : " not mentioned!"}</span> <br />
						<h3 className={styles.inline}>
							Main Actors:{" "}
						</h3>
						{mainActors ? mainActors.join("-") : "not mentioned!"}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MoviePage;
