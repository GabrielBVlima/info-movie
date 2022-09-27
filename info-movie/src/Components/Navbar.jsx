import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import { MdLocalMovies } from "react-icons/md";

import "../Styles/Navbar.css";

const Navbar = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) return;
        navigate(`/search?q=${search}`);
        setSearch("");
    };

    return (
        <nav id="navbar">
            <h2>
                <Link to="/">
                    <MdLocalMovies />
                    InfoMovie
                </Link>
            </h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Pesquisar filme"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
                <button type="submit">
                    <BiSearchAlt2 />
                </button>
            </form>
        </nav>
    );
};

export default Navbar;
