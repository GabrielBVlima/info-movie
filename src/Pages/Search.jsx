import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../Components/MovieCard";
import "../Styles/Home.css";
import "../Styles/Search.css";

const apiSearchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
    const [searchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(undefined);
    const [count, setCount] = useState(1);
    const query = searchParams.get("q");

    const getSearchedMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();

        setMovies(data.results);
        setTotalPages(data.total_pages);

        console.log(data.total_pages);
    };

    const nextPage = () => {
        for (let i = 1; i < totalPages; i++) {
            setCount(count + 1);
        }
        console.log(count);
    };

    const backPage = () => {
        for (let i = count; i > 1; i--) {
            setCount(count - 1);
        }
        console.log(count);
    };

    useEffect(() => {
        const searchWithQueryURL = `${apiSearchURL}?${apiKey}&query=${query}&language=pt-BR&page=${count}`;

        getSearchedMovies(searchWithQueryURL);
    }, [query, count]);

    return (
        <div className="container">
            <h2 className="title">
                Resultados para <span className="query_text">{query}</span>
            </h2>
            <div className="buttons">
                <button className="back_and_next" onClick={backPage}>
                    Página Anterior
                </button>
                <button className="back_and_next" onClick={nextPage}>
                    Proxima Pagina
                </button>
            </div>
            <div className="movies_container">
                {movies.length === 0 && <p>Carregando, aguarde...</p>}
                {movies.length > 0 &&
                    movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
            <div className="buttons_search">
                <button className="back_and_next" onClick={backPage}>
                    Página Anterior
                </button>
                <button className="back_and_next" onClick={nextPage}>
                    Proxima Pagina
                </button>
            </div>
        </div>
    );
};

export default Search;
