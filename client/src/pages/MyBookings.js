import { useEffect, useState } from "react";
import API from "../api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/user");
      setBookings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted": return "var(--primary)";
      case "rejected": return "#d63031";
      case "completed": return "#2d3436";
      default: return "var(--accent)";
    }
  };

  return (
    <div style={{ minHeight: "100vh", padding: "40px" }} className="animate-fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.5rem", color: "var(--text-main)" }}>My Bookings 🚜</h1>
        <button 
          onClick={() => window.location.href="/home"} 
          className="premium-btn premium-btn-secondary"
          style={{ textTransform: "none" }}
        >
          ← Back to Marketplace
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="glass-card" style={{ padding: "60px", textAlign: "center" }}>
          <p style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>No bookings yet. Start browsing tools to rent!</p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "30px" }}>
          {bookings.map((b) => (
            <div
              key={b._id}
              className="glass-card"
              style={{
                padding: "30px",
                borderLeft: `8px solid ${getStatusColor(b.status)}`,
                display: "grid",
                gridTemplateColumns: "1fr 2fr",
                gap: "40px",
                alignItems: "center"
              }}
            >
              <div>
                <h3 style={{ fontSize: "1.6rem", marginBottom: "15px" }}>{b.tool?.name || "Deleted Tool"}</h3>
                <div style={{ marginBottom: "20px" }}>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginBottom: "5px" }}>Owner</p>
                  <p style={{ fontWeight: "600" }}>{b.owner?.name}</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginBottom: "5px" }}>Pickup Slot</p>
                  <p style={{ fontWeight: "700", color: "var(--primary)" }}>{b.selectedSlot}</p>
                </div>
              </div>

              <div>
                <div style={{ marginBottom: "30px" }}>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginBottom: "20px", textAlign: "center" }}>Booking Progress</p>
                  <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
                    {["pending", "accepted", "ready_for_pickup", "in_use", "completed"].map((step, index, arr) => {
                      const isCompleted = arr.indexOf(b.status) >= index;
                      const isCurrent = b.status === step;
                      return (
                        <div key={step} style={{ textAlign: "center", flex: 1, zIndex: 1 }}>
                          <div style={{ 
                            width: "28px", 
                            height: "28px", 
                            borderRadius: "50%", 
                            backgroundColor: isCompleted ? "var(--primary)" : "#dfe6e9", 
                            margin: "0 auto",
                            border: isCurrent ? "4px solid var(--accent)" : "none",
                            color: "white",
                            fontSize: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.3s ease"
                          }}>
                            {isCompleted ? "✓" : index + 1}
                          </div>
                          <p style={{ 
                            fontSize: "0.7rem", 
                            marginTop: "10px", 
                            fontWeight: isCurrent ? "800" : "500",
                            color: isCurrent ? "var(--text-main)" : "var(--text-muted)",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px"
                          }}>
                            {step.replace(/_/g, " ")}
                          </p>
                        </div>
                      );
                    })}
                    <div style={{ 
                      position: "absolute", 
                      top: "14px", 
                      left: "10%", 
                      right: "10%", 
                      height: "2px", 
                      backgroundColor: "#dfe6e9", 
                      zIndex: 0 
                    }} />
                  </div>
                </div>

                {b.status === "ready_for_pickup" && (
                  <div className="animate-fade-in" style={{ 
                    background: "rgba(45, 90, 39, 0.05)", 
                    padding: "20px", 
                    borderRadius: "var(--radius-sm)", 
                    border: "1px solid var(--primary-light)" 
                  }}>
                    <p style={{ margin: 0, fontWeight: "700", color: "var(--primary)", display: "flex", alignItems: "center", gap: "10px" }}>
                      <span>📍</span> Tool is ready for collection!
                    </p>
                    <p style={{ margin: "8px 0 0 0", fontSize: "0.9rem", color: "var(--text-muted)" }}>Pickup Address: {b.tool?.address}</p>
                  </div>
                )}
                
                {b.status === "rejected" && (
                  <div style={{ padding: "15px", background: "#fff5f5", borderRadius: "var(--radius-sm)", border: "1px solid #feb2b2" }}>
                    <p style={{ color: "#c53030", fontWeight: "700", margin: 0 }}>❌ Booking Rejected</p>
                    <p style={{ margin: "5px 0 0 0", fontSize: "0.9rem", color: "#9b2c2c" }}>The owner is unable to fulfill this request.</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}