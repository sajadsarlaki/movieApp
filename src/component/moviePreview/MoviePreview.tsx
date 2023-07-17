import React from "react";
import { Link } from "react-router-dom";
import { Movie } from "../../models/movie"; // replace with path to your model file
import styles from "./moviePreview.module.css";
import SkeletonLoader from "../../component/skeleton/SkeletonLoader";

interface MoviePreviewProps {
	movie: Movie;
}

const MoviePreview: React.FC<MoviePreviewProps> = ({ movie }) => {
	// if (!movie) {
	// 	return <SkeletonLoader />;
	// }

	const {day, month, year} = movie.releaseDate || 0;
	return (
		<Link to={`/movie/${movie.id}`}>
			<div className={styles.moviePreview}>
				<img
					src={
						movie.primaryImage
							? movie.primaryImage.url
							: "/assets/imgs/Movie-Placeholder.jpg"
					}
					alt={movie.titleText.text}
					className={styles.poster}
					width={300}
					height={300}
				/>
				<h2 className={styles.title}>{movie.originalTitleText.text}</h2>
				<p className={styles.releaseYear}>{day&& day +"/"}{month && month + "/"}{year}</p>
			</div>
		</Link>
	);
};

export default MoviePreview;
