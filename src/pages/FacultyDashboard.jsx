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
import useAuth from "../store/AuthProvider";
import GenerateBtn from "../components/generateBtn";

const FacultyDashboard = () => {
  const { user } = useAuth();
  const [facultyData, setFacultyData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ratings, setRatings] = useState();
  const [criteriaObj, setcriteriaObj] = useState([]);
  const [totalRating, setTotalRating] = useState();
  const [criteriaRatingsAi, setCriteriaRatingsAi] = useState({});
  const [subRatingsAi, setSubRatingsAi] = useState({});
  const [aiSummary, setAiSummary] = useState();
  console.log("Recievd user obj: ", user);

  //AI summary generator
  const handleGenerateSummary = async () => {
    withLoader(async () => {
      const res = await fetch(`${BASE_URL}/faculty/${id}/faculty-summary`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          facultyName: user.name,
          criteriaAnalysis: criteriaRatingsAi,
          subjectAnalysis: subRatingsAi,
        }),
      });
      const data = await res.json();
      console.log("summary: ", data);
      setAiSummary(data.summary);
    }, setLoading);
  };

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
      setSubRatingsAi(data.ratingsForAi);
      if (!data.faculty.isPasswordSet) {
        navigate(`/change-password/${id}`);
      }
    }, setLoading);
  }, [id]);

  const handleOnClick = () => {
    navigate(`/faculty/${id}/form`);
  };

  const [selectedSubjectId, setSelectedSubjectId] = useState("");

  useEffect(() => {
    if (subjects.length > 0 && !selectedSubjectId) {
      setSelectedSubjectId(subjects[0].subject._id);
    }
  }, [subjects]);

  useEffect(() => {
    if (!selectedSubjectId) return;
    withLoader(async () => {
      const res = await fetch(
        `${BASE_URL}/faculty/${id}/count/${selectedSubjectId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log("Criteria for AI: ", data.criteriaRatingsAi);

      setcriteriaObj(data.ratings);
      setCount(data.FeedbackLength);
      setCriteriaRatingsAi(data.criteriaRatingsAi);
    }, setLoading);
  }, [selectedSubjectId]);

  return (
    <>
      {loading && <Loader />}
      <div className="w-full mt-16 ps-2 pe-2">
        {facultyData && (
          <h2 className="usernameAnimation bg-white mt-2 mb-2 border-amber-500 left-5  text-2xl font-bold text-orange-600 ">
            Welcome, {facultyData.name}
          </h2>
        )}
        {/* Faculty Info Card */}
        {facultyData && (
          <div className=" border-2 bg-white border-orange-200 rounded-lg shadow-md p-3 hover:shadow-lg hover:border-orange-400 transition mt-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Faculty Details:
            </h3>
            <div className="flex justify-between">
              <p className="text-gray-700 mb-2">
                <span className="font-medium text-orange-600">Department:</span>{" "}
                {facultyData.department}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-medium text-orange-600">Email:</span>{" "}
                {facultyData.email}
              </p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleOnClick}
                className="hover:cursor-pointer px-4 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
              >
                Feedback Form
              </button>
            </div>
          </div>
        )}

        {facultyData ? (
          <div className="">
            {/* Analytics Card */}
            <div className=" bg-white border-2 border-orange-200 rounded-lg shadow-md p-4 pt-1 hover:shadow-lg hover:border-orange-400 transition flex flex-col">
              <div className="mt-2 inline-flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  Faculty Analytics{" "}
                  <span className="ml-2">
                    {isNaN(totalRating) ? "⭐--" : `⭐${totalRating}`}
                  </span>
                  <div className="flex items-center text-red-700 bg-amber-100 ms-2 ps-2 pe-2 rounded-sm">
                    <div className="bg-red-600 w-2 h-2 rounded-full mr-1 live"></div>
                    Live
                  </div>
                </h3>
              </div>

              <div className="mb-3 text-sm font-medium text-gray-700">
                Count:{" "}
                <span className="text-orange-600 font-bold">{count}</span>
              </div>
              {subjects && subjects.length > 0 ? (
                <div className="grid xl:grid-cols-4 lg:grid-cols-2 gap-2 md:grid-cols-2 sm:gird-cols-1">
                  <div className="flex-grow flex-col flex items-center justify-between text-gray-500 text-sm border border-dashed border-orange-300 rounded-md p-3 min-h-96">
                    {/* <div className="font-bold text-xl"></div> */}
                    <div className="p-1 text-xl rounded-md mb-3 flex w-full justify-between items-center">
                      Average ratings for each subject
                    </div>

                    {ratings && <BasicBars ratings={ratings} />}
                  </div>
                  <div className="flex-grow flex flex-col items-center justify-between text-gray-500 text-sm border border-dashed border-orange-300 rounded-md p-3 min-h-96 ">
                    <div className="p-1 rounded-md mb-3 flex w-full justify-between items-center">
                      {" "}
                      <label htmlFor="linkSubject" className="font-bold">
                        {" "}
                        Subject:{" "}
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
                  {/* AI Summary */}
                  <div className="flex-grow flex flex-col items-center justify-evenly text-gray-500 text-sm border border-dashed border-orange-300 rounded-md p-3 min-h-96">
                    <div className="w-45 h-20" onClick={handleGenerateSummary}>
                      <GenerateBtn />
                    </div>

                    {aiSummary && <p> {aiSummary}</p>}
                  </div>
                  <div className="flex-grow flex flex-col items-center justify-evenly text-gray-500 text-sm border border-dashed border-orange-300 rounded-md p-3 min-h-96">
                    <div className="w-45 h-20" onClick={handleGenerateSummary}>
                      <GenerateBtn />
                    </div>

                    {aiSummary && <p> {aiSummary}</p>}
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 text-sm">
                  No subjects or feedbacks recieved.
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default FacultyDashboard;
