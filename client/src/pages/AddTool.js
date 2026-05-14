import { useState } from "react";
import API from "../api";

export default function AddTool() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    image: "",
    pricePerDay: "",
    address: "",
    lat: "",
    lng: "",
    availableSlots: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (image) data.append("image", image);

    try {
      await API.post("/tools", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Tool Added Successfully! 🎉");
      window.location.href = "/owner-dashboard";
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add tool");
    }
  };

  return (
    <div style={{ minHeight: "100vh", padding: "40px" }} className="animate-fade-in">
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "2.5rem", color: "var(--text-main)" }}>List New Equipment 🚜</h1>
          <button 
            onClick={() => window.location.href="/owner-dashboard"} 
            className="premium-btn premium-btn-secondary"
            style={{ textTransform: "none" }}
          >
            ← Back to Dashboard
          </button>
        </div>

        <div className="glass-card" style={{ padding: "40px" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div style={{ textAlign: "left" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "0.9rem" }}>Equipment Name</label>
                <input name="name" placeholder="e.g. Mahindra Tractor" required className="modern-input" onChange={handleChange} />
              </div>
              <div style={{ textAlign: "left" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "0.9rem" }}>Category</label>
                <input name="category" placeholder="e.g. Harvesting" required className="modern-input" onChange={handleChange} />
              </div>
            </div>

            <div style={{ textAlign: "left" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "0.9rem" }}>Description</label>
              <textarea name="description" placeholder="Describe the tool's condition, capacity, etc." rows="4" className="modern-input" onChange={handleChange} />
            </div>
            
            <div style={{ textAlign: "left" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "0.9rem" }}>Tool Image</label>
              <div style={{ 
                border: "2px dashed var(--glass-border)", 
                padding: "20px", 
                borderRadius: "var(--radius-sm)", 
                textAlign: "center",
                background: "rgba(255,255,255,0.5)"
              }}>
                <input type="file" accept="image/*" onChange={handleFileChange} style={{ fontSize: "0.9rem" }} />
              </div>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div style={{ textAlign: "left" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "0.9rem" }}>Price Per Day (₹)</label>
                <input name="pricePerDay" type="number" placeholder="₹ 1500" required className="modern-input" onChange={handleChange} />
              </div>
              <div style={{ textAlign: "left" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "0.9rem" }}>Available Slots</label>
                <input name="availableSlots" placeholder="e.g. May 15, May 16" required className="modern-input" onChange={handleChange} />
              </div>
            </div>

            <div style={{ textAlign: "left" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "0.9rem" }}>Pickup Address</label>
              <input name="address" placeholder="123 Farm Road, District" required className="modern-input" onChange={handleChange} />
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div style={{ textAlign: "left" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "0.9rem" }}>Latitude</label>
                <input name="lat" type="number" step="any" placeholder="17.1234" required className="modern-input" onChange={handleChange} />
              </div>
              <div style={{ textAlign: "left" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "0.9rem" }}>Longitude</label>
                <input name="lng" type="number" step="any" placeholder="78.5678" required className="modern-input" onChange={handleChange} />
              </div>
            </div>

            <button 
              type="submit" 
              className="premium-btn"
              style={{ marginTop: "10px", padding: "18px", fontSize: "1.1rem" }}
            >
              List Equipment for Rent
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

