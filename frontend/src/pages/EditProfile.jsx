import { useEffect, useState } from "react";
import http from "../api/http";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
    const nav = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [msg, setMsg] = useState("");

    useEffect(() => {
        http.get("/auth/profile/")
            .then(({ data }) => {
                setForm({
                    username: data.username,
                    email: data.email,
                    password: "",
                });
            })
            .catch(() => setMsg("Failed to load profile."));
    }, []);

    const handleSave = async () => {
        setMsg("");

        try {
            await http.put("/auth/profile/", {
                username: form.username,
                email: form.email,
                password: form.password || undefined,
            });

            setMsg("Profile updated successfully!");

            // Reset password field
            setForm({ ...form, password: "" });

            // Redirect after success
            setTimeout(() => {
                nav("/profile");
            }, 800);
        } catch {
            setMsg("Update failed. Try again.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 
            bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">

            {/* Back Button */}
            <button
                onClick={() => nav(-1)}
                className="absolute inline-flex items-center gap-2 px-4 py-2 text-white top-24 left-10 backdrop-blur-md"
            >
                ← Go Back
            </button>

            {/* Page Title */}
            <h2 className="mb-2 text-4xl font-semibold text-white">
                Edit Profile
            </h2>

            <p className="mb-8 text-gray-300">
                Update your account details below
            </p>

            {/* Success/Error message */}
            {msg && (
                <div className="px-4 py-2 mb-4 text-white rounded bg-black/30">
                    {msg}
                </div>
            )}

            {/* Centered Form */}
            <div className="w-full max-w-xl space-y-4">

                {/* Username */}
                <div>
                    <label className="text-sm text-gray-300">Username</label>
                    <input
                        type="text"
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                        className="w-full px-4 py-3 mt-1 text-white rounded-lg outline-none bg-white/10 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="text-sm text-gray-300">Email</label>
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 mt-1 text-white rounded-lg outline-none bg-white/10 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="text-sm text-gray-300">
                        New Password <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Leave blank to keep same"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="w-full px-4 py-3 mt-1 text-white placeholder-gray-400 rounded-lg outline-none bg-white/10 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Save Button */}
                <button
                    onClick={handleSave}
                    className="w-full py-3 mt-4 font-semibold text-white transition-all bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-blue-500/40"
                >
                    Save Changes
                </button>
            </div>

        </div>
    );
}
