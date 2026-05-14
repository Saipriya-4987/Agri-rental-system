import { useState } from "react";
import API from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginUser = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login Success 🚀");

      const role = res.data.user.role;
      if (role === "admin") {
        window.location.href = "/admin-dashboard";
      } else if (role === "owner") {
        window.location.href = "/owner-dashboard";
      } else {
        window.location.href = "/home";
      }
    } catch (error) {
      console.log("LOGIN ERROR:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login Failed ❌");
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      padding: "20px"
    }}>
      <div className="glass-card animate-fade-in" style={{ 
        width: "100%", 
        maxWidth: "400px", 
        padding: "40px",
        textAlign: "center"
      }}>
        <div style={{ marginBottom: "30px" }}>
          <h1 style={{ color: "var(--primary)", fontSize: "2.5rem", marginBottom: "8px" }}>AgriRental</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Welcome back! Please login to your account.</p>
        </div>

        <div style={{ marginBottom: "20px", textAlign: "left" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", fontSize: "0.9rem" }}>Email Address</label>
          <input
            type="email"
            placeholder="name@example.com"
            className="modern-input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "25px", textAlign: "left" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", fontSize: "0.9rem" }}>Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="modern-input"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span 
              onClick={() => setShowPassword(!showPassword)}
              style={{ 
                position: "absolute", 
                right: "15px", 
                top: "50%", 
                transform: "translateY(-50%)", 
                cursor: "pointer",
                fontSize: "1.1rem",
                userSelect: "none"
              }}
            >
              {showPassword ? "👁️" : "🙈"}
            </span>
          </div>
        </div>

        <button 
          onClick={loginUser} 
          className="premium-btn"
          style={{ width: "100%", marginBottom: "20px" }}
        >
          Sign In
        </button>

        <p style={{ marginBottom: "15px", fontSize: "0.9rem" }}>
          <a href="/forgot-password" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: "500" }}>
            Forgot Password?
          </a>
        </p>

        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
          Don't have an account?{" "}
          <a href="/register" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: "600" }}>
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}