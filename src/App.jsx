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
import CreateForm from "./components/CreateFrom";
import AddSubject from "./components/AddSubject";
import Footer from "./components/Footer";

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
    <div className="flex flex-col min-h-screen">
      <Header setIsOpen={setIsSidebarOpen} isOpen={isSidebarOpen} />

      <div className="flex flex-row flex-1">
        {showSidebar && (
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        )}

        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/faculty/:id" element={<FacultyDashboard />} />
            <Route path="/change-password/:id" element={<PasswordReset />} />
            <Route path="/faculty/:id/form" element={<CreateForm />} />
            <Route path="/faculty/:id/links" element={<Subject />} />
            <Route path="/faculty/:id/subject" element={<AddSubject />} />
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
            <Route path="feedback/sent" element={<FeedbackSent />} />
          </Routes>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
