import React from "react";
import styles from "./moviePreviewSkeleton.module.css";

const MoviePreviewSkeleton = () => {
	return (
		<div className={styles.moviePreview}>
			<div
				className={styles.poster}
			/>
			<h2 className={styles.title}></h2>
			<p className={styles.releaseYear}>
			</p>
		</div>
	);
};

export default MoviePreviewSkeleton;
