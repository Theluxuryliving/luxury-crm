import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LeadsPage from "./pages/LeadsPage";
// import other pages as needed...

export default function App() {
  return (
    <Router>
      <div className="flex font-poppins min-h-screen bg-[#f8f8f8]">
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Main content on the right */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/leads" />} />
            <Route path="/leads" element={<LeadsPage />} />
            {/* Add other routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}
