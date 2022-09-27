import { Link } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import { MdLocalMovies } from "react-icons/md";

import "../Styles/Navbar.css";

const Navbar = () => {
    return (
        <nav id="navbar">
            <h2>
                <Link to="/">
                    <MdLocalMovies />
                    InfoMovie
                </Link>
            </h2>
            <form>
                <input type="text" placeholder="Pesquisar filme" />
                <button type="submit">
                    <BiSearchAlt2 />
                </button>
            </form>
        </nav>
    );
};

export default Navbar;
