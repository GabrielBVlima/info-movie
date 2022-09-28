import { useState, useEffect } from "react";
import MovieCard from "../Components/MovieCard";

import "../Styles/Home.css";

const apiURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
    const [topMovies, setTopMovies] = useState([]);

    const getTopMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();

        setTopMovies(data.results);
        console.log(data);
    };

    useEffect(() => {
        const topRateUrl = `${apiURL}top_rated?${apiKey}&language=pt-BR`;

        getTopMovies(topRateUrl);
    }, []);

    return (
        <div className="container">
            <h2 className="title">Os Filmes Mais Bem Avaliados</h2>
            <div className="movies_container">
                {topMovies.length === 0 && <p>Carregando, por favor aguarde...</p>}
                {topMovies.length > 0 &&
                    topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </div>
    );
};

export default Home;
