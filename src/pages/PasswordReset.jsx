import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import withLoader from "../utils/withLoader";
import Loader from "../components/Loader";
import fetchFn from "../utils/fetchFn";
const PasswordReset = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const oldPassRef = useRef();
  const newPassRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    confirm("Please ensure you will remember your password");
    const oldPassword = oldPassRef.current.value;
    const newPassword = newPassRef.current.value;
    withLoader(async () => {
      try {
        const data = await fetchFn(
          `/change-password/${id}`,
          "POST",
          JSON.stringify({ oldPassword, newPassword })
        );
  
        if (data.role) {
          alert("Password changed successfully");
        } else if (data.error) {
          alert("Incorrect Old Password");
        }

        if (data.role === "admin") {
          navigate(`/admin/${id}`);
        } else if (data.role === "faculty") {
          navigate(`/faculty/${id}`);
        }
      } catch (e) {
        console.log(e.message);
      }
    }, setLoading);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="mt-12 max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 border border-orange-200">
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Old Password
            </label>
            <input
              type="password"
              ref={oldPassRef}
              placeholder="Enter old password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              New Password
            </label>
            <input
              type="password"
              ref={newPassRef}
              placeholder="Enter new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-orange-600 text-white font-semibold rounded-lg 
      hover:bg-orange-700 transition shadow-md"
          >
            Reset Password
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-500 text-center">
          Make sure your new password is strong and unique.
        </p>
      </div>
    </>
  );
};
export default PasswordReset;
