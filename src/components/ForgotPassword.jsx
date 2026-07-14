import { useState, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import withLoader from "../utils/withLoader";
import Loader from "../components/utilityComponents/Loader";
import fetchFn from "../utils/fetchFn";

const ForgotPassword = ({ user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const newPasswordRef = useRef();
  const verifyNewPasswordRef = useRef();

  // Password visibility toggles
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPassword = newPasswordRef.current.value;
    const verifyNewPassword = verifyNewPasswordRef.current.value;

    withLoader(async () => {
      const data = await fetchFn(
        `/password/new/${user.id}`,
        "POST",
        JSON.stringify({ newPassword, verifyNewPassword }),
      );

      if (data?.error) {
        alert(`${data.error}`);
      }

      if (data?.success) {
        console.log(data);
        alert(`${data.message}`);
        if (user.role === "admin") {
          navigate(`/admin/${user.id}`);
        } else if (user.role === "faculty") {
          navigate(`/faculty/${user.id}`);
        } else if (user.role === "superAdmin") {
          navigate(`/sAdmin/${user.id}`);
        }
      }
    }, setLoading);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="flex min-h-full w-full items-center justify-center px-4 py-10">
        <div className="panel-card w-full max-w-md p-6 sm:p-8">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-rose-600">Account recovery</p>
          <h2 className="mb-6 mt-1 text-center text-2xl font-extrabold text-slate-800">
            Change Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Old Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Enter New Password
              </label>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  ref={newPasswordRef}
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
                Verify New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  ref={verifyNewPasswordRef}
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

export default ForgotPassword;
