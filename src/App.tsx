import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LeadsPage from "./pages/LeadsPage";
import FollowupsPage from "./pages/FollowupsPage";
import CalendarTab from "./pages/CalendarTab";
import LeadDetailPage from "./pages/LeadDetailPage";

export default function App() {
  return (
    <Router>
      <div className="flex font-poppins min-h-screen bg-[#f8f8f8]">
        <Sidebar />
        <div className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/leads" />} />
            <Route path="/leads" element={<LeadsPage />} />
            <Route path="/followups" element={<FollowupsPage />} />
            <Route path="/calendar" element={<CalendarTab />} />
            <Route path="/leads/:id" element={<LeadDetailPage />} />
            {/* Add more routes here as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}
