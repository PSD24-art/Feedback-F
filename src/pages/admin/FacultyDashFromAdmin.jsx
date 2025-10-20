import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import withLoader from "../../utils/withLoader";
import Loader from "../../components/utilityComponents/Loader";
import BasicBars from "../../charts/barGraph";
import FacultyFeedbackChart from "../../charts/HorizontallBars";
import GenerateBtn from "../../components/generateBtn";
import useAuth from "../../store/AuthProvider";
import fetchFn from "../../utils/fetchFn";
import { Typewriter } from "react-simple-typewriter";
import Dashboard from "../../components/Dashboard";
const FacultyDashFromAdmin = () => {
  const { user } = useAuth();
  const { id, facultyId, subject } = useParams();
  const [count, setCount] = useState();
  const [criteriaRatingsAi, setCriteriaRatingsAi] = useState({});
  const [subRatingsAi, setSubRatingsAi] = useState({});
  const [facultyData, setFacultyData] = useState();
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [ratings, setRatings] = useState();
  const [totalRating, setTotalRating] = useState();
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [criteriaObj, setcriteriaObj] = useState([]);
  const [aiSummary, setAiSummary] = useState();

  useEffect(() => {
    withLoader(async () => {
      const data = await fetchFn(`/admin/${id}/faculties/${facultyId}`, "GET");
      setFacultyData(data.faculty);
      setRatings(data.ratingObjects);
      setTotalRating(data.totalRating);
      setSubRatingsAi(data.ratingsForAi);
    }, setLoading);
  }, []);

  useEffect(() => {
    withLoader(async () => {
      try {
        const data = await fetchFn(
          `/admin/${id}/faculties/${facultyId}/links`,
          "GET"
        );

        if (data.links) {
          setSubjects(data.links);
        }
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
      const data = await fetchFn(
        `/admin/${id}/faculties/${facultyId}/feedback/${selectedSubjectId}`,
        "GET"
      );

      setcriteriaObj(data.ratings);
      setCount(data.FeedbackLength);
      setCriteriaRatingsAi(data.criteriaRatingsAi);
    }, setLoading);
  }, [selectedSubjectId]);
  //AI summary generator
  const handleGenerateSummary = async () => {
    withLoader(async () => {
      const data = await fetchFn(
        `/admin/${id}/faculty-summary`,
        "POST",
        JSON.stringify({
          facultyName: facultyData.name,
          criteriaAnalysis: criteriaRatingsAi,
          subjectAnalysis: subRatingsAi,
        })
      );
      setAiSummary(data.summary);
    }, setLoading);
  };

  const handleDeleteFaculty = async () => {
    const confirmed = confirm("Really want to delete the faculty");
    if (!confirmed) return;
    withLoader(async () => {
      const data = await fetchFn(
        `/admin/${id}/faculties/${facultyId}`,
        "DELETE"
      );
      alert(data.message);
      navigate(`/admin/${id}`);
    }, setLoading);
  };
  return (
    <div className="flex flex-col 0">
      {loading && <Loader />}

      <div className="w-full mt-16 ps-2 pe-2 ">
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
      {/* Admin Buttons */}
      <div className="flex gap-4 justify-center items-center mb-4 pe-4">
        <button
          onClick={handleDeleteFaculty}
          className=" bg-red-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition active:scale-95 "
        >
          Delete Faculty
        </button>
      </div>
    </div>
  );
};

export default FacultyDashFromAdmin;
