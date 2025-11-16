import { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../api/http";

export default function Register() {
    const nav = useNavigate();
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [msg, setMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("");

        if (!form.username || !form.email || !form.password) {
            setMsg("All fields are required.");
            return;
        }

        try {
            await http.post("/auth/register/", form);
            setMsg("Account created successfully!");

            setTimeout(() => nav("/login"), 800);
        } catch {
            setMsg("Registration failed. Try again.");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center 
                        bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4">

            <div className="w-full max-w-md text-center">

                <h2 className="mb-8 text-3xl font-bold text-white">
                    Create Account
                </h2>

                {msg && (
                    <div className="p-2 mb-4 text-center text-white rounded bg-black/20">
                        {msg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* USERNAME */}
                    <input
                        type="text"
                        placeholder="Username"
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                        className="w-full px-4 py-3 text-black bg-white rounded-lg shadow-md outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* EMAIL */}
                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 text-black bg-white rounded-lg shadow-md outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* PASSWORD */}
                    <input
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="w-full px-4 py-3 text-black bg-white rounded-lg shadow-md outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="w-full py-3 font-semibold text-white transition-all bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700"
                    >
                        Register
                    </button>

                </form>

                <p className="mt-4 text-gray-300">
                    Already have an account?{" "}
                    <span
                        className="text-blue-400 cursor-pointer"
                        onClick={() => nav("/login")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}
