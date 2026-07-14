import useAuth from "../../store/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { Menu, X, ArrowLeft, GraduationCap } from "lucide-react";

const Header = ({ isOpen, setIsOpen }) => {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [login, setLogin] = useState(true);
  const [backBtn, setBackBtn] = useState(false);
  let username;

  useEffect(() => {
    if (location.pathname === "/" && !user) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [location.pathname]);

  const handleShowBackBtn = async () => {
    navigate("/");
  };

  useEffect(() => {
    if (
      location.pathname === "/institution-form" ||
      location.pathname === "/demo" ||
      location.pathname === "/login"
    ) {
      setBackBtn(true);
    } else {
      setBackBtn(false);
    }
  }, [location.pathname]);

  const handleLogIn = async () => {
    navigate("/login");
  };

  if (user) {
    username = user.username.charAt(0).toUpperCase();
  }
  const handleIconClick = () => {
    if (location.pathname === "/" && user.role === "faculty") {
      navigate(`/faculty/${user.id}`);
    } else if (location.pathname === "/" && user.role === "admin") {
      navigate(`/admin/${user.id}`);
    } else if (location.pathname === "/" && user.role === "superAdmin") {
      navigate(`/sAdmin/${user.id}`);
    }
  };

  // Check if current path matches /faculty/:id/feedback/:subject
  const hideButtons =
    /^\/faculty\/[^/]+\/feedback\/[^/]+$/.test(location.pathname) ||
    /^\/feedback\/sent$/.test(location.pathname);
  let institute;
  if (user && user.institute) {
    institute = user.Institute.name.split(" ").splice(0, 1);
  } else {
    institute = "feedback_guru";
  }

  return (
    <>
      {loading && <Loader />}
      <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-rose-900/20 bg-gradient-to-r from-rose-950 via-rose-800 to-rose-700 px-4 text-white shadow-lg shadow-rose-950/15 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="logo-font text-xl font-bold">{institute}</div>
            <span className="hidden text-[9px] font-bold uppercase tracking-[0.18em] text-rose-100/75 sm:block">Feedback workspace</span>
          </div>
        </div>
        {login && (
          <button
            className="rounded-xl bg-white/15 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/25"
            onClick={handleLogIn}
          >
            Login
          </button>
        )}
        {backBtn && (
          <button
            className="flex items-center gap-2 rounded-xl bg-white/15 px-3 py-2 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/25"
            onClick={handleShowBackBtn}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        )}

        {user && !hideButtons && (
          <div className="flex items-center justify-center">
            <div className="mr-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-sm font-bold text-white ring-1 ring-white/25">
              <button className="" onClick={handleIconClick}>
                {username}
              </button>
            </div>
            <button
              className="z-50 rounded-xl bg-white/15 p-2 ring-1 ring-white/20 transition hover:bg-white/25 lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
