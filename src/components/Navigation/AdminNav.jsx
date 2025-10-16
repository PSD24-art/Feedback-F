import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { LayoutDashboard, BarChart3, Settings, LogOut } from "lucide-react";
import { useParams } from "react-router-dom";
const AdminNav = ({ setIsOpen, id }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="flex items-center gap-3 mt-3 hover:text-amber-700 cursor-pointer"
        onClick={() => {
          setIsOpen(false);
          navigate(`/admin/${id}`);
        }}
      >
        <LayoutDashboard className="w-5 h-5" />
        <span className="text-lg font-medium">All Faculties</span>
      </div>
      <div
        className="flex items-center gap-3 mt-3 hover:text-amber-700 cursor-pointer"
        onClick={() => {
          setIsOpen(false);
          navigate(`/admin/${id}/faculty/new`);
        }}
      >
        <LayoutDashboard className="w-5 h-5" />
        <span className="text-lg font-medium">Add Faculty</span>
      </div>
    </>
  );
};

export default AdminNav;
