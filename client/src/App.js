import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBookings from "./pages/MyBookings";
import OwnerDashboard from "./pages/OwnerDashboard";
import AddTool from "./pages/AddTool";
import OwnerBookings from "./pages/OwnerBookings";
import AdminDashboard from "./pages/AdminDashboard";
import ToolDetail from "./pages/ToolDetail";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/tool/:id" element={<ToolDetail />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/add-tool" element={<AddTool />} />
        <Route path="/owner-bookings" element={<OwnerBookings />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;