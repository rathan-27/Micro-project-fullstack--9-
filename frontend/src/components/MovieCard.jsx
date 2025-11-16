import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";

export default function MovieCard({ movie }) {
    const img =
        movie.poster_url ||
        "https://via.placeholder.com/400x600?text=No+Image";

    return (
        <div className="movie-card shadow-sm">
            <img
                src={img}
                alt={movie.title}
            />

            <div className="px-3 py-2 d-flex flex-column">
                <h5 className="text-white">{movie.title}</h5>

                <p className="text-light small mb-2">
                    {movie.release_year}
                </p>

                {/* Rating */}
                <span className="rating-badge mb-2">
                    ⭐ {movie.avg_rating ? movie.avg_rating.toFixed(1) : "0.0"}
                </span>

                {/* OR use star icons */}
                <RatingStars value={movie.avg_rating || 0} size={18} />

                {/* Button */}
                <Link
                    to={`/movie/${movie.id}`}
                    className="btn btn-primary btn-sm mt-3"
                >
                    Details
                </Link>
            </div>
        </div>
    );
}
