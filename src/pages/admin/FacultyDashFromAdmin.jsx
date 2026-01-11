import { use, useEffect, useState } from "react";
import withLoader from "../../utils/withLoader";
import Loader from "../../components/utilityComponents/Loader";
import fetchFn from "../../utils/fetchFn";
import Dashboard from "../../components/Dashboard";

const FacultyDashFromAdmin = ({ adminId, facultyId }) => {
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
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [loading, setLoading] = useState(false);

  /* 🔹 TERM STATE */
  const [terms, setTerms] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState("ALL");

  /* ---------------------------------------------
     2️⃣ Fetch TERMS ONLY (generic dashboard route)
  ----------------------------------------------*/
  useEffect(() => {
    if (!facultyId) return;

    withLoader(async () => {
      const data = await fetchFn(`/dashboard/${facultyId}/terms`, "GET");

      setTerms(data.terms || []);
      setSelectedTerm("ALL"); // reset on faculty change
    }, setLoading);
  }, [facultyId]);

  /* ---------------------------------------------
     3️⃣ Fetch Faculty DASHBOARD DATA based on TERM
  ----------------------------------------------*/
  useEffect(() => {
    if (!facultyId || !selectedTerm) return;

    withLoader(async () => {
      const data = await fetchFn(
        `/admin/${adminId}/faculties/${facultyId}/${selectedTerm}`,
        "GET"
      );

      // console.log("From term", data);

      setSubjects(data.links || []);
      setRatings(data.ratingObjects || []);
      setcriteriaObj(data.ratings || []);
      setFacultyData(data.faculty);
      setTotalRating(data.totalRating || 0);
      setSubRatingsAi(data.ratingsForAi || {});
      // default subject selection
      if (data.links?.length > 0) {
        setSelectedSubjectId(data.links[0].subject._id);
        setLimit(data.links[0].limit || 0);
      } else {
        setSelectedSubjectId("");
        setLimit(0);
      }
    }, setLoading);
  }, [facultyId, selectedTerm, adminId]);

  /*Get feedback Count*/

  useEffect(() => {
    withLoader(async () => {
      const data = await fetchFn(
        `/admin/${adminId}/faculties/${facultyId}/feedback/${selectedSubjectId}`,
        "GET"
      );

      // console.log("Data from count call", data);

      setCount(data.FeedbackLength || 0);
      setRatingPercentage(data.ratingPercentage || {});
      setCriteriaRatingsAi(data.criteriaRatingsAi || {});
      setcriteriaObj(data.ratings || []);
    }, setLoading);
  }, [adminId, facultyId, selectedSubjectId, terms]);

  /* ---------------------------------------------
     AI SUMMARY
  ----------------------------------------------*/
  const handleGenerateSummary = async () => {
    if (!facultyData) return;

    withLoader(async () => {
      const data = await fetchFn(
        `/admin/${adminId}/faculty-summary`,
        "POST",
        JSON.stringify({
          facultyName: facultyData.name,
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
      <Dashboard
        facultyData={facultyData}
        subjects={subjects}
        ratings={ratings}
        totalRating={totalRating}
        criteriaObj={criteriaObj}
        ratingPercentage={ratingPercentage}
        count={count}
        limit={limit}
        selectedSubjectId={selectedSubjectId}
        setSelectedSubjectId={setSelectedSubjectId}
        aiSummary={aiSummary}
        handleGenerateSummary={handleGenerateSummary}
        /* 🔹 TERM PROPS */
        terms={terms}
        selectedTerm={selectedTerm}
        setSelectedTerm={setSelectedTerm}
      />
    </>
  );
};

export default FacultyDashFromAdmin;
