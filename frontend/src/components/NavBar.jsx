import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <Link className="navbar-brand" to="/">
                🎬 MovieReviews
            </Link>

            <div className="collapse navbar-collapse justify-content-end">
                {!token ? (
                    <>
                        <Link className="btn btn-outline-light me-2" to="/login">
                            Login
                        </Link>
                        <Link className="btn btn-primary" to="/register">
                            Register
                        </Link>
                    </>
                ) : (
                    <>
                        <Link className="btn btn-outline-light me-2" to="/profile">
                            Profile
                        </Link>
                        <button className="btn btn-danger" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
