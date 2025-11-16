import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const token = localStorage.getItem("access");
    const username = localStorage.getItem("username");

    // Pages where we should hide Login/Register
    const hideAuthButtons = ["/", "/welcome", "/get-started"].includes(pathname);

    function handleLogout() {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("username");
        navigate("/login");
    }

    return (
        <header className="w-full border-b bg-black/70 backdrop-blur-sm border-white/5">
            <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 font-bold text-white rounded bg-gradient-to-br from-primary to-accent">
                        🎬
                    </div>
                    <span className="text-lg font-semibold text-white">
                        MovieReviews
                    </span>
                </Link>

                {/* Right Side Buttons */}
                <div className="flex items-center gap-3">

                    {/* If NO token AND not intro page */}
                    {!token && !hideAuthButtons ? (
                        <>
                            <Link
                                to="/login"
                                className="px-3 py-1 text-white border rounded hover:bg-white/5"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="px-3 py-1 text-white rounded bg-primary/95"
                            >
                                Register
                            </Link>
                        </>
                    ) : null}

                    {/* If logged in */}
                    {token ? (
                        <>
                            <span className="mr-2 text-white/90">
                                Hi, {username}
                            </span>

                            <Link
                                to="/profile"
                            >
                                Profile
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="px-3 py-1 text-red-400"
                            >
                                Logout
                            </button>
                        </>
                    ) : null}

                </div>
            </div>
        </header>
    );
}
