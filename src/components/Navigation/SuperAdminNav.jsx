import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

import { University, Settings, LogOut, ShieldUser } from "lucide-react";

const SuperAdminNav = ({ user, handlLogOut, isOpen }) => {
  const navigate = useNavigate();
  return (
    <>
      {user && (
        <aside
          className={`fixed left-0 top-16 z-40 flex h-[calc(100dvh-4rem)] w-[280px] flex-col overflow-hidden border-r border-slate-200 bg-white/95 shadow-xl shadow-slate-900/10 backdrop-blur transition-transform duration-300 lg:static lg:h-full lg:shrink-0 lg:translate-x-0 lg:shadow-none ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex h-full flex-col px-4 py-5">
            <div className="mb-5 border-b border-slate-100 px-3 pb-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-600">Administration</p>
              <h2 className="mt-1 text-base font-extrabold text-slate-800">Control Panel</h2>
            </div>

            <nav className="flex flex-1 flex-col gap-1 text-slate-600">
              <div className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition hover:bg-slate-100 hover:text-rose-700">
                <University className="w-5 h-5" />
                <span>Institutes</span>
              </div>
              <div className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition hover:bg-slate-100 hover:text-rose-700">
                <ShieldUser className="w-5 h-5" />
                <span>Admins</span>
              </div>
              <div
                onClick={handlLogOut}
                className="mt-auto flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold transition hover:border-rose-100 hover:bg-rose-50 hover:text-rose-700"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </div>
            </nav>
          </div>
        </aside>
      )}
    </>
  );
};

export default SuperAdminNav;
