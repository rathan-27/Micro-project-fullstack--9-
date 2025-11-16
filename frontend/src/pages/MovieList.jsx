import { useEffect, useState } from "react";
import http from "../api/http";
import { Link } from "react-router-dom";

export default function MovieList() {
    const [movies, setMovies] = useState([]);
    const [q, setQ] = useState("");
    const [genre, setGenre] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => { loadMovies(); }, []); // eslint-disable-line

    const loadMovies = async () => {
        setLoading(true);
        try {
            const { data } = await http.get("/movies/", { params: { q, genre } });
            setMovies(data.results || data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex gap-3 mb-6">
                <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search movies..."
                    className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/6 text-white" />
                <input value={genre} onChange={e => setGenre(e.target.value)} placeholder="Genre (e.g., Action)"
                    className="w-64 px-4 py-3 rounded-lg bg-white/5 border border-white/6 text-white" />
                <button onClick={loadMovies} className="px-5 py-3 bg-primary rounded-lg text-white">Search</button>
            </div>

            {loading ? (
                <div className="text-center text-white/80 py-20">Loading…</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {movies.map(movie => (
                        <div key={movie.id} className="card-glass rounded-lg overflow-hidden shadow-sm animate-fadeIn">
                            <img src={movie.poster_url || "/placeholder.png"} alt={movie.title} className="w-full h-72 object-cover" />
                            <div className="p-4">
                                <h3 className="movie-title text-lg">{movie.title}</h3>
                                <p className="movie-meta">{movie.release_year}</p>
                                <div className="mt-3 flex items-center justify-between">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-yellow-400 text-black font-semibold">
                                        ⭐ {movie.avg_rating ? movie.avg_rating.toFixed(1) : "0.0"}
                                    </div>
                                    <Link to={`/movie/${movie.id}`} className="px-3 py-1 bg-primary text-white rounded">Details</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
