import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/login";
import AdminDashboard from "./pages/AdminDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import Header from "./components/Header";
import FeedbackForm from "./pages/FeedbackForm";
import Subject from "./components/Subject";
import FacultyDashFromAdmin from "./pages/FacultyDashFromAdmin";
import AddFaculty from "./pages/AddFaculty";
import PasswordReset from "./pages/PasswordReset";
import FeedbackSent from "./pages/FeedBackSent";
import HomePage from "./pages/HomePage";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/login") {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  }, [location.pathname]);

  return (
    <div>
      <Header setIsOpen={setIsSidebarOpen} isOpen={isSidebarOpen} />
      <div className="flex flex-row h-[dvh-60px]">
        {showSidebar && (
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/faculty/:id" element={<FacultyDashboard />} />
          <Route path="/change-password/:id" element={<PasswordReset />} />
          <Route path="/faculty/:id/form" element={<Subject />} />
          <Route
            path="/faculty/:id/feedback/:subject"
            element={<FeedbackForm />}
          />
          <Route path="/admin/:id" element={<AdminDashboard />} />
          <Route
            path="/admin/:id/faculty/:facultyId"
            element={<FacultyDashFromAdmin />}
          />
          <Route path="/admin/:id/faculty/new" element={<AddFaculty />} />
          {/* Student routes*/}
          <Route path="/admin/:id/faculty/new" element={<AddFaculty />} />
          <Route path="feedback/sent" element={<FeedbackSent />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
