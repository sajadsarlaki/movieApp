import axios, { AxiosRequestConfig } from "axios";
import {Movie} from "../models/movie"

const API_HOST = "https://moviesdatabase.p.rapidapi.com";
const API_KEY = "b7be69dfc3mshd4902f9ba61ec88p1bd0d8jsncfb3fd547613";

axios.defaults.baseURL = API_HOST;
axios.defaults.headers.common["X-RapidAPI-Key"] = API_KEY;
axios.defaults.headers.common["X-RapidAPI-Host"] = API_HOST;

export const searchForMovies = async (title: string) => {
	const endpoint = `/titles/search/title/${title}`;
	const options: AxiosRequestConfig = {
		method: "GET",
        url:endpoint,
		params: { titleType: "movie" },
		headers: {
			"X-RapidAPI-Key": "b7be69dfc3mshd4902f9ba61ec88p1bd0d8jsncfb3fd547613",
			"X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
		},
	};

	try {
		const response = await axios.request(options);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getMovie = async (id: string | undefined): Promise<Movie> => {
	

  if (!id) {
    throw new Error('Invalid movie ID');
  }const endpoint = `/titles/${id}`;
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
        const movie:Movie = response.data.results;
		return movie;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
