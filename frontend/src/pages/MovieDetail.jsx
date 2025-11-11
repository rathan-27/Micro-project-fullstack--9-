import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import http from "../api/http";
import ReviewItem from "../components/ReviewItem";

export default function MovieDetail() {
    const { id } = useParams();
    const nav = useNavigate();
    const [movie, setMovie] = useState(null);
    const [text, setText] = useState("");
    const [rating, setRating] = useState(5);

    const authed = !!localStorage.getItem("access");

    const load = useCallback(async () => {
        try {
            const { data } = await http.get(`/movies/${id}/`);
            setMovie(data);
        } catch (err) {
            console.log("Load movie error:", err);
        }
    }, [id]);

    useEffect(() => {
        load();
    }, [load]);

    const submitReview = async () => {
        if (!authed) return alert("Please login to post a review.");
        if (!text.trim()) return;

        try {
            await http.post(`/reviews/`, {
                movie: id,
                text,
                rating: Number(rating),
            });

            setText("");
            setRating(5);
            load();
        } catch (err) {
            console.log("Review post error:", err);
            alert("Failed to post review. Make sure you are logged in.");
        }
    };

    const reactTo = async (rid, type) => {
        if (!authed) return alert("Please login to react to a review.");

        try {
            await http.post(`/reviews/${rid}/${type}/`);
            load();
        } catch (err) {
            console.log(err);
        }
    };

    if (!movie) return <div className="text-center py-5 movie-detail-container">Loading…</div>;

    return (
        <div className="movie-detail-container container py-4">

            {/* ✅ Go Back Positioned Center */}
            <div className="text-center mb-3">
                <button onClick={() => nav(-1)} className="btn btn-outline-light px-4">
                    ← Go Back
                </button>
            </div>

            <div className="row g-4">
                <div className="col-md-4 d-flex justify-content-center">
                    {movie.poster_url ? (
                        <img
                            src={movie.poster_url}
                            className="img-fluid rounded shadow"
                            alt={movie.title}
                        />
                    ) : (
                        <div className="rounded bg-secondary-subtle" style={{ height: 380 }} />
                    )}
                </div>

                <div className="col-md-8">

                    <h2 className="mb-1 fw-bold">{movie.title}</h2>
                    <div className="mb-2 opacity-75">{movie.release_year}</div>
                    <p className="fs-5">{movie.description}</p>

                    <div className="mb-2">
                        <span className="badge bg-warning text-dark fs-6 px-3 py-2">
                            ⭐ {Number(movie.avg_rating || 0).toFixed(1)}
                        </span>
                    </div>

                    <div className="mb-3">
                        {movie.genres?.map((g) => (
                            <span key={g.id} className="badge bg-light text-dark me-2 px-3 py-2">
                                {g.name}
                            </span>
                        ))}
                    </div>

                    <hr className="border-light" />

                    <h5 className="mb-2">Add a Review</h5>

                    <div className="row g-2 align-items-center">
                        <div className="col-auto">
                            <select
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                className="form-select"
                            >
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <option key={n} value={n}>
                                        {n} ⭐
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col">
                            <input
                                className="form-control"
                                placeholder="Share your thoughts…"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>

                        <div className="col-auto">
                            <button onClick={submitReview} className="btn btn-primary">
                                Post
                            </button>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h5 className="mb-2">Reviews</h5>
                        <div className="d-flex flex-column gap-3">
                            {(movie.reviews || []).map((r) => (
                                <ReviewItem key={r.id} r={r} onReact={reactTo} />
                            ))}
                            {!movie.reviews?.length && (
                                <div className="opacity-75">No reviews yet.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
