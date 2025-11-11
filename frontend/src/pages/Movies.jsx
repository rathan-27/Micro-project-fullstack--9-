import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import http from "../api/http";
import MovieCard from "../components/MovieCard";

export default function Movies() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();
    const [q, setQ] = useState(searchParams.get("q") || "");
    const [genre, setGenre] = useState(searchParams.get("genre") || "");

    const loadMovies = useCallback(async () => {
        setLoading(true);

        const params = new URLSearchParams();
        if (q) params.set("q", q);
        if (genre) params.set("genre", genre);

        try {
            const { data } = await http.get(`/movies/?${params.toString()}`);
            setItems(data.results || data);
        } catch (error) {
            console.log("Error loading movies:", error);
        }

        setLoading(false);
    }, [q, genre]);

    useEffect(() => {
        loadMovies();
    }, [loadMovies]);

    useEffect(() => {
        const sp = new URLSearchParams();
        if (q) sp.set("q", q);
        if (genre) sp.set("genre", genre);
        setSearchParams(sp);
    }, [q, genre, setSearchParams]);

    return (
        <div className="container py-4">   {/* ✅ Center page layout */}
            <div className="bg-white border rounded p-3 mb-3">
                <div className="row g-2">
                    <div className="col-md-5">
                        <input
                            className="form-control"
                            placeholder="Search movies..."
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            className="form-control"
                            placeholder="Genre (e.g., Action)"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3 d-grid">
                        <button onClick={loadMovies} className="btn btn-primary">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-5">Loading…</div>
            ) : (
                <div className="row g-3">
                    {items.map((m) => (
                        <div key={m.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <MovieCard movie={m} />
                        </div>
                    ))}
                    {!items.length && (
                        <div className="text-center py-5 text-muted">No movies found.</div>
                    )}
                </div>
            )}
        </div>
    );
}
