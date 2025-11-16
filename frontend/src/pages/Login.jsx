import { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../api/http";

export default function Login() {
    const nav = useNavigate();
    const [form, setForm] = useState({ username: "", password: "" });
    const [msg, setMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); setMsg("");
        if (!form.username || !form.password) { setMsg("Username and password required"); return; }
        try {
            const { data } = await http.post("/auth/login/", { username: form.username, password: form.password });
            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            localStorage.setItem("username", data.username || form.username);
            nav("/movies");
        } catch { setMsg("Invalid username or password"); }
    };

    return (
        <div className="page-center">
            <div className="w-full max-w-md p-8 rounded-lg card-glass animate-fadeIn">
                <h3 className="mb-4 text-2xl font-semibold text-center">Login</h3>
                {msg && <div className="p-2 mb-3 text-white rounded bg-red-600/60">{msg}</div>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })}
                        className="px-4 py-3 text-black rounded bg-white/6" />
                    <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                        className="px-4 py-3 text-black rounded bg-white/6" />
                    <button type="submit" className="px-4 py-3 mt-2 text-white rounded bg-primary">Login</button>
                </form>
                <p className="mt-4 text-center text-gray-400">Don’t have an account? <span className="cursor-pointer text-cyan-300" onClick={() => nav("/register")}>Register</span></p>
            </div>
        </div>
    );
}
