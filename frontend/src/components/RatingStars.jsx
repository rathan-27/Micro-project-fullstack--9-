export default function RatingStars({ value = 0 }) {
    const v = Math.round(value);
    return (
        <span aria-label={`rating ${v} of 5`}>
            {[1, 2, 3, 4, 5].map(n => (
                <span key={n}>{n <= v ? "★" : "☆"}</span>
            ))}
        </span>
    );
}
