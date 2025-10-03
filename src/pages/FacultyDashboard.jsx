import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import withLoader from "../utils/withLoader";
import Loader from "../components/Loader";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const FacultyDashboard = () => {
  const [facultyData, setFacultyData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    withLoader(async () => {
      try {
        const res = await fetch(`${BASE_URL}/faculties/${id}/feedback`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        console.log("Fetched from facultyy dashboard:", data.links);
        setSubjects(data.links);
      } catch (err) {
        console.error("Failed to fetch links", err);
      }
    }, setLoading);
  }, []);

  useEffect(() => {
    withLoader(async () => {
      const res = await fetch(`${BASE_URL}/faculties/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log("Faculty Data", data.faculty);
      setFacultyData(data.faculty);
      if (!data.faculty.isPasswordSet) {
        navigate(`/change-password/${id}`);
      }
    }, setLoading);
  }, []);

  const handleOnClick = () => {
    navigate(`/faculty/${id}/form`);
  };

  const handleOnChange = async () => {
    console.log("select option changed");
    const subjectId = document.getElementById("linkSubject").value;
    console.log(subjectId);
    withLoader(async () => {
      const res = await fetch(
        `${BASE_URL}/faculties/${id}/count/${subjectId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log("All feedbacks", data);
      setCount(data.FeedbackLength);
    }, setLoading);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="mt-16 ps-2 pe-2">
        {facultyData && (
          <h2 className="text-2xl font-bold text-orange-600 mb-6">
            Welcome, {facultyData.name}
          </h2>
        )}

        {facultyData ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Analytics Card */}
            <div className="bg-white border-2 border-orange-200 rounded-lg shadow-md p-6 hover:shadow-lg hover:border-orange-400 transition flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Faculty Analytics
                </h3>
                <select
                  id="linkSubject"
                  className="h-8 px-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  onChange={handleOnChange}
                >
                  <option value="Select Subject">Select Subject</option>
                  {subjects &&
                    subjects.map((link) => (
                      <option key={link._id} value={link.subject._id}>
                        {link.subject.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mb-3 text-sm font-medium text-gray-700">
                Count:{" "}
                <span className="text-orange-600 font-bold">{count}</span>
              </div>

              <div className="flex-grow flex items-center justify-center text-gray-500 text-sm border border-dashed border-orange-300 rounded-md p-6">
                No Data to show
              </div>
            </div>

            {/* Faculty Info Card */}
            <div className="bg-white border-2 border-orange-200 rounded-lg shadow-md p-6 hover:shadow-lg hover:border-orange-400 transition">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Faculty Details
              </h3>
              <p className="text-gray-700 mb-2">
                <span className="font-medium text-orange-600">Name:</span>{" "}
                {facultyData.name}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-medium text-orange-600">Department:</span>{" "}
                {facultyData.department}
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-medium text-orange-600">Email:</span>{" "}
                {facultyData.email}
              </p>

              <div className="flex justify-center">
                <button
                  onClick={handleOnClick}
                  className="hover:cursor-pointer px-4 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
                >
                  Feedback Form
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default FacultyDashboard;
