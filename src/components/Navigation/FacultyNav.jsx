import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { LayoutDashboard, BarChart3, Settings, LogOut } from "lucide-react";
import { useParams } from "react-router-dom";
const FacultyNav = ({
  setIsOpen,
  setIsFeedbackOpen,
  isFeedbackOpen,
  id,
  isActive,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`flex items-center  gap-3 mt-3 hover:text-red-500 cursor-pointer ${isActive(`/faculty/${id}`) ? "text-red-500" : "text-amber-900"}`}
        onClick={() => {
          setIsOpen(false);
          navigate(`/faculty/${id}`);
        }}
      >
        <LayoutDashboard className="w-5 h-5" />
        <span className="text-lg font-medium">Dashboard</span>
      </div>
      <div
        className="mt-3 flex items-center justify-between hover:text-red-500 cursor-pointer px-2 ps-0 py-2 pt-0 rounded-md transition-all duration-200 pb-0"
        onClick={() => {
          setIsFeedbackOpen((prev) => !prev);
        }}
      >
        <div className="flex items-center gap-3">
          <BarChart3 className="w-5 h-4" />
          <span className="text-lg font-medium">Feedback Form</span>
        </div>
        {isFeedbackOpen ? (
          <ChevronUp className="w-4 h-4 text-red-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-red-500" />
        )}
      </div>

      {/* Collapsible section */}
      <div
        className={`  ${
          isFeedbackOpen
            ? "max-h-40 opacity-100 flex flex-col ml-9 overflow-hidden transition-all duration-300"
            : "max-h-0 opacity-0 hidden"
        }  ${isActive(`/faculty/${id}/links`) ? "text-red-500" : "text-amber-900"}`}
      >
        <div className="flex items-center gap-3 hover:text-red-500 cursor-pointer py-1">
          <BarChart3 className="w-4 h-4" />
          <span
            className="text-base"
            onClick={() => {
              setIsOpen(false);
              navigate(`/faculty/${id}/links`);
            }}
          >
            Feedback Links
          </span>
        </div>

        <div
          className={`flex items-center gap-3 hover:text-red-500 cursor-pointer py-1  ${isActive(`/faculty/${id}/form`) ? "text-red-500" : "text-amber-900"}`}
        >
          <BarChart3 className="w-4 h-4" />
          <span
            className="text-base"
            onClick={() => {
              setIsOpen(false);
              navigate(`/faculty/${id}/form`);
            }}
          >
            Create Form
          </span>
        </div>

        <div
          className={`flex items-center gap-3 hover:text-red-500 cursor-pointer py-1 ${isActive(`/faculty/${id}/subject`) ? "text-red-500" : "text-amber-900"}`}
        >
          <BarChart3 className="w-4 h-4" />
          <span
            className="text-base"
            onClick={() => {
              setIsOpen(false);
              navigate(`/faculty/${id}/subject`);
            }}
          >
            Add Subject
          </span>
        </div>
      </div>
    </>
  );
};

export default FacultyNav;
