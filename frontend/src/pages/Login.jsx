import { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../api/http";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await http.post("/auth/login/", {
                username,
                password,
            });

            const token = response.data.access;
            localStorage.setItem("token", token);

            navigate("/");
        } catch {
            alert("Invalid username or password");
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow" style={{ minWidth: "350px" }}>
                <h3 className="mb-3 text-center">Login</h3>

                <form onSubmit={handleSubmit}>
                    <input
                        className="form-control mb-3"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="btn btn-primary w-100" type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
