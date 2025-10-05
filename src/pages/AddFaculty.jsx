import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import withLoader from "../utils/withLoader";
import Loader from "../components/Loader";

const AddFaculty = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const nameRef = useRef();
  const emailRef = useRef();
  const deptRef = useRef();
  const navigate = useNavigate();
  const instituteRef = useRef();
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const department = deptRef.current.value;

    if (
      !confirm(`You are going to add ${name} in database, click ok to confirm`)
    )
      return;

    await withLoader(async () => {
      try {
        const res = await fetch(`${BASE_URL}/admin/${id}/faculties/new`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, department }),
        });

        const data = await res.json();
        console.log("Response data:", data);

        if (res.ok) {
          alert("Faculty added successfully");
          navigate(`/admin/${id}`);
        } else {
          alert(`Error: ${data.error || data.message}`);
        }
      } catch (err) {
        console.error("Fetch failed:", err);
        alert("Something went wrong while adding faculty");
      }
    }, setLoading);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="mt-15 flex justify-center items-center ps-3 pe-3 flex-col ">
        <h2 className="text-xl text-center font-bold text-orange-500 mt-4 mb-2">
          Enter Faculty Details
        </h2>
        <form
          onSubmit={handleOnSubmit}
          className="bg-white shadow-md rounded-xl p-6 w-full max-w-md space-y-6 border-1 border-amber-100"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Faculty Name
            </label>
            <input
              type="text"
              ref={nameRef}
              placeholder="Enter full name"
              required
              className="w-full p-2 border-2 border-orange-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Faculty Email
            </label>
            <input
              type="email"
              ref={emailRef}
              placeholder="Enter email"
              required
              className="w-full p-2 border-2 border-orange-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <select
              ref={deptRef}
              id="department"
              required
              className=" focus:border-blue-500  px-4 py-2 text-gray-800 w-full p-2 border-2 border-orange-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
            >
              <option value="CS">Computer Science</option>
              <option value="CE">Civil Engineering</option>
              <option value="EE">Electrical Engineering</option>
              <option value="ME">Mechanical Engineering</option>
              <option value="EC">Electronics and Telecommunication</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white font-medium py-2 rounded-lg shadow hover:bg-orange-700 transition"
          >
            Add Faculty
          </button>
          <div className="flex justify-end ">
            <button
              onClick={() => navigate(`/admin/${id}`)}
              className="hover:cursor-pointer px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default AddFaculty;
