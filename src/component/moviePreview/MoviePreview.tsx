import React from "react";
import { Link } from "react-router-dom";
import { Movie } from "../../models/movie"; // replace with path to your model file
import styles from "./moviePreview.module.css";
import SkeletonLoader from "../../component/skeleton/SkeletonLoader";

interface MoviePreviewProps {
	movie: Movie;
}

const MoviePreview: React.FC<MoviePreviewProps> = ({ movie }) => {
	if (!movie) {
		return <SkeletonLoader />;
	}

	return (
		<div className={`${styles.moviePreview} ${styles.roundedCard}`}>
			<Link to={`/movie/${movie.id}`}>
				<img
					src={movie.primaryImage?.url}
					alt={movie.titleText.text}
					className={styles.poster}
					width={100}
					height={100}
				/>
				<h2 className={styles.title}>{movie.titleText.text}</h2>
				<p className={styles.releaseYear}>{movie.releaseYear?.year}</p>
			</Link>
		</div>
	);
};

export default MoviePreview;
