import React from "react";
import styles from "./skeletonLoader.module.css";

const SkeletonLoader = () => {
	return (
		<div className={styles.skeletonContainer}>
			<div className={styles.skeletonBackground}>
				<div className={styles.skeletonContent}>
					<div className={styles.skeletonMovieImage}></div>
					<div className={styles.skeletonDetails}>
						<div className={styles.skeletonTitle}></div>
						<div className={styles.skeletonRating}></div>
						<div className={styles.skeletonVotes}></div>
						<div className={styles.skeletonCrew}></div>
						<div className={styles.skeletonActors}></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SkeletonLoader;
