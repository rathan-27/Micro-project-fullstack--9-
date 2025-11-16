import { useNavigate } from "react-router-dom";

export default function GetStartedChoices() {
    const nav = useNavigate();

    return (
        <div className="
    min-h-screen 
    flex flex-col justify-center items-center 
    text-center
    bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] 
    relative overflow-hidden
">


            {/* Glow Effects */}
            <div className="absolute w-72 h-72 bg-blue-600/10 rounded-full blur-[120px] top-20 left-20"></div>
            <div className="absolute w-72 h-72 bg-purple-600/10 rounded-full blur-[120px] bottom-20 right-20"></div>

            <p className="mb-8 text-gray-300 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
                Choose an option to continue 🎬
            </p>

            <div className="flex flex-col w-full max-w-xs gap-4 animate-fadeIn"
                style={{ animationDelay: "0.4s" }}
            >
                <button
                    onClick={() => nav("/login")}
                    className="w-full py-3 text-lg text-white transition bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-blue-500/40"
                >
                    Login
                </button>

                <button
                    onClick={() => nav("/register")}
                    className="w-full py-3 text-lg text-white transition border rounded-lg backdrop-blur-md"
                >
                    Register
                </button>
            </div>
        </div>
    );
}
