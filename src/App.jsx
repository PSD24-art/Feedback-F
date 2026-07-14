import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/utilityComponents/Header";
import Sidebar from "./components/utilityComponents/Sidebar";
import Footer from "./components/utilityComponents/Footer";

import Login from "./pages/login";
import HomePage from "./pages/HomePage";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import FeedbackForm from "./pages/FeedbackForm";
import FeedbackLinks from "./components/FeedbackLinks";
import PasswordReset from "./pages/PasswordReset";
import FeedbackSent from "./pages/FeedBackSent";
import CreateForm from "./components/CreateFrom";
import AddSubject from "./components/AddSubject";
import Subjects from "./pages/admin/Subjects";
import Institution_form from "./pages/Institution_form";
import DemoWorkspace from "./pages/DemoWorkspace";
import SAdminDash from "./pages/sAdmin/SAdminDash";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddFaculty from "./pages/admin/AddFaculty";
import SkeletonCard from "./components/utilityComponents/SkeletonCard";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (["/", "/login", "/institution-form", "/demo"].includes(location.pathname)) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  }, [location.pathname]);

  const isLandingPage = location.pathname === "/";

  return (
    <div className="app-surface flex min-h-screen flex-col">
      {!isLandingPage && (
        <Header setIsOpen={setIsSidebarOpen} isOpen={isSidebarOpen} />
      )}

      <div
        className={`flex min-h-0 flex-row ${
          isLandingPage ? "flex-1" : "h-screen pt-16"
        }`}
      >
        {showSidebar && (
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        )}

        <main className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/institution-form" element={<Institution_form />} />
            <Route path="/demo" element={<DemoWorkspace />} />

            <Route path="/sAdmin/:id" element={<SAdminDash />} />

            <Route path="/faculty/:id" element={<FacultyDashboard />} />
            <Route path="/faculty/:id/form" element={<CreateForm />} />
            <Route path="/faculty/:id/links" element={<FeedbackLinks />} />
            <Route path="/faculty/:id/subject" element={<AddSubject />} />
            <Route
              path="/faculty/:id/feedback/:term/:subject"
              element={<FeedbackForm />}
            />

            <Route
              path="/change-password/:id"
              element={<PasswordReset setIsOpen={setIsSidebarOpen} />}
            />
            <Route path="/feedback/sent" element={<FeedbackSent />} />
            <Route path="/loader" element={<SkeletonCard />} />

            {/* ADMIN */}
            <Route path="/admin/:id" element={<AdminDashboard />} />
            <Route path="/admin/:id/subject" element={<Subjects />} />
            <Route path="/admin/:id/subjects/new" element={<AddSubject />} />
            <Route path="/admin/:id/faculty/new" element={<AddFaculty />} />
            <Route path="*" element={<></>} />
          </Routes>
        </main>
      </div>

      {!isLandingPage && <Footer />}
    </div>
  );
}

export default App;
