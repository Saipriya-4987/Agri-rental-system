import { useEffect, useState } from "react";
import API from "../api";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [tools, setTools] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const uRes = await API.get("/auth/users");
      const tRes = await API.get("/tools");
      const bRes = await API.get("/bookings/all");
      setUsers(uRes.data);
      setTools(tRes.data);
      setBookings(bRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#1a1a1a", color: "#e0e0e0" }}>
      {/* Admin Navbar */}
      <nav style={{ 
        padding: "15px 40px", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        background: "rgba(30, 30, 30, 0.8)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000
      }}>
        <h1 style={{ color: "var(--accent)", fontSize: "1.6rem", margin: 0 }}>Admin Dashboard <span style={{ fontSize: "0.9rem", color: "#888", fontWeight: "normal" }}>System Monitor</span></h1>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="premium-btn premium-btn-danger"
          style={{ padding: "8px 20px", textTransform: "none", fontSize: "0.85rem" }}
        >
          Logout
        </button>
      </nav>

      <main style={{ padding: "40px" }} className="animate-fade-in">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "25px" }}>
          
          {/* Users Section */}
          <section className="glass-card" style={{ background: "rgba(40, 40, 40, 0.6)", padding: "25px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              Users <span style={{ background: "var(--primary)", padding: "2px 10px", borderRadius: "10px", fontSize: "0.8rem" }}>{users.length}</span>
            </h2>
            <div style={{ maxHeight: "500px", overflowY: "auto", paddingRight: "10px" }}>
              {users.map(u => (
                <div key={u._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "12px 0" }}>
                  <p style={{ fontWeight: "600", fontSize: "1rem" }}>{u.name}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "5px" }}>
                    <span style={{ fontSize: "0.8rem", color: "#888" }}>{u.email}</span>
                    <span style={{ 
                      fontSize: "0.7rem", 
                      padding: "2px 8px", 
                      borderRadius: "10px", 
                      background: u.role === "admin" ? "#d63031" : (u.role === "owner" ? "var(--primary)" : "#636e72")
                    }}>
                      {u.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tools Section */}
          <section className="glass-card" style={{ background: "rgba(40, 40, 40, 0.6)", padding: "25px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              Tools <span style={{ background: "var(--primary)", padding: "2px 10px", borderRadius: "10px", fontSize: "0.8rem" }}>{tools.length}</span>
            </h2>
            <div style={{ maxHeight: "500px", overflowY: "auto", paddingRight: "10px" }}>
              {tools.map(t => (
                <div key={t._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "12px 0" }}>
                  <p style={{ fontWeight: "600" }}>{t.name}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "5px" }}>
                    <span style={{ fontSize: "0.9rem", color: "var(--accent)" }}>₹{t.pricePerDay}</span>
                    <span style={{ fontSize: "0.7rem", color: "#888" }}>ID: {t._id.slice(-6)}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Bookings Section */}
          <section className="glass-card" style={{ background: "rgba(40, 40, 40, 0.6)", padding: "25px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              Bookings <span style={{ background: "var(--primary)", padding: "2px 10px", borderRadius: "10px", fontSize: "0.8rem" }}>{bookings.length}</span>
            </h2>
            <div style={{ maxHeight: "500px", overflowY: "auto", paddingRight: "10px" }}>
              {bookings.map(b => (
                <div key={b._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "12px 0" }}>
                  <p style={{ fontWeight: "600" }}>{b.tool?.name || "Unknown Tool"}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "5px" }}>
                    <span style={{ fontSize: "0.8rem", color: "#888" }}>By: {b.user?.name}</span>
                    <span style={{ 
                      fontSize: "0.7rem", 
                      padding: "2px 8px", 
                      borderRadius: "10px", 
                      background: b.status === "completed" ? "#2d5a27" : (b.status === "pending" ? "#f5a623" : "#d63031")
                    }}>
                      {b.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

