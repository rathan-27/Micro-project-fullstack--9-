import { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../api/http";

export default function Login() {
    const nav = useNavigate();
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const { data } = await http.post("/auth/login/", form);

            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            localStorage.setItem("username", form.username);

            nav("/");
        } catch {
            setError("Invalid username or password.");
        }
    };

    return (
        <div className="page-center">
            <div className="form-box">
                <h3 className="mb-3 text-white text-center">Login</h3>

                {error && <div className="alert alert-danger py-2">{error}</div>}

                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                    />

                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />

                    <button className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    );
}
