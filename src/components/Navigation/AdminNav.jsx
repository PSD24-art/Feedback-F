import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { LayoutDashboard, UserPen, BookOpenText } from "lucide-react";
import { useParams } from "react-router-dom";
const AdminNav = ({ setIsOpen, id, isActive }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${isActive(`/admin/${id}`) ? "bg-rose-50 text-rose-700 shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-rose-700"}`}
        onClick={() => {
          setIsOpen(false);
          navigate(`/admin/${id}`);
        }}
      >
        <LayoutDashboard className="w-5 h-5" />
        <span>All Faculties</span>
      </div>
      <div
        className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${isActive(`/admin/${id}/faculty/new`) ? "bg-rose-50 text-rose-700 shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-rose-700"}`}
        onClick={() => {
          setIsOpen(false);
          navigate(`/admin/${id}/faculty/new`);
        }}
      >
        <UserPen className="w-5 h-5" />
        <span>Add Faculty</span>
      </div>
      <div
        className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${isActive(`/admin/${id}/subject`) ? "bg-rose-50 text-rose-700 shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-rose-700"}`}
        onClick={() => {
          setIsOpen(false);
          navigate(`/admin/${id}/subject`);
        }}
      >
        <BookOpenText className="w-5 h-5" />
        <span>Subjects</span>
      </div>
    </>
  );
};

export default AdminNav;
