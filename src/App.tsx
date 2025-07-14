// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LeadsPage from "./pages/LeadsPage";

const Sidebar = () => (
  <div className="w-64 h-screen bg-black text-white p-4">
    <h1 className="text-gold text-2xl font-semibold mb-6">🏢 Luxury CRM</h1>
    <nav className="space-y-4">
      <a href="/leads" className="block hover:text-gold">Leads</a>
      <a href="#" className="block hover:text-gold">Deals</a>
      <a href="#" className="block hover:text-gold">Projects</a>
    </nav>
  </div>
);

function App() {
  return (
    <Router>
      <div className="flex font-poppins min-h-screen bg-chalk">
        <Sidebar />
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

export default App;
