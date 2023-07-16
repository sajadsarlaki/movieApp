interface Markdown {
	plainText: string;
	__typename: string;
}

interface Image {
	id: string;
	width: number;
	height: number;
	url: string;
	caption: Markdown;
	__typename: string;
}

interface TitleType {
	text: string;
	id: string;
	isSeries: boolean;
	isEpisode: boolean;
	__typename: string;
}

interface TitleText {
	text: string;
	__typename: string;
}

interface YearRange {
	year: number;
	endYear: number | null;
	__typename: string;
}

interface ReleaseDate {
	day: number;
	month: number;
	year: number;
	__typename: string;
}

export interface Movie {
	_id: string;
	id: string;
	primaryImage: Image;
	titleType: TitleType;
	titleText: TitleText;
	originalTitleText: TitleText;
	releaseYear: YearRange;
	releaseDate: ReleaseDate;
}

export interface MoviePage {
	page: number;
	next: string | null;
	entries: number;
	results: Movie[];
}

export interface Ratings {
	tconst: string;
	averageRating: number;
	numVotes: number;
}