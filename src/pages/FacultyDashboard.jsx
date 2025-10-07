import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import withLoader from "../utils/withLoader";
import Loader from "../components/Loader";
import BasicBars from "../charts/barGraph";
import FacultyFeedbackChart from "../charts/HorizontallBars";
import fetchFn from "../utils/fetchFn";
import "../App.css";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const FacultyDashboard = () => {
  const [facultyData, setFacultyData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ratings, setRatings] = useState();
  const [criteriaObj, setcriteriaObj] = useState([]);
  const [totalRating, setTotalRating] = useState();

  useEffect(() => {
    withLoader(async () => {
      const data = await fetchFn(`/faculty/${id}/feedback`, "GET");
      console.log("data from fetchFn: ", data);
      setSubjects(data.links);
    }, setLoading);
  }, [id]);

  useEffect(() => {
    withLoader(async () => {
      const res = await fetch(`${BASE_URL}/faculty/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log("Faculty Data", data);
      setFacultyData(data.faculty);
      setRatings(data.ratingObjects);
      setTotalRating(data.totalRating);
      if (!data.faculty.isPasswordSet) {
        navigate(`/change-password/${id}`);
      }
    }, setLoading);
  }, [id]);

  const handleOnClick = () => {
    navigate(`/faculty/${id}/form`);
  };

  const handleOnChange = async () => {
    console.log("select option changed");
    const subjectId = document.getElementById("linkSubject").value;
    console.log(subjectId);
    withLoader(async () => {
      const res = await fetch(`${BASE_URL}/faculty/${id}/count/${subjectId}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log("All feedbacks", data);
      setcriteriaObj(data.ratings);
      setCount(data.FeedbackLength);
    }, setLoading);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="w-full mt-16 ps-2 pe-2">
        {facultyData && (
          <h2 className="usernameAnimation bg-white mt-2 mb-2 border-amber-500 left-5  text-2xl font-bold text-orange-600 ">
            Welcome, {facultyData.name}
          </h2>
        )}

        {facultyData ? (
          <div className="">
            {/* Analytics Card */}
            <div className=" bg-white border-2 border-orange-200 rounded-lg shadow-md p-6 hover:shadow-lg hover:border-orange-400 transition flex flex-col">
              <div className="mt-10 flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  Faculty Analytics{" "}
                  <span>{totalRating && `⭐${totalRating}`}</span>
                  <span
                    className={`text-red-700 bg-amber-100 ms-2 ps-2 pe-2 live rounded-sm`}
                  >
                    Live
                  </span>
                </h3>
              </div>
              <div className="mb-3 text-sm font-medium text-gray-700">
                Count:{" "}
                <span className="text-orange-600 font-bold">{count}</span>
              </div>
              <div className="grid lg:grid-cols-3 gap-2 md:grid-cols-2 sm:gird-cols-1">
                <div className="flex-grow flex-col flex items-center justify-center text-gray-500 text-sm border border-dashed border-orange-300 rounded-md p-3 ">
                  <div className="font-bold text-xl">
                    Average ratings for each subject
                  </div>
                  {ratings && <BasicBars ratings={ratings} />}
                </div>
                <div className="flex-grow flex flex-col items-center justify-between text-gray-500 text-sm border border-dashed border-orange-300 rounded-md p-3 ">
                  <div className="mb-3 flex w-full justify-between items-center">
                    {" "}
                    <label htmlFor="linkSubject"> Subject: </label>
                    <select
                      id="linkSubject"
                      className="w-30 h-6 px-2 border rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-orange-400"
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

                  {criteriaObj && criteriaObj.length > 0 ? (
                    <FacultyFeedbackChart criteriaObj={criteriaObj} />
                  ) : (
                    <div className="text-gray-500 text-sm">
                      Select a subject to view detailed feedback.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Faculty Info Card */}
            <div className="bg-white border-2 border-orange-200 rounded-lg shadow-md p-6 hover:shadow-lg hover:border-orange-400 transition mt-2">
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
