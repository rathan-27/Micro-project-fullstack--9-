import { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../api/http";
import CenterLayout from "../layouts/CenterLayout";


export default function Register() {
    const nav = useNavigate();
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        try {
            await http.post("/register/", form);
            alert("Registered Successfully! Please Login.");
            nav("/login");
        } catch {
            setErrorMsg("Registration failed. Try a different username.");
        }
    };

    return (
        <div className="page-center">
            <div className="form-box">
                <h3 className="text-white text-center mb-3">Register</h3>

                {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">

                    <input className="form-control" placeholder="Username"
                        value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />

                    <input className="form-control" placeholder="Email"
                        value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />

                    <input type="password" className="form-control" placeholder="Password"
                        value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />

                    <button className="btn btn-primary w-100">Register</button>
                </form>
            </div>
        </div>
    );
}
