import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./index.css";

import Navbar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";

import GetStarted from "./pages/GetStarted";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import GetStartedChoices from "./pages/GetStartedChoices";


function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

function Layout({ children }) {
  const location = useLocation();

  // ❌ Hide navbar on these public pages
  const hideNavbarRoutes = ["/login", "/register", "/profile", "/profile/edit", "/", "/welcome"];

  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}

      {/* ⭐ Floating stars background */}
      <div className="stars">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animationDelay: Math.random() * 2 + "s",
            }}
          ></div>
        ))}
      </div>

      <div className="min-h-screen">{children}</div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* Public pages */}
        <Route
          path="/"
          element={
            <Layout>
              <GetStarted />
            </Layout>
          }
        />

        <Route path="/get-started" element={
          <Layout>
            <GetStartedChoices />
          </Layout>
        } />


        <Route
          path="/welcome"
          element={
            <Layout>
              <Welcome />
            </Layout>
          }
        />

        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />

        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />

        {/* Protected pages */}
        <Route
          path="/movies"
          element={
            <Layout>
              <ProtectedRoute>
                <MovieList />
              </ProtectedRoute>
            </Layout>
          }
        />

        <Route
          path="/movie/:id"
          element={
            <Layout>
              <ProtectedRoute>
                <MovieDetail />
              </ProtectedRoute>
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout>
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            </Layout>
          }
        />

        <Route
          path="/profile/edit"
          element={
            <Layout>
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
