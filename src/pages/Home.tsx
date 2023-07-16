import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie, MoviePage } from '../models/movie';  // replace with path to your model file
import { searchForMovies } from '../api';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);  // Type the movies state using the Movie array type

  const fetchMovies = async () => {
    try {
      const moviesData: MoviePage = await searchForMovies(searchTerm);  // Type the API response using the MoviePage type
      setMovies(moviesData.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
		<div>
			<input
				type="text"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder="Search for a movie"
			/>

			<button onClick={fetchMovies}>Search</button>

			<div>
				{movies.map(
					(
						movie: Movie // Type the movie parameter using the Movie type
					) => (
						<Link key={movie._id} to={`/movie/${movie.id}`}>
							<div>
								<h2>{movie.titleText.text}</h2>
								<h3>{movie.originalTitleText.text}</h3>
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
									width={movie.primaryImage ? movie.primaryImage.width : 100}
									height={movie.primaryImage ? movie.primaryImage.height : 100}
								/>
							</div>
						</Link>
					)
				)}
			</div>
		</div>
	);
};

export default SearchPage;
