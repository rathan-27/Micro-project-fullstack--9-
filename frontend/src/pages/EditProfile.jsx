import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import http from "../api/http";

export default function EditProfile() {
  const nav = useNavigate();
  const [form, setForm] = useState({ username: "", email: "" });

  useEffect(() => {
    http.get("/auth/profile/").then(({ data }) => {
      setForm({ username: data.username, email: data.email });
    });
  }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      await http.put("/auth/profile/", form);
      alert("Profile updated ✅");
      nav("/profile");
    } catch {
      alert("Failed to update profile ❌");
    }
  };

  return (
    <div className="page-center">
      <div className="form-box">

        {/* ✅ BACK BUTTON */}
        <button
          className="btn btn-outline-light mb-3"
          onClick={() => nav(-1)}
        >
          ← Back
        </button>

        <h3 className="text-white text-center mb-3">Edit Profile</h3>

        <form onSubmit={save} className="d-flex flex-column gap-3">
          <input
            className="form-control"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <input
            className="form-control"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <button className="btn btn-primary w-100">Save Changes</button>
        </form>
      </div>
    </div>
  );
}
