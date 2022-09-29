import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import ProjectRoutes from "./Routes/routes";

function App() {
    return (
        <div className="App">
            <Navbar />
            <ProjectRoutes />
            <Outlet />
        </div>
    );
}

export default App;
