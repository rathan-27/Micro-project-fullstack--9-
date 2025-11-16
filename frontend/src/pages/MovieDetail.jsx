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

    const loadMovie = useCallback(async () => {
        try {
            const { data } = await http.get(`/movies/${id}/`);
            setMovie(data);
        } catch (err) {
            console.log(err);
        }
    }, [id]);

    useEffect(() => { loadMovie(); }, [loadMovie]);

    const submitReview = async () => {
        if (!authed) return alert("Please login to post a review.");
        if (!text.trim()) return alert("Review cannot be empty.");
        try {
            await http.post(`/reviews/`, { movie: Number(id), text, rating: Number(rating) });
            setText(""); setRating(5); loadMovie();
        } catch (err) {
            console.log(err); alert("Failed to post review.");
        }
    };

    const reactTo = async (rid, type) => {
        if (!authed) return alert("Please login to react.");
        try {
            await http.post(`/reviews/${rid}/react/`, { value: type === "like" ? 1 : -1 });
            loadMovie();
        } catch (err) { console.log(err); }
    };

    if (!movie) return <div className="text-center text-white py-20">Loading…</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <button onClick={() => nav(-1)} className="px-3 py-2 text-white border rounded">← Go Back</button>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <img src={movie.poster_url || "/placeholder.png"} alt={movie.title} className="w-full rounded shadow-lg" />
                </div>

                <div className="md:col-span-2">
                    <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
                    <p className="text-gray-300 mt-1">{movie.release_year}</p>
                    <p className="text-gray-200 mt-4">{movie.description}</p>

                    <div className="mt-4 flex items-center gap-3">
                        <div className="px-3 py-1 bg-yellow-400 text-black rounded">⭐ {Number(movie.avg_rating || 0).toFixed(1)}</div>
                        {movie.genres?.map(g => <div key={g.id} className="px-2 py-0.5 bg-cyan-600 rounded text-xs text-white">{g.name}</div>)}
                    </div>

                    <div className="mt-6">
                        <h4 className="text-lg text-white mb-2">Add a Review</h4>
                        <div className="flex gap-2">
                            <select value={rating} onChange={e => setRating(e.target.value)} className="px-3 py-2 rounded bg-white/10 text-white">
                                {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} ⭐</option>)}
                            </select>
                            <input value={text} onChange={e => setText(e.target.value)} placeholder="Write a review..."
                                className="flex-1 px-3 py-2 rounded bg-white/5 text-white" />
                            <button onClick={submitReview} className="px-4 py-2 bg-primary text-white rounded">Post</button>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h4 className="text-xl text-white mb-4">Reviews</h4>
                        <div className="flex flex-col gap-4">
                            {movie.reviews?.length ? movie.reviews.map(r => (
                                <ReviewItem key={r.id} r={r} onReact={reactTo} />
                            )) : <div className="text-gray-400">No reviews yet.</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
