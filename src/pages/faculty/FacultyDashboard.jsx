import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import withLoader from "../../utils/withLoader";
import Loader from "../../components/utilityComponents/Loader";
import fetchFn from "../../utils/fetchFn";
import "../../App.css";
import useAuth from "../../store/AuthProvider";
import Dashboard from "../../components/Dashboard";

const FacultyDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [facultyData, setFacultyData] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [totalRating, setTotalRating] = useState(0);
  const [criteriaObj, setcriteriaObj] = useState([]);
  const [ratingPercentage, setRatingPercentage] = useState({});
  const [criteriaRatingsAi, setCriteriaRatingsAi] = useState({});
  const [subRatingsAi, setSubRatingsAi] = useState({});
  const [aiSummary, setAiSummary] = useState([]);
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(0);
  const [loading, setLoading] = useState(false);

  /* 🔹 TERM STATE */
  const [terms, setTerms] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState("ALL");

  /* 🔹 SUBJECT STATE */
  const [selectedSubjectId, setSelectedSubjectId] = useState("");

  /* ---------------------------------------------
     1️⃣ Fetch ALL TERMS (generic dashboard route)
  ----------------------------------------------*/
  useEffect(() => {
    if (!id) return;

    withLoader(async () => {
      const data = await fetchFn(`/dashboard/${id}/terms`, "GET");
      setTerms(data.terms || []);
      setSelectedTerm("ALL");
    }, setLoading);
  }, [id]);

  /* ---------------------------------------------
     2️⃣ Fetch DASHBOARD DATA based on TERM
  ----------------------------------------------*/
  useEffect(() => {
    if (!id || !selectedTerm) return;

    withLoader(async () => {
      const url = `/faculty/${id}/${selectedTerm}`;
      const data = await fetchFn(url, "GET");
      console.log(data);
      setSubjects(data.links || []);
      setFacultyData(data.faculty);
      setRatings(data.ratingObjects || []);
      setTotalRating(data.totalRating || 0);
      setSubRatingsAi(data.ratingsForAi || {});

      if (!data.faculty?.isPasswordSet) {
        navigate(`/change-password/${id}`);
      }

      if (data.links?.length > 0) {
        setSelectedSubjectId(data.links[0].subject._id);
        setLimit(data.links[0].limit || 0);
      } else {
        setSelectedSubjectId("");
        setLimit(0);
      }
    }, setLoading);
  }, [id, selectedTerm, navigate]);

  /* ---------------------------------------------
     3️⃣ Fetch SUBJECT-SPECIFIC DATA
  ----------------------------------------------*/
  useEffect(() => {
    if (!selectedSubjectId) return;

    withLoader(async () => {
      const data = await fetchFn(
        `/faculty/${id}/count/${selectedSubjectId}/${selectedTerm}`,
        "GET"
      );

      setRatingPercentage(data.ratingPercentage || {});
      setcriteriaObj(data.ratings || []);
      setCount(data.FeedbackLength || 0);
      setCriteriaRatingsAi(data.criteriaRatingsAi || {});
    }, setLoading);
  }, [selectedSubjectId, id]);

  /* ---------------------------------------------
     AI SUMMARY
  ----------------------------------------------*/
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
      setAiSummary(data.points || []);
    }, setLoading);
  };

  if (!facultyData) return <Loader />;

  return (
    <>
      {loading && <Loader />}
      <div className="w-full mt-4 px-2 h-[94vh]">
        <Dashboard
          /* Core */
          facultyData={facultyData}
          subjects={subjects}
          ratings={ratings}
          totalRating={totalRating}
          criteriaObj={criteriaObj}
          ratingPercentage={ratingPercentage}
          count={count}
          limit={limit}
          /* Subject */
          selectedSubjectId={selectedSubjectId}
          setSelectedSubjectId={setSelectedSubjectId}
          /* AI */
          aiSummary={aiSummary}
          handleGenerateSummary={handleGenerateSummary}
          /* 🔹 TERM SUPPORT */
          terms={terms}
          selectedTerm={selectedTerm}
          setSelectedTerm={setSelectedTerm}
        />
      </div>
    </>
  );
};

export default FacultyDashboard;
