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
import { Typewriter } from "react-simple-typewriter";
import Dashboard from "../components/Dashboard";

const FacultyDashboard = () => {
  const { user } = useAuth();
  console.log("user: ", user);

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

  //AI summary generator
  const handleGenerateSummary = async () => {
    withLoader(async () => {
      const data = await fetchFn(
        `/faculty/${id}/faculty-summary`,
        "POST",
        JSON.stringify({
          facultyName: user.name,
          criteriaAnalysis: criteriaRatingsAi,
          subjectAnalysis: subRatingsAi,
        })
      );
      setAiSummary(data.summary);
    }, setLoading);
  };

  useEffect(() => {
    withLoader(async () => {
      const data = await fetchFn(`/faculty/${id}/feedback`, "GET");
      setSubjects(data.links);
    }, setLoading);
  }, [id]);

  useEffect(() => {
    withLoader(async () => {
      const data = await fetchFn(`/faculty/${id}`, "GET");
      setFacultyData(data.faculty);
      setRatings(data.ratingObjects);
      setTotalRating(data.totalRating);
      setSubRatingsAi(data.ratingsForAi);
      if (!data.faculty.isPasswordSet) {
        navigate(`/change-password/${id}`);
      }
    }, setLoading);
  }, [id]);

  const [selectedSubjectId, setSelectedSubjectId] = useState("");

  useEffect(() => {
    if (subjects.length > 0 && !selectedSubjectId) {
      setSelectedSubjectId(subjects[0].subject._id);
    }
  }, [subjects]);

  useEffect(() => {
    if (!selectedSubjectId) return;
    withLoader(async () => {
      const data = await fetchFn(
        `/faculty/${id}/count/${selectedSubjectId}`,
        "GET"
      );
      console.log("Criteria ratings data: ", data);

      setcriteriaObj(data.ratings);
      setCount(data.FeedbackLength);
      setCriteriaRatingsAi(data.criteriaRatingsAi);
    }, setLoading);
  }, [selectedSubjectId]);

  return (
    <>
      {loading && <Loader />}
      <div className="w-full mt-16 ps-2 pe-2 mb-2">
        {facultyData ? (
          <div className="">
            {/* Analytics Card */}
            <Dashboard
              totalRating={totalRating}
              facultyData={facultyData}
              count={count}
              subjects={subjects}
              ratings={ratings}
              selectedSubjectId={selectedSubjectId}
              setSelectedSubjectId={setSelectedSubjectId}
              criteriaObj={criteriaObj}
              aiSummary={aiSummary}
              handleGenerateSummary={handleGenerateSummary}
            />
          </div>
        ) : null}
      </div>
      {/* <div className="items-center mt-5 flex justify-center">
        <button onClick={handleOnClick} className="basic_button">
          Feedback Form
        </button>
      </div> */}
    </>
  );
};

export default FacultyDashboard;
