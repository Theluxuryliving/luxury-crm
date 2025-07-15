import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LeadsPage from "./pages/LeadsPage";

export default function App() {
  return (
    <Router>
      <div className="flex font-poppins min-h-screen bg-[#f8f8f8]">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/leads" />} />
            <Route path="/leads" element={<LeadsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
