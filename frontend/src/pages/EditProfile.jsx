import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import http from "../api/http";

export default function EditProfile() {
    const nav = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        http.get("/auth/profile/").then(({ data }) => {
            setUsername(data.username);
            setEmail(data.email);
        });
    }, []);

    const saveChanges = async () => {
        try {
            await http.put("/auth/profile/", {
                username,
                email,
                password: password || undefined,
            });

            localStorage.setItem("username", username);
            alert("✅ Profile Updated Successfully!");
            nav("/profile");
        } catch (err) {
            alert("❌ Update Failed");
            console.log(err);
        }
    };

    return (
        <div className="profile-page d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <div className="profile-card shadow-lg" style={{ maxWidth: 420 }}>

                {/* ✅ Back Button */}
                <button className="btn btn-outline-light btn-sm mb-3" onClick={() => nav("/profile")}>
                    ← Back
                </button>

                <h3 className="text-center mb-3 text-light">Edit Profile</h3>

                <div className="form-group mb-3">
                    <label className="form-label text-light">Username</label>
                    <input
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="form-group mb-3">
                    <label className="form-label text-light">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group mb-4">
                    <label className="form-label text-light">New Password (optional)</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Leave blank to keep same"
                    />
                </div>

                <button className="btn btn-warning w-100" onClick={saveChanges}>
                    ✅ Save Changes
                </button>
            </div>
        </div>
    );
}
