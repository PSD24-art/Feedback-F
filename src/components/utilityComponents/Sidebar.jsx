import { useState } from "react";
import { LayoutDashboard, BarChart3, Settings, LogOut } from "lucide-react";
import useAuth from "../../store/AuthProvider";
import withLoader from "../../utils/withLoader";
import Loader from "./Loader";
import { useNavigate, useLocation } from "react-router-dom";
import FacultyNav from "../Navigation/FacultyNav";
import AdminNav from "../Navigation/AdminNav";
import SuperAdminNav from "../Navigation/SuperAdminNav";

export default function Sidebar({ isOpen, setIsOpen }) {
  console.log("Sidebar Rendered");
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
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
      await logout(id);
      navigate("/");
    }, setLoading);
  };

  return (
    <>
      {loading && <Loader />}
      {user && user.role !== "superAdmin" ? (
        <aside
          className={`fixed left-0 top-16 z-40 flex h-[calc(100dvh-4rem)] w-[280px] flex-col overflow-hidden border-r border-slate-200 bg-white/95 shadow-xl shadow-slate-900/10 backdrop-blur transition-transform duration-300 lg:static lg:h-full lg:shrink-0 lg:translate-x-0 lg:shadow-none ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex h-full flex-col px-4 py-5">
            <div className="mb-5 border-b border-slate-100 px-3 pb-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-600">Navigation menu</p>
              <h2 className="mt-1 text-base font-extrabold text-slate-800">Control Panel</h2>
            </div>

            <nav className="flex flex-1 flex-col gap-1 text-slate-600">
              {user && user.role === "faculty" ? (
                <FacultyNav
                  setIsOpen={setIsOpen}
                  setIsFeedbackOpen={setIsFeedbackOpen}
                  isFeedbackOpen={isFeedbackOpen}
                  id={id}
                  isActive={isActive}
                />
              ) : (
                <AdminNav
                  setIsOpen={setIsOpen}
                  setIsFeedbackOpen={setIsFeedbackOpen}
                  isFeedbackOpen={isFeedbackOpen}
                  id={id}
                  isActive={isActive}
                />
              )}

              <div className="mt-2 flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition hover:bg-slate-100 hover:text-rose-700">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </div>
              <div
                onClick={handlLogOut}
                className="mt-auto flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-600 transition hover:border-rose-100 hover:bg-rose-50 hover:text-rose-700"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </div>
            </nav>
          </div>
        </aside>
      ) : (
        <SuperAdminNav user={user} handlLogOut={handlLogOut} isOpen={isOpen} />
      )}
    </>
  );
}
