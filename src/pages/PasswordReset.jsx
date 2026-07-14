import { useState, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import withLoader from "../utils/withLoader";
import Loader from "../components/utilityComponents/Loader";
import fetchFn from "../utils/fetchFn";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const PasswordReset = ({ setIsOpen }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const oldPassRef = useRef();
  const newPassRef = useRef();

  // Password visibility toggles
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  setIsOpen(true);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!confirm("Please ensure you will remember your password")) return;

    const oldPassword = oldPassRef.current.value.trim();
    const newPassword = newPassRef.current.value.trim();

    if (!oldPassword || !newPassword) {
      alert("Both fields are required!");
      return;
    }

    withLoader(async () => {
      try {
        const data = await fetchFn(
          `/change-password/${id}`,
          "POST",
          JSON.stringify({ oldPassword, newPassword }),
        );

        if (data.error) {
          alert("Incorrect old password.");
          return;
        }

        alert("Password changed successfully");

        if (data.role === "admin") {
          navigate(`/admin/${id}`);
        } else if (data.role === "faculty") {
          navigate(`/faculty/${id}`);
        } else if (data.role === "superAdmin") {
          navigate(`/sAdmin/${id}`);
        }
      } catch (error) {
        console.error("Password reset error:", error.message);
        alert("Something went wrong! Please try again.");
      }
    }, setLoading);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="flex min-h-[calc(100vh-12rem)] w-full items-center justify-center px-4 py-10">
        <div className="panel-card w-full max-w-md p-6 sm:p-8">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-rose-600">Account security</p>
          <h2 className="mb-6 mt-1 text-center text-2xl font-extrabold text-slate-800">
            Reset Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Old Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Old Password
              </label>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  ref={oldPassRef}
                  placeholder="Enter old password"
                  className="basic_input pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-400 transition hover:text-rose-700"
                >
                  {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  ref={newPassRef}
                  placeholder="Enter new password"
                  className="basic_input pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-400 transition hover:text-rose-700"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="basic_button mt-0 w-full py-3"
            >
              Reset Password
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Make sure your new password is strong and unique.
          </p>
        </div>
      </div>
    </>
  );
};

export default PasswordReset;
