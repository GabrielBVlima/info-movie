import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    BsGraphUp,
    BsWallet2,
    BsHourglassSplit,
    BsFillFileEarmarkTextFill,
    BsCalendarCheckFill,
    BsCameraReelsFill,
} from "react-icons/bs";
import "../Styles/Movie.css";
import { FaStar } from "react-icons/fa";

const apiURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const imageURL = import.meta.env.VITE_IMG;

const Movie = () => {
    const { id } = useParams();
    const [genres, setGenres] = useState([]);
    const [movie, setMovie] = useState(null);

    const getMovie = async (url) => {
        const res = await fetch(url);
        const data = await res.json();

        setMovie(data);
    };

    const formatCurrency = (number) => {
        return number.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    };

    const genreMovie = async (url) => {
        const res = await fetch(url);
        const data = await res.json();

        setGenres(data.genres);
    };

    useEffect(() => {
        const movieUrl = `${apiURL}${id}?${apiKey}&language=pt-BR`;
        const genres = `https://api.themoviedb.org/3/genre/movie/list?${apiKey}&language=pt-BR`;

        genreMovie(genres);
        getMovie(movieUrl);
    }, []);

    return (
        <div className="movie_page">
            {movie && (
                <div className="desktop_view">
                    <div className="row_one">
                        <div className="column_one">
                            <div className="movie_card">
                                <img src={imageURL + movie.poster_path} alt={movie.title} />
                            </div>
                        </div>
                        <div className="column_two">
                            <div className="header">
                                <h2>{movie.title}</h2>
                                <p className="tagline">{movie.tagline}</p>
                            </div>
                            <div className="info_division">
                                <div className="column_info_one">
                                    <div className="info">
                                        <h3>
                                            <BsCameraReelsFill /> Genero:
                                        </h3>
                                        <p>
                                            {movie.genres &&
                                                movie.genres.map((g) => `${g.name} / `)}
                                        </p>
                                    </div>
                                    <div className="info">
                                        <h3>
                                            <FaStar /> Nota do Publico:
                                        </h3>
                                        <p>{movie.vote_average}</p>
                                    </div>
                                    <div className="info">
                                        <h3>
                                            <BsCalendarCheckFill /> Lan??amento:
                                        </h3>
                                        <p>
                                            {formatCurrency(
                                                movie.release_date.split("-").reverse().join("/")
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="column_info_two">
                                    <div className="info">
                                        <h3>
                                            <BsWallet2 /> Or??amento:
                                        </h3>
                                        <p>{formatCurrency(movie.budget)}</p>
                                    </div>
                                    <div className="info">
                                        <h3>
                                            <BsGraphUp /> Faturamento:
                                        </h3>
                                        <p>{formatCurrency(movie.revenue)}</p>
                                    </div>
                                    <div className="info">
                                        <h3>
                                            <BsHourglassSplit /> Dura????o:
                                        </h3>
                                        <p>{movie.runtime} minutos</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row_two">
                        <div className="info description">
                            <h3>
                                <BsFillFileEarmarkTextFill /> Descri????o:
                            </h3>
                            <p>{movie.overview}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Movie;
