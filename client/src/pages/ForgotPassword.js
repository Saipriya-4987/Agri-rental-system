import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/reset-password", { email, newPassword });
      alert(res.data.message);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Reset failed");
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
          <h1 style={{ color: "var(--primary)", fontSize: "2.2rem", marginBottom: "8px" }}>Reset Password</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Enter your registered email and a new password.</p>
        </div>

        <form onSubmit={handleReset}>
          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", fontSize: "0.9rem" }}>Registered Email</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              required 
              className="modern-input"
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div style={{ marginBottom: "25px", textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", fontSize: "0.9rem" }}>New Password</label>
            <div style={{ position: "relative" }}>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                required 
                className="modern-input"
                onChange={(e) => setNewPassword(e.target.value)} 
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

          <button type="submit" className="premium-btn" style={{ width: "100%", marginBottom: "20px" }}>
            Update Password
          </button>

          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Remember your password?{" "}
            <span onClick={() => navigate("/")} style={{ color: "var(--primary)", cursor: "pointer", fontWeight: "600" }}>
              Back to Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

