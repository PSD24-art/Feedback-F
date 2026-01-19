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
      <div className="w-full flex items-center justify-center">
        <div className="mt-18 max-w-md mx-4 bg-white rounded-xl shadow-lg p-8 border-2 border-red-200">
          <h2 className="text-2xl font-bold text-center text-basic_color mb-6 border-b-2 pb-2">
            Change Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Old Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Enter New Password
              </label>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  ref={newPasswordRef}
                  placeholder="Enter old password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Verify New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  ref={verifyNewPasswordRef}
                  placeholder="Enter new password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-basic_color text-white font-semibold rounded-lg 
              hover:bg-orange-700 transition shadow-md"
            >
              Reset Password
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-500 text-center">
            Make sure your new password is strong and unique.
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
