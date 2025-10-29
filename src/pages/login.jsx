import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../store/AuthProvider";
import withLoader from "../utils/withLoader";
import Loader from "../components/utilityComponents/Loader";
const Login = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    try {
      withLoader(async () => {
        const data = await login({ username, password });
        const id = data.user.id;
        // console.log("Base URL →", import.meta.env.VITE_BASE_URL);

        if (data.user.role === "admin") {
          navigate(`/admin/${id}`);
        } else if (data.user.role === "faculty") {
          navigate(`/faculty/${id}`);
        } else if (data.user.role === "superAdmin") {
          navigate(`/sAdmin/${id}`);
        }
      }, setLoading);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="flex justify-center items-center w-full h-dvh  flex-col bg-amber-50">
        <div className="mb-4 text-2xl font-bold text-red-500">
          Welcome back!
        </div>
        <div className=" bg-white border-2 border-red-300 shadow-lg rounded-xl flex flex-col p-6 w-full max-w-sm">
          <h2 className="mb-4 pb-2 border-b-2 border-red-300 text-basic_color text-2xl font-bold text-center">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                ref={usernameRef}
                id="username"
                className="basic_input"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                ref={passwordRef}
                id="password"
                className="basic_input"
              />
            </div>
            <div>
              <button type="submit" className="w-full basic_button">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
