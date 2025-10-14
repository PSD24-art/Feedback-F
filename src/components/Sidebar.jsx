import { useState } from "react";
import { LayoutDashboard, BarChart3, Settings, LogOut } from "lucide-react";
import useAuth from "../store/AuthProvider";
import withLoader from "../utils/withLoader";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, setIsOpen }) {
  const { user } = useAuth();
  let id;
  if (user) {
    id = user.id;
  }

  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const { logout } = useAuth();
  //Go to dashboard
  const handleDashboard = () => {
    setIsOpen(false);
    navigate(`/faculty/${id}`);
  };

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

  //Go to subject - feedback form
  const handleOnClick = () => {
    setIsOpen(false);
    navigate(`/faculty/${id}/form`);
  };
  return (
    <>
      {loading && <Loader />}
      <div
        className={`rounded-r-lg fixed lg:static flex flex-col border-2 border-amber-300 h-[dvh-60px] mt-16 bg-amber-50/60 backdrop-blur-sm shadow-lg 
        transition-all duration-300 ease-in-out 
        ${isOpen ? "w-full top-0 left-0 z-40 h-dvh" : "w-[20%] hidden lg:flex"}`}
      >
        <div className="flex flex-col h-full py-6 px-4">
          <h2 className="text-xl font-semibold text-amber-800 mb-8 text-center border-b border-amber-300 pb-2">
            Feedback_Guru
          </h2>

          <nav className="flex flex-col gap-6 text-amber-900">
            <div
              className="flex items-center gap-3 hover:text-amber-700 cursor-pointer"
              onClick={handleDashboard}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="text-lg font-medium">Dashboard</span>
            </div>
            <div
              className="flex items-center gap-3 hover:text-amber-700 cursor-pointer"
              onClick={handleOnClick}
            >
              <BarChart3 className="w-5 h-5" />
              <span className="text-lg font-medium">Feedback Form</span>
            </div>
            <div className="flex items-center gap-3 hover:text-amber-700 cursor-pointer">
              <Settings className="w-5 h-5" />
              <span className="text-lg font-medium">Settings</span>
            </div>
            <div
              onClick={handlLogOut}
              className="flex items-center gap-3 mt-auto hover:text-red-600 cursor-pointer"
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
