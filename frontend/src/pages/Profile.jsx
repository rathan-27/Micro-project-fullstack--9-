import { useEffect, useState } from "react";
import http from "../api/http";
import { useNavigate, Link } from "react-router-dom";

export default function Profile() {
    const nav = useNavigate();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        http.get("/auth/profile/")
            .then(({ data }) => {
                setProfile(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center 
                bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
                <div className="text-xl text-white">Loading...</div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white">
                Failed to load profile.
            </div>
        );
    }

    return (
        <div className="min-h-screen px-4 py-20 
            bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">

            {/* Go Back Button */}
            <button
                onClick={() => nav(-1)}
                className="inline-flex items-center gap-2 px-4 py-2 mb-10 ml-2 text-white backdrop-blur-md"
            >
                ← Go Back
            </button>

            {/* Profile Header */}
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-white">Your Profile</h1>
                <p className="mt-2 text-gray-300">Manage your account & reviews</p>
            </div>

            {/* Profile Card */}
            <div className="max-w-3xl p-8 mx-auto border shadow-lg bg-white/10 backdrop-blur-xl rounded-2xl border-white/20">

                {/* Avatar */}
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-20 h-20 text-3xl font-bold text-white bg-blue-600 rounded-full">
                        {profile.username[0].toUpperCase()}
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold text-white">
                        {profile.username}
                    </h2>

                    <p className="text-gray-300">{profile.email}</p>

                    {/* Stats */}
                    <div className="flex gap-10 mt-6 text-center">
                        <div>
                            <h3 className="text-xl font-bold text-white">{profile.reviews_count}</h3>
                            <p className="text-sm text-gray-400">Reviews</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white">{profile.avg_rating_given}</h3>
                            <p className="text-sm text-gray-400">Avg Rating</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white">{profile.joined}</h3>
                            <p className="text-sm text-gray-400">Joined</p>
                        </div>
                    </div>

                    {/* Edit Profile Button */}
                    <button
                        onClick={() => nav("/profile/edit")}
                        className="px-6 py-2 mt-6 text-white"
                    >
                        ✏️ Edit Profile
                    </button>
                </div>
            </div>

            {/* Reviewed Movies */}
            <div className="max-w-4xl mx-auto mt-14">
                <h3 className="mb-4 text-2xl font-semibold text-white">
                    Movies You Reviewed
                </h3>

                {profile.reviewed_movies.length === 0 ? (
                    <p className="text-gray-400">You haven't reviewed any movies yet.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                        {profile.reviewed_movies.map((m) => (
                            <Link
                                to={`/movie/${m.id}`}
                                key={m.id}
                                className="p-4 text-white transition border bg-white/10 backdrop-blur-md rounded-xl border-white/20 hover:bg-white/20"
                            >
                                <img
                                    src={m.poster_url}
                                    alt={m.title}
                                    className="object-cover w-full h-48 rounded-lg"
                                />
                                <h4 className="mt-3 text-lg font-semibold">{m.title}</h4>
                                <p className="text-gray-300">⭐ {m.user_rating}</p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
