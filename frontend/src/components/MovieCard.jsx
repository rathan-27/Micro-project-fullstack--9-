import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
    const img = movie.poster_url || "https://via.placeholder.com/300x450?text=No+Image";

    return (
        <div className="card shadow-sm">
            <img
                src={img}
                className="card-img-top"
                alt={movie.title}
                style={{ height: "350px", objectFit: "cover" }}
            />

            <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="text-muted mb-2">{movie.release_year}</p>

                <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-warning text-dark">⭐ {movie.avg_rating?.toFixed(1) || 0}</span>

                    <Link
                        to={`/movie/${movie.id}`}
                        className="btn btn-primary btn-sm"
                    >
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
