import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/faculty/:id" element={<FacultyDashboard />} />
        <Route path="/change-password/:id" element={<PasswordReset />} />
        <Route path="/faculty/:id/form" element={<Subject />} />
.
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
        <Route path="/faculty/feedbackForm" element={<FeedbackForm />} />
        <Route path="feedback/sent" element={<FeedbackSent />} />
      </Routes>
    </>
  );
}

export default App;
