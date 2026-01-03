import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

import { University, Settings, LogOut, ShieldUser } from "lucide-react";

const SuperAdminNav = ({ user, handlLogOut, isOpen }) => {
  const navigate = useNavigate();
  return (
    <>
      {user && (
        <div
          className={`mb-1 rounded-r-lg fixed lg:static flex flex-col border-2 border-red-300 h-[92vh] bg-red-50/60 backdrop-blur-sm shadow-lg 
        transition-all duration-300 ease-in-out w-[220px]
        ${isOpen ? "w-full top-0 left-0 z-40 h-dvh mt-13 rounded-r-none" : "w-[20%] hidden lg:flex mt-15 "}`}
        >
          <div className="flex flex-col h-full py-6 px-4">
            <h2 className="text-xl font-semibold text-red-800 mb-2 text-center border-b border-red-300 pb-2">
              Feedback_Guru
            </h2>

            <nav className="flex flex-col text-amber-900">
              <div className="flex items-center gap-3 mt-3 hover:text-red-500 cursor-pointer">
                <University className="w-5 h-5" />
                <span className="text-lg font-medium">Institutes</span>
              </div>
              <div className="flex items-center gap-3 mt-3 hover:text-red-500 cursor-pointer">
                <ShieldUser className="w-5 h-5" />
                <span className="text-lg font-medium">Admins</span>
              </div>
              <div
                onClick={handlLogOut}
                className="flex items-center gap-3 mt-3 hover:text-red-500 cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-lg font-medium">Logout</span>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default SuperAdminNav;
