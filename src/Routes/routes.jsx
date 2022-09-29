import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Movie from "../Pages/Movie";
import Search from "../Pages/Search";

const ProjectRoutes = () => {
    return (
        <>
            <Routes>
                <Route>
                    <Route path="/" element={<Home />} />
                    <Route path="movie/:id" element={<Movie />} />
                    <Route path="search/" element={<Search />} />
                </Route>
            </Routes>
        </>
    );
};

export default ProjectRoutes;
