export default function ReviewItem({ r, onReact }) {
    const likes = r.reactions?.filter(rt => rt.value === 1).length || 0;
    const dislikes = r.reactions?.filter(rt => rt.value === -1).length || 0;

    return (
        <div className="p-4 card-glass rounded-lg">
            <div className="flex items-center justify-between">
                <div className="text-white font-semibold">{r.user?.username}</div>
                <div className="text-gray-400 text-sm">{new Date(r.created_at).toLocaleString()}</div>
            </div>

            <div className="mt-2 text-yellow-300">⭐ {r.rating}</div>
            <p className="mt-2 text-gray-100">{r.text}</p>

            <div className="mt-4 flex gap-3">
                <button onClick={() => onReact(r.id, "like")} className="px-3 py-1 bg-white/6 rounded">👍 {likes}</button>
                <button onClick={() => onReact(r.id, "dislike")} className="px-3 py-1 bg-white/6 rounded">👎 {dislikes}</button>
            </div>
        </div>
    );
}
