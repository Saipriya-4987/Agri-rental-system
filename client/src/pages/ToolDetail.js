import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API, { BASE_URL } from "../api";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon in Leaflet + React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function ToolDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tool, setTool] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const fetchTool = async () => {
      try {
        const res = await API.get(`/tools/${id}`);
        setTool(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTool();
  }, [id]);

  const handleBooking = async () => {
    if (!selectedSlot) return alert("Please select a slot");
    if (!agreed) return alert("Please accept the agreement");

    try {
      await API.post("/bookings", { toolId: id, selectedSlot });
      alert("Booking Request Sent! 🚜");
      navigate("/bookings");
    } catch (error) {
      alert(error.response?.data?.message || "Booking Failed");
    }
  };

  if (!tool) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <p style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>Loading tool details...</p>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", padding: "40px" }} className="animate-fade-in">
      <button 
        onClick={() => navigate("/home")} 
        className="premium-btn premium-btn-secondary"
        style={{ marginBottom: "30px", textTransform: "none", padding: "10px 20px" }}
      >
        ← Back to Browse
      </button>
      
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "40px" }}>
        
        {/* Left Side: Product Details */}
        <div className="glass-card" style={{ padding: "40px" }}>
          <div style={{ position: "relative", marginBottom: "30px" }}>
            <img 
              src={tool.image?.startsWith("http") ? tool.image : `${BASE_URL}${tool.image}`} 
              alt={tool.name} 
              style={{ width: "100%", height: "450px", objectFit: "cover", borderRadius: "var(--radius-md)" }} 
              onError={(e) => e.target.src = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop"}
            />
            <div style={{ 
              position: "absolute", 
              bottom: "20px", 
              left: "20px", 
              background: "rgba(0,0,0,0.6)", 
              color: "white", 
              padding: "10px 20px", 
              borderRadius: "30px",
              backdropFilter: "blur(5px)",
              fontSize: "1.2rem",
              fontWeight: "700"
            }}>
              ₹{tool.pricePerDay} <span style={{ fontWeight: "normal", fontSize: "0.9rem" }}>/ day</span>
            </div>
          </div>

          <h1 style={{ fontSize: "2.8rem", color: "var(--text-main)", marginBottom: "10px" }}>{tool.name}</h1>
          <p style={{ fontSize: "1.1rem", color: "var(--primary)", fontWeight: "600", marginBottom: "20px" }}>{tool.category}</p>
          
          <div style={{ marginBottom: "40px" }}>
            <h3 style={{ fontSize: "1.4rem", marginBottom: "15px" }}>About this equipment</h3>
            <p style={{ color: "var(--text-muted)", lineHeight: "1.8", fontSize: "1.05rem" }}>{tool.description}</p>
          </div>

          <div style={{ marginBottom: "40px" }}>
            <h3 style={{ fontSize: "1.4rem", marginBottom: "15px" }}>Available Pickup Slots</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {tool.availableSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`premium-btn ${selectedSlot === slot ? "" : "premium-btn-secondary"}`}
                  style={{
                    padding: "10px 24px",
                    borderRadius: "30px",
                    textTransform: "none",
                    fontSize: "0.9rem"
                  }}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div style={{ 
            padding: "25px", 
            border: "1px solid var(--glass-border)", 
            borderRadius: "var(--radius-md)", 
            background: "rgba(45, 90, 39, 0.03)",
            marginBottom: "30px"
          }}>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "15px" }}>📜 Rental Agreement</h3>
            <label style={{ cursor: "pointer", display: "flex", alignItems: "flex-start", gap: "15px" }}>
              <input 
                type="checkbox" 
                checked={agreed} 
                onChange={(e) => setAgreed(e.target.checked)} 
                style={{ marginTop: "5px", width: "18px", height: "18px", accentColor: "var(--primary)" }}
              />
              <span style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: "1.5" }}>
                I agree to pick up the tool from the owner's address at the selected slot, return it in the same condition, and follow all safety protocols.
              </span>
            </label>
          </div>

          <button
            onClick={handleBooking}
            disabled={!agreed || !selectedSlot}
            className="premium-btn"
            style={{
              width: "100%",
              padding: "18px",
              fontSize: "1.2rem",
              background: (!agreed || !selectedSlot) ? "#ccc" : "var(--primary)",
              cursor: (!agreed || !selectedSlot) ? "not-allowed" : "pointer",
              boxShadow: (agreed && selectedSlot) ? "var(--shadow-lg)" : "none"
            }}
          >
            Confirm & Book Now
          </button>
        </div>

        {/* Right Side: Map & Location Details */}
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <div className="glass-card" style={{ height: "450px", overflow: "hidden", position: "sticky", top: "100px" }}>
            <div style={{ padding: "20px", borderBottom: "1px solid var(--glass-border)", background: "white" }}>
              <h3 style={{ fontSize: "1.2rem", margin: 0 }}>📍 Owner Location</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "5px" }}>{tool.address}</p>
            </div>
            <div style={{ height: "calc(100% - 75px)", width: "100%" }}>
              <MapContainer center={[tool.location.lat, tool.location.lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[tool.location.lat, tool.location.lng]}>
                  <Popup>
                    <strong>{tool.name}</strong><br />
                    Pickup Location
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

          <div className="glass-card" style={{ padding: "25px", background: "white" }}>
            <h4 style={{ marginBottom: "15px" }}>Need Help?</h4>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
              If you have questions about this equipment, please contact support or reach out to the owner after booking.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

