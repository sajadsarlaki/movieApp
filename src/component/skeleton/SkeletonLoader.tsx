import React from "react";
import styles from "./skeletonLoader.module.css"
const SkeletonLoader = () => {
	return (
		<div className={styles.skeletonWrapper}>
			<div className={styles.skeletonTitle}></div>
			<div className={styles.skeletonDetails}></div>
			<div className={styles.skeletonImage}></div>
		</div>
	);
};

export default SkeletonLoader;
