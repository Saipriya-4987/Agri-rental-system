  const fetchBookings = useCallback(async () => {
    try {
      const res = await API.get("/bookings/owner");
      setBookings(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const updateStatus = async (id, status) => {
    try {
      await API.patch(`/bookings/${id}/status`, { status });
      alert(`Booking ${status.replace(/_/g, " ")} ✅`);
      fetchBookings();
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending": return { bg: "#fff3e0", color: "#e67e22" };
      case "accepted": return { bg: "#e8f5e9", color: "#2d5a27" };
      case "ready_for_pickup": return { bg: "#e1f5fe", color: "#0288d1" };
      case "in_use": return { bg: "#f3e5f5", color: "#8e24aa" };
      case "completed": return { bg: "#eeeeee", color: "#616161" };
      case "rejected": return { bg: "#ffebee", color: "#d32f2f" };
      default: return { bg: "#f5f5f5", color: "#757575" };
    }
  };

  return (
    <div style={{ minHeight: "100vh", padding: "40px" }} className="animate-fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.5rem", color: "var(--text-main)" }}>Manage Bookings 📋</h1>
        <button 
          onClick={() => window.location.href="/owner-dashboard"} 
          className="premium-btn premium-btn-secondary"
          style={{ textTransform: "none" }}
        >
          ← Back to Dashboard
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="glass-card" style={{ padding: "60px", textAlign: "center" }}>
          <p style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>No booking requests yet. They'll appear here when farmers book your tools.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "25px" }}>
          {bookings.map((b) => {
            const statusStyle = getStatusStyle(b.status);
            return (
              <div key={b._id} className="glass-card" style={{ padding: "30px", display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "40px", alignItems: "center" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "15px" }}>
                    <h3 style={{ fontSize: "1.6rem", margin: 0 }}>{b.tool?.name}</h3>
                    <span style={{ 
                      padding: "4px 12px", 
                      borderRadius: "20px", 
                      background: statusStyle.bg, 
                      color: statusStyle.color,
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}>{b.status.replace(/_/g, " ")}</span>
                  </div>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                    <div>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "5px" }}>Customer</p>
                      <p style={{ fontWeight: "600" }}>{b.user?.name}</p>
                      <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{b.user?.email}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "5px" }}>Requested Slot</p>
                      <p style={{ fontWeight: "700", color: "var(--primary)" }}>{b.selectedSlot}</p>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-end" }}>
                  <p style={{ fontSize: "1.4rem", fontWeight: "800", color: "var(--text-main)", marginBottom: "10px" }}>₹{b.totalPrice}</p>
                  
                  <div style={{ display: "flex", gap: "10px", width: "100%", justifyContent: "flex-end" }}>
                    {b.status === "pending" && (
                      <>
                        <button onClick={() => updateStatus(b._id, "accepted")} className="premium-btn" style={{ padding: "10px 20px", fontSize: "0.85rem", textTransform: "none" }}>
                          Accept Request
                        </button>
                        <button onClick={() => updateStatus(b._id, "rejected")} className="premium-btn premium-btn-danger" style={{ padding: "10px 20px", fontSize: "0.85rem", textTransform: "none" }}>
                          Decline
                        </button>
                      </>
                    )}

                    {b.status === "accepted" && (
                      <button onClick={() => updateStatus(b._id, "ready_for_pickup")} className="premium-btn" style={{ background: "#0288d1", padding: "12px 24px", textTransform: "none" }}>
                        Mark as Ready for Pickup
                      </button>
                    )}

                    {b.status === "ready_for_pickup" && (
                      <button onClick={() => updateStatus(b._id, "in_use")} className="premium-btn" style={{ background: "#8e24aa", padding: "12px 24px", textTransform: "none" }}>
                        Confirm Handover (In Use)
                      </button>
                    )}

                    {b.status === "in_use" && (
                      <button onClick={() => updateStatus(b._id, "completed")} className="premium-btn" style={{ background: "#616161", padding: "12px 24px", textTransform: "none" }}>
                        Mark as Returned (Completed)
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

