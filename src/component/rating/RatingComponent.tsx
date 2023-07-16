
import { useEffect, useRef } from 'react';
import { resolveTypeReferenceDirective } from 'typescript';
import styles from './rating.module.css'
const RatingComponent: React.FC<any|void> = ({ rate }) => {
    const rateRef = useRef(null);

    useEffect(()=>{
        if(rateRef.current){
            const progress = Math.floor(rate * 36) + 'deg';
 
           document.documentElement.style.setProperty("--progress-",progress)
        }
    },[rate])
	return (
		<div className={styles.container}>
			<div
			ref={rateRef}
				className={styles.proressBg}
			>
				<p className={styles.progressTxt}>{rate}</p>
			</div>
			{/* <input
				type="number"
				placeholder="Enter the progress value"
				max="10"
				value={rate}
			/> */}
		</div>
	);
};
export default RatingComponent;