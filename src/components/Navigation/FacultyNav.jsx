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
        className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${isActive(`/faculty/${id}`) ? "bg-rose-50 text-rose-700 shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-rose-700"}`}
        onClick={() => {
          setIsOpen(false);
          navigate(`/faculty/${id}`);
        }}
      >
        <LayoutDashboard className="w-5 h-5" />
        <span>Dashboard</span>
      </div>
      <div
        className="mt-1 flex cursor-pointer items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-rose-700"
        onClick={() => {
          setIsFeedbackOpen((prev) => !prev);
        }}
      >
        <div className="flex items-center gap-3">
          <BarChart3 className="w-5 h-4" />
          <span>Feedback Form</span>
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
        } text-slate-600`}
      >
        <div className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-rose-50 hover:text-rose-700 ${isActive(`/faculty/${id}/links`) ? "bg-rose-50 text-rose-700" : ""}`}>
          <BarChart3 className="w-4 h-4" />
          <span
            className="text-sm"
            onClick={() => {
              setIsOpen(false);
              navigate(`/faculty/${id}/links`);
            }}
          >
            Feedback Links
          </span>
        </div>

        <div
          className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-rose-50 hover:text-rose-700 ${isActive(`/faculty/${id}/form`) ? "bg-rose-50 text-rose-700" : ""}`}
        >
          <BarChart3 className="w-4 h-4" />
          <span
            className="text-sm"
            onClick={() => {
              setIsOpen(false);
              navigate(`/faculty/${id}/form`);
            }}
          >
            Create Form
          </span>
        </div>

        <div
          className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-rose-50 hover:text-rose-700 ${isActive(`/faculty/${id}/subject`) ? "bg-rose-50 text-rose-700" : ""}`}
        >
          <BarChart3 className="w-4 h-4" />
          <span
            className="text-sm"
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
