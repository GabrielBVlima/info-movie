import { useState, useEffect } from "react";
import MovieCard from "../Components/MovieCard";

import "../Styles/Home.css";

const apiURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
    const [topMovies, setTopMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(undefined);
    const [count, setCount] = useState(1);

    const getTopMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();

        console.log(res);

        setTopMovies(data.results);
        setTotalPages(data.total_pages);
    };

    const nextPage = () => {
        console.log(count, totalPages);
        if (count < totalPages) {
            setCount(count + 1);
        }
    };

    const backPage = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    useEffect(() => {
        const topRateUrl = `${apiURL}top_rated?${apiKey}&language=pt-BR&page=${count}`;

        localStorage.clear();
        localStorage.setItem("ultimaUrl", topRateUrl);

        getTopMovies(topRateUrl);
    }, [count]);

    return (
        <div className="container">
            <h2 className="title">Os Filmes Mais Bem Avaliados</h2>
            <div className="buttons">
                <button className="back_and_next" onClick={backPage}>
                    Página Anterior
                </button>
                <button className="back_and_next" onClick={nextPage}>
                    Proxima Página
                </button>
            </div>

            <div className="movies_container">
                {topMovies.length === 0 && <p>Carregando, por favor aguarde...</p>}
                {topMovies.length > 0 &&
                    topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
            <div className="buttons_down">
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

export default Home;
