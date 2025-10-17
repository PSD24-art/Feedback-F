import useAuth from "../store/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import withLoader from "../utils/withLoader";
import { useEffect, useState } from "react";
import Loader from "./Loader";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { Menu, X } from "lucide-react";

const Header = ({ isOpen, setIsOpen }) => {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [login, setLogin] = useState(true);
  let username;

  useEffect(() => {
    if (location.pathname === "/") {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [location.pathname]);

  const handleLogIn = async () => {
    navigate("/login");
  };

  if (user) {
    username = user.username.charAt(0).toUpperCase();
  }

  const handlLogOut = async () => {
    withLoader(async () => {
      const confirmed = confirm("Are you sure want to log out");
      if (!confirmed) return;
      await logout();
      navigate("/login");
    }, setLoading);
  };

  // Check if current path matches /faculty/:id/feedback/:subject
  const hideButtons =
    /^\/faculty\/[^/]+\/feedback\/[^/]+$/.test(location.pathname) ||
    /^\/feedback\/sent$/.test(location.pathname);
  let institute;
  if (user) {
    institute = user.Institute.name.split(" ").splice(0, 1);
  } else {
    institute = "feedback_guru";
  }

  return (
    <>
      {loading && <Loader />}
      <div className=" bg-basic_color fixed top-0 min-w-full h-[7%] flex justify-between items-center shadow z-100">
        <div className="text-3xl text-white p-1 flex flex-row text-center items-center justify-center ms-3 great-vibes-regular">
          {institute}
        </div>
        {login && (
          <button
            className="flex items-center gap-2 h-10 me-4 justify-center px-4 text-white font-semibold rounded-lg  active:scale-95 bg-red-500 hover:bg-orange-700 transition duration-200 hover:cursor-pointer"
            onClick={handleLogIn}
          >
            Login
          </button>
        )}

        {user && !hideButtons && (
          <div className="flex items-center justify-center">
            <div className=" hover:border-2 hover:border-white w-10 text-2xl flex h-10 me-2 justify-center items-center rounded-full transition duration-200 text-white bg-pink-500">
              <button className="">{username}</button>
            </div>
            <button
              className=" me-2 z-50 lg:hidden bg-amber-20 bg-red-500 hover:bg-orange-700 p-2 rounded-md transition-all"
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
      </div>
    </>
  );
};

export default Header;
