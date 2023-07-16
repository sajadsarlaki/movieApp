import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../models/movie"; // replace with path to your model file
import { getMovie } from "../api";

const MoviePage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
    console.log(id)
	const [movie, setMovie] = useState<Movie | null>(null);

	useEffect(() => {
		const fetchMovie = async () => {
			const movieData: Movie = await getMovie(id);
			setMovie(movieData);
		};

		fetchMovie();
	}, [id]);

	if (!movie) {
		return <h2>Loading...</h2>;
	}

	return (
		<div>
			<h2>{movie.titleText ? movie.titleText.text : "Title Not Available"}</h2>
			<p>{`${movie.titleType ? movie.titleType.text : "Type Not Available"} 
          - ${
						movie.releaseYear ? movie.releaseYear.year : "Year Not Available"
					}`}</p>
			<img
				src={movie.primaryImage ? movie.primaryImage.url : "default.jpg"}
				alt={movie.titleText ? movie.titleText.text : "Image Not Available"}
				width={100}
				height={100}
                // width={movie.primaryImage ? movie.primaryImage.width : 100}
				// height={movie.primaryImage ? movie.primaryImage.height : 100}
			/>
		</div>
	);
};

export default MoviePage;
