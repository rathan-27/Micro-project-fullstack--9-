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

    const authed = !!localStorage.getItem("token");

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
            load(); // refresh after posting
        } catch (err) {
            console.log("Review post error:", err);
            alert("Failed to post review. Make sure you are logged in.");
        }
    };

    const reactTo = async (rid, type) => {
        if (!authed) return alert("Please login to react to a review.");

        try {
            await http.post(`/reviews/${rid}/${type}/`);
            load(); // refresh after like/dislike
        } catch (err) {
            console.log(err);
        }
    };

    if (!movie) return <div className="text-center py-5">Loading…</div>;

    return (
        <div className="row g-4 text-white">

            {/* ✅ GO BACK BUTTON ADDED */}
            <button
                onClick={() => nav(-1)}
                className="btn btn-outline-secondary mb-3"
            >
                ← Go Back
            </button>

            <div className="col-md-4">
                {movie.poster_url ? (
                    <img
                        src={movie.poster_url}
                        className="img-fluid rounded shadow-sm"
                        alt={movie.title}
                    />
                ) : (
                    <div className="rounded bg-secondary-subtle" style={{ height: 380 }} />
                )}
            </div>

            <div className="col-md-8">
                <h2 className="mb-1">{movie.title}</h2>
                <div className="text-muted mb-2">{movie.release_year}</div>
                <p>{movie.description}</p>

                <div className="mb-2">
                    <span className="badge text-bg-warning">
                        ⭐ {Number(movie.avg_rating || 0).toFixed(1)}
                    </span>
                </div>

                <div className="mb-3">
                    {movie.genres?.map((g) => (
                        <span key={g.id} className="badge text-bg-light me-2">
                            {g.name}
                        </span>
                    ))}
                </div>

                <hr />

                <h5 className="mb-2">Add a review</h5>

                <div className="row g-2">
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
                            <div className="text-muted">No reviews yet.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
