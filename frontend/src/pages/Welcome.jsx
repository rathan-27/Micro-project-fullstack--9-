import { useNavigate } from "react-router-dom";

export default function Welcome() {
    const nav = useNavigate();

    return (
        <div className="page-center">
            <div
                style={{
                    width: "380px",
                    background: "rgba(255,255,255,0.12)",
                    padding: "35px",
                    borderRadius: "14px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    backdropFilter: "blur(18px)",
                    textAlign: "center",
                    color: "white",
                }}
            >
                <h2 className="mb-3">Welcome to MovieReviews 🎬</h2>

                <p className="mb-4">
                    Login or Register to explore movies, reviews, and more!
                </p>

                <button
                    className="btn btn-primary w-100 mb-3"
                    onClick={() => nav("/login")}
                >
                    Login
                </button>

                <button
                    className="btn btn-outline-light w-100"
                    onClick={() => nav("/register")}
                >
                    Register
                </button>
            </div>
        </div>
    );
}
