import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
    return (
        <div className="card h-100 shadow-sm">
            {movie.poster_url ? (
                <img src={movie.poster_url} className="card-img-top" alt={movie.title} style={{ height: 260, objectFit: "cover" }} />
            ) : (
                <div className="bg-secondary-subtle" style={{ height: 260 }} />
            )}
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{movie.title}</h5>
                <div className="text-muted small mb-2">{movie.release_year}</div>
                <div className="mt-auto d-flex align-items-center justify-content-between">
                    <span className="badge text-bg-warning">⭐ {Number(movie.avg_rating || 0).toFixed(1)}</span>
                    <Link to={`/movie/${movie.id}`} className="btn btn-sm btn-primary">Details</Link>
                </div>
            </div>
        </div>
    );
}
