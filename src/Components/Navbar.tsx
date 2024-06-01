import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <header className="header">
            <NavLink
                to="/"
                className="font-bold shadow-md w-10 h-10 rounded-lg bg-white flex justify-center items-center"
            >
                <p className="blue-gradient_text">AH</p>
            </NavLink>
            <nav className="flex text-lg gap-7 font-medium">
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        isActive ? "text-blue-500" : "text-black"
                    }
                >
                    About
                </NavLink>
                <NavLink
                    to="/projects"
                    className={({ isActive }) =>
                        isActive ? "text-blue-500" : "text-black"
                    }
                >
                    Projects
                </NavLink>
            </nav>
        </header>
    );
}

export default Navbar;
