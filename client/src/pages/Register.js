import { useState } from "react";
import API from "../api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");

  const registerUser = async () => {
    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      alert("Registered Successfully 🚀");
      window.location.href = "/";
    } catch (error) {
      console.log("REGISTER ERROR:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Register Failed");
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
        maxWidth: "450px", 
        padding: "40px",
        textAlign: "center"
      }}>
        <div style={{ marginBottom: "30px" }}>
          <h1 style={{ color: "var(--primary)", fontSize: "2.5rem", marginBottom: "8px" }}>Join AgriRental</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Create an account to start renting or listing tools.</p>
        </div>

        <div style={{ marginBottom: "15px", textAlign: "left" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", fontSize: "0.9rem" }}>Full Name</label>
          <input
            placeholder="John Doe"
            className="modern-input"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "15px", textAlign: "left" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", fontSize: "0.9rem" }}>Email Address</label>
          <input
            type="email"
            placeholder="john@example.com"
            className="modern-input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "15px", textAlign: "left" }}>
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

        <div style={{ marginBottom: "25px", textAlign: "left" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", fontSize: "0.9rem" }}>I am a...</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            className="modern-input"
            style={{ appearance: "none", backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23636e72%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')", backgroundRepeat: "no-repeat", backgroundPosition: "right 15px center", backgroundSize: "15px" }}
          >
            <option value="user">User (Farmer who rents)</option>
            <option value="owner">Owner (Farmer who owns tools)</option>
          </select>
        </div>

        <button 
          onClick={registerUser} 
          className="premium-btn"
          style={{ width: "100%", marginBottom: "20px" }}
        >
          Create Account
        </button>

        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
          Already have an account?{" "}
          <a href="/" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: "600" }}>
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}