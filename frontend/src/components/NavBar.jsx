import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
    const nav = useNavigate();

    const token = localStorage.getItem("access");
    const username = localStorage.getItem("username")


    const logout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("username");
        nav("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-2 shadow-sm">
            <Link to="/" className="navbar-brand fw-bold">
                🎬 MovieReviews
            </Link>

            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navmenu"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navmenu">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Movies</Link>
                    </li>

                    {/* ✅ Profile link only if logged in */}
                    {token && (
                        <li className="nav-item">
                            <Link to="/profile" className="nav-link">Profile</Link>
                        </li>
                    )}
                </ul>

                {/* ✅ Right side controls */}
                {token ? (
                    <div className="d-flex align-items-center gap-3">
                        <span className="text-white">👋 {username}</span>
                        <button className="btn btn-outline-light btn-sm" onClick={logout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="d-flex gap-2">
                        <Link to="/login" className="btn btn-outline-light btn-sm">Login</Link>
                        <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
