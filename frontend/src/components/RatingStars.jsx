export default function RatingStars({ value = 0, size = 18 }) {
    const filledStars = Math.floor(value);
    const hasHalf = value % 1 >= 0.5;
    const emptyStars = 5 - filledStars - (hasHalf ? 1 : 0);

    return (
        <span
            aria-label={`rating ${value.toFixed(1)} out of 5`}
            style={{ fontSize: size, color: "#ffcc00" }}
        >
            {/* Full Stars */}
            {Array(filledStars)
                .fill(0)
                .map((_, i) => (
                    <span key={`full-${i}`}>★</span>
                ))}

            {/* Half Star */}
            {hasHalf && <span key="half">⯨</span>}

            {/* Empty Stars */}
            {Array(emptyStars)
                .fill(0)
                .map((_, i) => (
                    <span key={`empty-${i}`}>☆</span>
                ))}
        </span>
    );
}
