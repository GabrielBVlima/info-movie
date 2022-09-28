import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../Components/MovieCard";
import "../Styles/Home.css";

const apiSearchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
    const [searchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const query = searchParams.get("q");

    const getSearchedMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();

        setMovies(data.results);
        console.log(data);
    };

    useEffect(() => {
        const searchWithQueryURL = `${apiSearchURL}?${apiKey}&query=${query}&language=pt-BR`;

        getSearchedMovies(searchWithQueryURL);
    }, [query]);

    return (
        <div className="container">
            <h2 className="title">
                Resultados para <span className="query_text">{query}</span>
            </h2>
            <div className="movies_container">
                {movies.length === 0 && <p>Carregando, aguarde...</p>}
                {movies.length > 0 &&
                    movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </div>
    );
};

export default Search;
