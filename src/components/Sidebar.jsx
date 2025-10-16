import { useState } from "react";
import { LayoutDashboard, BarChart3, Settings, LogOut } from "lucide-react";
import useAuth from "../store/AuthProvider";
import withLoader from "../utils/withLoader";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import FacultyNav from "./Navigation/FacultyNav";
import AdminNav from "./Navigation/AdminNav";

export default function Sidebar({ isOpen, setIsOpen }) {
  const { user } = useAuth();
  let id;
  if (user) {
    id = user.id;
  }
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const { logout } = useAuth();

  // const [isOpen, setIsOpen] = useState(false);
  const handlLogOut = async () => {
    setIsOpen(false);
    withLoader(async () => {
      const confirmed = confirm("Are you sure want to log out");
      if (!confirmed) return;
      await logout();
      navigate("/login");
    }, setLoading);
  };

  return (
    <>
      {loading && <Loader />}
      <div
        className={`mb-1 rounded-r-lg fixed lg:static flex flex-col border-2 border-red-300 h-[dvh-60px] bg-red-50/60 backdrop-blur-sm shadow-lg 
        transition-all duration-300 ease-in-out w-[220px]
        ${isOpen ? "w-full top-0 left-0 z-40 h-dvh mt-14" : "w-[20%] hidden lg:flex mt-15 "}`}
      >
        <div className="flex flex-col h-full py-6 px-4">
          <h2 className="text-xl font-semibold text-red-800 mb-2 text-center border-b border-red-300 pb-2">
            Feedback_Guru
          </h2>

          <nav className="flex flex-col text-amber-900">
            {user && user.role === "faculty" ? (
              <FacultyNav
                setIsOpen={setIsOpen}
                setIsFeedbackOpen={setIsFeedbackOpen}
                isFeedbackOpen={isFeedbackOpen}
                id={id}
              />
            ) : (
              <AdminNav
                setIsOpen={setIsOpen}
                setIsFeedbackOpen={setIsFeedbackOpen}
                isFeedbackOpen={isFeedbackOpen}
                id={id}
              />
            )}

            <div className="mt-3 flex items-center gap-3 hover:text-amber-700 cursor-pointer">
              <Settings className="w-5 h-5" />
              <span className="text-lg font-medium">Settings</span>
            </div>
            <div
              onClick={handlLogOut}
              className="flex items-center gap-3 mt-3 hover:text-red-600 cursor-pointer"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-lg font-medium">Logout</span>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
