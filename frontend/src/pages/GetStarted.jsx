import { useNavigate } from "react-router-dom";

export default function Welcome() {
    const nav = useNavigate();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-center
        bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] relative overflow-hidden">

            {/* --- Floating Glow Effects --- */}
            <div className="absolute w-72 h-72 bg-blue-600/10 rounded-full blur-[120px] top-20 left-20"></div>
            <div className="absolute w-72 h-72 bg-purple-600/10 rounded-full blur-[120px] bottom-20 right-20"></div>

            {/* --- Title --- */}
            <h1
                className="mb-4 text-5xl font-extrabold text-white drop-shadow-lg animate-fadeIn"
                style={{ animationDelay: "0.1s" }}
            >
                Welcome
            </h1>

            {/* --- Subtitle --- */}
            <p
                className="mb-8 text-lg text-gray-300 animate-fadeIn"
                style={{ animationDelay: "0.3s" }}
            >
                Begin your journey with <span className="font-semibold text-blue-400">MovieReviews</span> 🎬
                <br />
                Discover movies, share thoughts, and connect with others.
            </p>

            {/* --- Floating Icons (Optional Aesthetic) --- */}
            <div className="flex gap-6 mb-10 text-3xl text-white/60 animate-fadeIn"
                style={{ animationDelay: "0.5s" }}
            >
                <span className="transition hover:text-white">🎬</span>
                <span className="transition hover:text-white">⭐</span>
                <span className="transition hover:text-white">🎞️</span>
                <span className="transition hover:text-white">🍿</span>
            </div>

            {/* --- Text Link --- */}
            <span
                onClick={() => nav("/get-started")}

                className="text-xl text-white transition cursor-pointer animate-fadeIn"
                style={{ animationDelay: "0.7s" }}
            >
                Get Started →
            </span>

        </div>
    );
}
