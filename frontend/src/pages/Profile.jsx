import { useEffect, useState } from "react";
import http from "../api/http";

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        http.get("/auth/profile/").then(({ data }) => setProfile(data));

        http.get("/reviews/").then(({ data }) => {
            const all = data.results || data;
            const mine = all.filter(
                (r) => r.user === localStorage.getItem("username")
            );
            setReviews(mine);
        });
    }, []);

    if (!profile) return <div className="text-center py-5 text-light">Loading profile…</div>;

    return (
        <div className="profile-page">

            {/* ✅ Back Button Positioned Left */}
            <div className="d-flex justify-content-start mb-4">
                <button
                    onClick={() => window.history.back()}
                    className="btn btn-outline-light btn-sm"
                >
                    ← Back
                </button>
            </div>

            {/* ✅ Profile Card */}
            <div className="profile-card shadow-lg">
                <div className="avatar">
                    {profile.username[0].toUpperCase()}
                </div>
                <h2 className="username">{profile.username}</h2>
                <p className="email">{profile.email}</p>

                <button
                    className="btn btn-warning btn-sm mt-3"
                    onClick={() => (window.location.href = "/profile/edit")}
                >
                    ✏️ Edit Profile
                </button>
            </div>

            {/* ✅ Reviews Section */}
            <h3 className="reviews-title">My Reviews</h3>

            <div className="reviews-list">
                {reviews.map((r) => (
                    <div key={r.id} className="review-card">
                        <div className="date">
                            {new Date(r.created_at).toLocaleString()}
                        </div>
                        <div className="rating">⭐ {r.rating}</div>
                        <p className="text">{r.text}</p>
                        <div className="reactions">👍 {r.likes} · 👎 {r.dislikes}</div>
                    </div>
                ))}

                {!reviews.length && (
                    <div className="text-center text-light py-5">No reviews yet.</div>
                )}
            </div>
        </div>
    );
}
