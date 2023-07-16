import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Movie from '../pages/Movie'
import Home from '../pages/Home'
import NotFoundPage from '../pages/NotFoundPage'

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/movie/:id" element={<Movie />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Router>
	);
}
export default App;
