export default function ReviewItem({ r, onReact }) {
    return (
        <div className="border rounded p-3">
            <div className="small text-muted">
                {r.user?.username} · {new Date(r.created_at).toLocaleString()}
            </div>
            <div className="fw-semibold mt-1">Rating: {r.rating} ⭐</div>
            <p className="mb-2">{r.text}</p>
            <div className="d-flex gap-2">
                <button onClick={() => onReact(r.id, "like")} className="btn btn-sm btn-outline-success">
                    👍 {r.likes}
                </button>
                <button onClick={() => onReact(r.id, "dislike")} className="btn btn-sm btn-outline-secondary">
                    👎 {r.dislikes}
                </button>
            </div>
        </div>
    );
}
