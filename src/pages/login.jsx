import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../store/AuthProvider";
import withLoader from "../utils/withLoader";
import Loader from "../components/utilityComponents/Loader";
import fetchFn from "../utils/fetchFn";
import ForgotPassword from "../components/ForgotPassword";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const Login = () => {
  const otpRef = useRef();
  const emailRef = useRef();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);
  const [user, setUser] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

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

  //Handle Forgot Password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const otp = otpRef.current.value;

    //after verification
    withLoader(async () => {
      const data = await fetchFn(
        `/verify-otp`,
        "POST",
        JSON.stringify({ email, otp }),
      );

      if (data?.error) {
        alert(`${data.error}`);
        setIsDisabled(false);
      }

      if (data?.message) {
        console.log(data);
        setUser(data.user);
        setShowForgotPassword(true);
      }
    }, setLoading);
  };

  //handleSendOtp
  const handleSendOtp = async () => {
    setIsDisabled(true);
    const email = emailRef.current.value;

    withLoader(async () => {
      const data = await fetchFn(
        `/send-otp`,
        "POST",
        JSON.stringify({ email }),
      );

      if (data?.error) {
        alert(`${data.error}`);
        setIsDisabled(false);
      }

      if (data?.message) {
        console.log(data);
        alert(`${data.message}`);
        setIsDisabled(true);
      }
    }, setLoading);
  };

  return (
    <>
      {loading && <Loader />}
      <div
        className={`${forgotPass || showForgotPassword ? "hidden" : ""} flex justify-center items-center w-full h-dvh  flex-col bg-amber-50`}
      >
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

            <div className="flex justify-end items-center">
              <button
                type="button"
                onClick={() => setForgotPass(true)}
                className="text-red-700 hover:cursor-pointer hover:underline hover:underline-offset-3"
              >
                Forgot Password?
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* password reset div */}
      <div
        className={`${!forgotPass || showForgotPassword ? "hidden" : ""} flex justify-center items-center w-full h-dvh  flex-col bg-amber-50`}
      >
        <div className="mb-4 text-2xl font-bold text-red-500">
          Forgot Password
        </div>
        <div className=" bg-white border-2 border-red-300 shadow-lg rounded-xl flex flex-col p-6 w-full max-w-sm">
          <h2 className="mb-4 pb-2 border-b-2 border-red-300 text-basic_color text-2xl font-bold text-center">
            Change Password
          </h2>

          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Your Email"
                ref={emailRef}
                id="email"
                className="basic_input"
                disabled={isDisabled}
              />

              <button
                type="button"
                onClick={handleSendOtp}
                className="text-gray-600 text-sm border p-1 rounded-2xl absolute right-2 top-2 border-red-300 bg-gray-100 hover:bg-gray-300 hover:cursor-pointer"
              >
                Send OTP
              </button>
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter your six digit OTP"
                ref={otpRef}
                id="otp"
                className="basic_input"
              />
            </div>
            <div>
              <button type="submit" className="w-full basic_button">
                Verify
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                setForgotPass(false);
              }}
              className="hover:text-red-600 text-red-400 hover:cursor-pointer"
            >
              Back{"->"}
            </button>
          </form>
        </div>
      </div>

      {showForgotPassword && <ForgotPassword user={user} />}
    </>
  );
};

export default Login;
