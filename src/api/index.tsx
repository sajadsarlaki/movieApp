import axios, { AxiosRequestConfig } from "axios";
import { Movie, MoviePage, Ratings } from "../models/movie";

const API_HOST = "https://moviesdatabase.p.rapidapi.com";
const API_KEY = "b7be69dfc3mshd4902f9ba61ec88p1bd0d8jsncfb3fd547613";

axios.defaults.baseURL = API_HOST;
axios.defaults.headers.common["X-RapidAPI-Key"] = API_KEY;
axios.defaults.headers.common["X-RapidAPI-Host"] = API_HOST;

export const searchForMovies = async (
	title: string,
	page: number,
	limit: number
) => {
	const options = {
		method: "GET",
		url: `https://moviesdatabase.p.rapidapi.com/titles/search/title/${title}`,
		params: {
			page: page.toString(),
			limit: limit.toString(),
			titleType: "movie",
		},
		headers: {
			"X-RapidAPI-Key": "b7be69dfc3mshd4902f9ba61ec88p1bd0d8jsncfb3fd547613",
			"X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
		},
	};

	try {
		const response = await axios.request<MoviePage>(options);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getMovie = async (id: string | undefined): Promise<Movie> => {
	if (!id) {
		throw new Error("Invalid movie ID");
	}
	const endpoint = `/titles/${id}`;
	const options: AxiosRequestConfig = {
		method: "GET",
		url: endpoint,
		params: { titleType: "movie" },
		headers: {
			"X-RapidAPI-Key": "b7be69dfc3mshd4902f9ba61ec88p1bd0d8jsncfb3fd547613",
			"X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
		},
	};

	try {
		const response = await axios.request(options);
		const movie: Movie = response.data.results;
		return movie;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getRatings = async (id: string | undefined): Promise<Ratings> => {
	if (!id) {
		throw new Error("Invalid movie ID");
	}

	const endpoint = `/titles/${id}/ratings`;
	const options: AxiosRequestConfig = {
		method: "GET",
		url: endpoint,
		headers: {
			"X-RapidAPI-Key": "b7be69dfc3mshd4902f9ba61ec88p1bd0d8jsncfb3fd547613",
			"X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
		},
	};

	try {
		const response = await axios.request(options);
        const ratings:Ratings = response.data.results;
		return ratings;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getCrew = async (id: string | undefined) => {
	if (!id) {
		throw new Error("Invalid movie ID");
	}

	const endpoint = `/titles/${id}/crew`;
	const options: AxiosRequestConfig = {
		method: "GET",
		url: endpoint,
		headers: {
			"X-RapidAPI-Key": "b7be69dfc3mshd4902f9ba61ec88p1bd0d8jsncfb3fd547613",
			"X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
		},
	};

	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getMainActors = async (id: string | undefined) => {
	if (!id) {
		throw new Error("Invalid movie ID");
	}

	const endpoint = `/titles/${id}/main_actors`;
	const options: AxiosRequestConfig = {
		method: "GET",
		url: endpoint,
		headers: {
			"X-RapidAPI-Key": "b7be69dfc3mshd4902f9ba61ec88p1bd0d8jsncfb3fd547613",
			"X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
		},
	};

	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getUpcomingMovies = async (
	page: number,
	limit: number) => {
		const endpoint = "/titles/x/upcoming";
		const options = {
			method: "GET",
			url: endpoint,
			params: {
				page: page.toString(),
				limit: limit.toString(),
				titleType: "movie",
			},
			headers: {
				"X-RapidAPI-Key": "b7be69dfc3mshd4902f9ba61ec88p1bd0d8jsncfb3fd547613",
				"X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
			},
			
		};

		try {
			const response = await axios.request<MoviePage>(options);
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
