import { useEffect, useState } from "react";
import API, { BASE_URL } from "../api";

export default function Home() {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const res = await API.get("/tools");
      setTools(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const viewDetails = (toolId) => {
    window.location.href = `/tool/${toolId}`;
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Premium Navbar */}
      <nav style={{ 
        padding: "20px 40px", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        background: "var(--glass-bg)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--glass-border)",
        position: "sticky",
        top: 0,
        zIndex: 1000
      }}>
        <h1 style={{ color: "var(--primary)", fontSize: "1.8rem", margin: 0 }}>AgriRental🚜</h1>
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <button 
            onClick={() => window.location.href="/bookings"} 
            className="premium-btn premium-btn-secondary"
            style={{ padding: "8px 20px", textTransform: "none" }}
          >
            My Bookings
          </button>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="premium-btn premium-btn-danger"
            style={{ padding: "8px 20px", textTransform: "none" }}
          >
            Logout
          </button>
        </div>
      </nav>

      <main style={{ padding: "40px" }} className="animate-fade-in">
        <header style={{ marginBottom: "40px", textAlign: "center" }}>
          <h2 style={{ fontSize: "2.5rem", color: "var(--text-main)", marginBottom: "10px" }}>Find the Perfect Tools</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>High-quality agricultural equipment for every farmer's need.</p>
        </header>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", 
          gap: "30px" 
        }}>
          {tools.map((tool) => (
            <div
              key={tool._id}
              className="glass-card"
              style={{
                overflow: "hidden",
                transition: "transform 0.3s ease",
                display: "flex",
                flexDirection: "column"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ position: "relative" }}>
                <img 
                  src={tool.image?.startsWith("http") ? tool.image : `${BASE_URL}${tool.image}`} 
                  alt={tool.name} 
                  style={{ width: "100%", height: "220px", objectFit: "cover" }} 
                  onError={(e) => e.target.src = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop"}
                />
                <div style={{ 
                  position: "absolute", 
                  top: "15px", 
                  right: "15px", 
                  background: "var(--accent)", 
                  color: "white", 
                  padding: "5px 12px", 
                  borderRadius: "20px",
                  fontWeight: "bold",
                  fontSize: "0.85rem",
                  boxShadow: "var(--shadow-sm)"
                }}>
                  {tool.category}
                </div>
              </div>

              <div style={{ padding: "25px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontSize: "1.4rem", marginBottom: "10px", color: "var(--text-main)" }}>{tool.name}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "20px", lineClamp: 2, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {tool.description}
                </p>
                
                <div style={{ marginTop: "auto" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px" }}>
                    <span style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--primary)" }}>₹{tool.pricePerDay}</span>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>/ per day</span>
                  </div>

                  <button 
                    onClick={() => viewDetails(tool._id)}
                    className="premium-btn"
                    style={{ width: "100%" }}
                  >
                    View Details & Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}