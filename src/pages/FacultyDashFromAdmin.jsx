import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import withLoader from "../utils/withLoader";
import Loader from "../components/Loader";
import BasicBars from "../charts/barGraph";
import FacultyFeedbackChart from "../charts/HorizontallBars";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const FacultyDashFromAdmin = () => {
  const { id, facultyId, subject } = useParams();
  const [count, setCount] = useState();
  const [facultyData, setFacultyData] = useState();
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [ratings, setRatings] = useState();
  const [totalRating, setTotalRating] = useState();
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [criteriaObj, setcriteriaObj] = useState([]);

  useEffect(() => {
    withLoader(async () => {
      const res = await fetch(
        `${BASE_URL}/admin/${id}/faculties/${facultyId}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      console.log("Individual Faculty: ", data);
      setFacultyData(data.faculty);
      setRatings(data.ratingObjects);
      setTotalRating(data.totalRating);
    }, setLoading);
  }, []);

  useEffect(() => {
    withLoader(async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/admin/${id}/faculties/${facultyId}/links`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await res.json();
        console.log("Fetched from facultyy dashboard:", data.links);
        setSubjects(data.links);
        console.log("Subject: ", subjects);
      } catch (err) {
        console.error("Failed to fetch links", err);
      }
    }, setLoading);
  }, []);

  //setSUbjecId redering without selecting

  useEffect(() => {
    if (subjects.length > 0 && !selectedSubjectId) {
      setSelectedSubjectId(subjects[0].subject._id);
    }
  }, [subjects]);

  useEffect(() => {
    if (!selectedSubjectId) return;
    withLoader(async () => {
      const res = await fetch(
        `${BASE_URL}/admin/${id}/faculties/${facultyId}/feedback/${selectedSubjectId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      setcriteriaObj(data.ratings);
      setCount(data.FeedbackLength);
    }, setLoading);
  }, [selectedSubjectId]);

  const handleOnChange = async () => {
    console.log("select option changed");
    const subjectId = document.getElementById("linkSubject").value;
    console.log(subjectId);
    withLoader(async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/admin/${id}/faculties/${facultyId}/feedback/${subjectId}`,
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
      const res = await fetch(
        `${BASE_URL}/admin/${id}/faculties/${facultyId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      alert(data.message);
      navigate(`/admin/${id}`);
    }, setLoading);
  };
  return (
    <>
      {loading && <Loader />}

      <div className="w-full mt-16 ps-2 pe-2">
        {facultyData && (
          <h2 className="bg-white mt-2 mb-2 text-2xl font-bold text-orange-600 text-center">
            {facultyData.name}{" "}
            <span>{isNaN(totalRating) ? "⭐--" : `⭐${totalRating}`}</span>
          </h2>
        )}

        {facultyData ? (
          <div className="">
            {/* Analytics Card */}
            <div className="bg-white border-2 border-orange-200 rounded-lg shadow-md p-4 pt-1 hover:shadow-lg hover:border-orange-400 transition flex flex-col mb-4">
              <div className="mt-2 flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  Faculty Analytics
                </h3>
              </div>

              {subjects && subjects.length > 0 ? (
                <div className="grid lg:grid-cols-3 gap-2 md:grid-cols-2 sm:gird-cols-1">
                  <div className="flex-grow flex-col flex items-center justify-between text-gray-500 text-sm border border-dashed border-orange-300 rounded-md p-3">
                    <div className="p-1 text-xl rounded-md mb-3 flex w-full justify-between items-center">
                      Average ratings for each subject
                    </div>
                    {ratings && <BasicBars ratings={ratings} />}
                  </div>

                  <div className="flex-grow flex flex-col items-center justify-between text-gray-500 text-sm border border-dashed border-orange-300 rounded-md p-3">
                    <div className="p-1 rounded-md mb-3 flex w-full justify-between items-center">
                      <label htmlFor="linkSubject" className="font-bold">
                        Subject:
                      </label>
                      <select
                        id="linkSubject"
                        value={selectedSubjectId}
                        disabled={subjects.length <= 1}
                        onChange={(e) => setSelectedSubjectId(e.target.value)}
                        className="w-30 h-6 px-2 border rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        {subjects.map((link) => (
                          <option key={link._id} value={link.subject._id}>
                            {link.subject.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {criteriaObj && criteriaObj.length > 0 ? (
                      <FacultyFeedbackChart criteriaObj={criteriaObj} />
                    ) : null}
                  </div>
                  {}
                  <div className="p-1 rounded-md mb-3 flex w-full justify-between items-center">
                    <p></p>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 text-sm">
                  No subjects or feedbacks received.
                </div>
              )}
            </div>

            {/* Faculty Info Card */}
            <div className="bg-white border-2 border-orange-200 rounded-lg shadow-md p-6 hover:shadow-lg hover:border-orange-400 transition mb-4">
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

              {/* Admin Buttons */}
              <div className="grid grid-cols-2 gap-4 place-items-center">
                <button
                  onClick={handleDeleteFaculty}
                  className=" bg-red-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition active:scale-95 "
                >
                  Delete Faculty
                </button>
                <button
                  onClick={() => navigate(`/admin/${id}`)}
                  className="hover:cursor-pointer px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default FacultyDashFromAdmin;
