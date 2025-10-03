import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import withLoader from "../utils/withLoader";
import Loader from "../components/Loader";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const FacultyDashFromAdmin = () => {
  const { id, facultyId, subject } = useParams();
  const [count, setCount] = useState();
  console.log(id);
  const [facultyData, setFacultyData] = useState();
  const [subjects, setSubjects] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    withLoader(async () => {
      const res = await fetch(`${BASE_URL}/admin/faculties/${facultyId}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log("Individual Faculty: ", data);
      setFacultyData(data.faculty);
    }, setLoading);
  }, []);

  useEffect(() => {
    withLoader(async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/admin/faculties/${facultyId}/links`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await res.json();
        console.log("Fetched from facultyy dashboard:", data.links);
        setSubjects(data.links);
      } catch (err) {
        console.error("Failed to fetch links", err);
      }
    }, setLoading);
  }, []);

  const handleOnChange = async () => {
    console.log("select option changed");
    const subjectId = document.getElementById("linkSubject").value;
    console.log(subjectId);
    withLoader(async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/admin/faculties/${facultyId}/feedback/${subjectId}`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await res.json();
        console.log("Feedbacks: ", data);
        setCount(data.FeedbackLength);
      } catch (e) {
        console.log(e.message);
      }
    }, setLoading);
  };

  const handleDeleteFaculty = async () => {
    const confirmed = confirm("Really want to delete the faculty");
    if (!confirmed) return;
    withLoader(async () => {
      const res = await fetch(`${BASE_URL}/admin/faculties/${facultyId}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      alert(data.message);
      navigate(`/admin/${id}`);
    }, setLoading);
  };
  return (
    <>
      {loading && <Loader />}
      {facultyData && (
        <h2 className="mt-6 text-2xl font-cursive text-orange-600 font-bold text-center">
          {facultyData.name}
        </h2>
      )}

      {facultyData ? (
        <div className="space-y-6 p-3 sm:p-0">
          {/* Faculty Analytics Card */}
          <div className="relative w-full min-h-[200px] sm:h-[calc(100dvh-500px)] mb-4 flex flex-col bg-white border-2 border-orange-200 rounded-lg shadow-md p-3 sm:p-4">
            {/* Header with dropdown */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-3">
              <h2 className="text-lg sm:text-xl font-semibold text-orange-600">
                Faculty Analytics
              </h2>
              <select
                id="linkSubject"
                onChange={handleOnChange}
                className="h-9 px-3 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none w-full sm:w-auto"
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

            {/* Count Badge (absolute for desktop, inline for mobile) */}
            {/* Mobile inline */}
            <div className="sm:hidden mb-3 bg-orange-100 text-orange-700 font-medium px-3 py-1 rounded-lg shadow-sm w-fit">
              Count: <span>{count}</span>
            </div>
            {/* Desktop absolute */}
            <div className="hidden sm:block absolute top-12 left-4 bg-orange-100 text-orange-700 font-medium px-3 py-1 rounded-lg shadow-sm">
              Count: <span>{count}</span>
            </div>

            {/* Analytics Data Section */}
            <div className="flex justify-center items-center flex-1 border-2 border-orange-300 rounded-lg bg-orange-50 text-gray-600 font-medium">
              No Data to show
            </div>
          </div>

          {/* Faculty Details Card */}
          <div className="bg-white border-2 border-orange-200 rounded-lg shadow-md p-4">
            <p className="mt-2 text-gray-800">
              <span className="font-semibold text-orange-600">Name:</span>{" "}
              {facultyData.name}
            </p>
            <p className="mt-2 text-gray-800">
              <span className="font-semibold text-orange-600">Department:</span>{" "}
              {facultyData.department}
            </p>
            <p className="mt-2 text-gray-800">
              <span className="font-semibold text-orange-600">Email:</span>{" "}
              {facultyData.email}
            </p>
          </div>

          {/* Delete Button */}
          <div className="flex justify-center">
            <button
              onClick={handleDeleteFaculty}
              className="bg-red-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition active:scale-95"
            >
              Delete Faculty
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FacultyDashFromAdmin;
