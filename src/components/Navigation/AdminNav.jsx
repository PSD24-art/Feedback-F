import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  LogOut,
  UserPen,
  BookOpenText,
} from "lucide-react";
import { useParams } from "react-router-dom";
const AdminNav = ({ setIsOpen, id, isActive }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`flex items-center gap-3 mt-3 hover:text-red-500 cursor-pointer ${isActive(`/admin/${id}`) ? "text-red-500" : "text-amber-900"}`}
        onClick={() => {
          setIsOpen(false);
          navigate(`/admin/${id}`);
        }}
      >
        <LayoutDashboard className="w-5 h-5" />
        <span className="text-lg font-medium">All Faculties</span>
      </div>
      <div
        className={`flex items-center gap-3 mt-3 hover:text-red-500 cursor-pointer ${isActive(`/admin/${id}/faculty/new`) ? "text-red-500" : "text-amber-900"}`}
        onClick={() => {
          setIsOpen(false);
          navigate(`/admin/${id}/faculty/new`);
        }}
      >
        <UserPen className="w-5 h-5" />
        <span className="text-lg font-medium">Add Faculty</span>
      </div>
      <div
        className={`flex items-center gap-3 mt-3 hover:text-red-500 cursor-pointer ${isActive(`/admin/${id}/subject`) ? "text-red-500" : "text-amber-900"}`}
        onClick={() => {
          setIsOpen(false);
          navigate(`/admin/${id}/subject`);
        }}
      >
        <BookOpenText className="w-5 h-5" />
        <span className="text-lg font-medium">Subjects</span>
      </div>
    </>
  );
};

export default AdminNav;
