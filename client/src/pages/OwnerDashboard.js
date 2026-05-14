import { useEffect, useState, useCallback } from "react";
import API, { BASE_URL } from "../api";

export default function OwnerDashboard() {
  const [tools, setTools] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchMyTools = useCallback(async () => {
    try {
      const res = await API.get("/tools/my");
      setTools(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchMyTools();
  }, [fetchMyTools]);

  const deleteTool = async (id) => {
    if (window.confirm("Are you sure you want to delete this tool?")) {
      try {
        await API.delete(`/tools/${id}`);
        fetchMyTools();
      } catch (error) {
        alert("Delete failed");
      }
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <nav style={{ 
        padding: "15px 40px", 
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
        <h1 style={{ color: "var(--primary)", fontSize: "1.6rem", margin: 0 }}>AgriRental <span style={{ fontSize: "1rem", color: "var(--text-muted)", fontWeight: "normal" }}>| Owner Portal</span></h1>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <span style={{ fontSize: "0.95rem", color: "var(--text-main)" }}>Welcome, <strong>{user?.name}</strong></span>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="premium-btn premium-btn-danger"
            style={{ padding: "8px 16px", textTransform: "none", fontSize: "0.85rem" }}
          >
            Logout
          </button>
        </div>
      </nav>

      <main style={{ padding: "40px" }} className="animate-fade-in">
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          marginBottom: "30px" 
        }}>
          <h2 style={{ fontSize: "2rem", color: "var(--text-main)" }}>My Equipment</h2>
          <div style={{ display: "flex", gap: "15px" }}>
            <button 
              onClick={() => window.location.href="/add-tool"} 
              className="premium-btn"
              style={{ display: "flex", alignItems: "center", gap: "8px", textTransform: "none" }}
            >
              <span>+</span> Add New Tool
            </button>
            <button 
              onClick={() => window.location.href="/owner-bookings"} 
              className="premium-btn premium-btn-secondary"
              style={{ textTransform: "none" }}
            >
              Booking Requests
            </button>
          </div>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
          gap: "25px" 
        }}>
          {tools.length === 0 ? (
            <div className="glass-card" style={{ padding: "40px", textAlign: "center", gridColumn: "1 / -1" }}>
              <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>You haven't added any tools yet. Start by adding your first piece of equipment!</p>
            </div>
          ) : (
            tools.map((tool) => (
              <div key={tool._id} className="glass-card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <img 
                  src={tool.image?.startsWith("http") ? tool.image : `${BASE_URL}${tool.image}`} 
                  alt={tool.name} 
                  style={{ width: "100%", height: "160px", objectFit: "cover" }} 
                  onError={(e) => e.target.src = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop"}
                />
                <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "8px" }}>{tool.name}</h3>
                  <div style={{ marginBottom: "15px" }}>
                    <span style={{ 
                      fontSize: "0.8rem", 
                      padding: "3px 10px", 
                      borderRadius: "12px", 
                      background: "#eee", 
                      color: "#666",
                      marginRight: "8px"
                    }}>
                      {tool.category}
                    </span>
                  </div>
                  
                  <div style={{ marginBottom: "15px", fontSize: "0.95rem" }}>
                    <p style={{ color: "var(--primary)", fontWeight: "700", fontSize: "1.1rem" }}>₹{tool.pricePerDay} / day</p>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "5px" }}>📍 {tool.location}</p>
                  </div>

                  <button 
                    onClick={() => deleteTool(tool._id)}
                    className="premium-btn premium-btn-danger"
                    style={{ width: "100%", padding: "10px", textTransform: "none", fontSize: "0.85rem", marginTop: "auto" }}
                  >
                    Remove Tool
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

