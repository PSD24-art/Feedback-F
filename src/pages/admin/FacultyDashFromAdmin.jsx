import { useEffect, useState } from "react";
import withLoader from "../../utils/withLoader";
import Loader from "../../components/utilityComponents/Loader";
import fetchFn from "../../utils/fetchFn";
import Dashboard from "../../components/Dashboard";

const FacultyDashFromAdmin = ({ adminId, facultyId }) => {
  const [facultyData, setFacultyData] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [ratings, setRatings] = useState();
  const [totalRating, setTotalRating] = useState();
  const [criteriaObj, setcriteriaObj] = useState([]);
  const [ratingPercentage, setRatingPercentage] = useState({});
  const [criteriaRatingsAi, setCriteriaRatingsAi] = useState({});
  const [subRatingsAi, setSubRatingsAi] = useState({});
  const [aiSummary, setAiSummary] = useState([]);
  const [count, setCount] = useState();
  const [limit, setLimit] = useState();
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!facultyId) return;

    withLoader(async () => {
      const data = await fetchFn(
        `/admin/${adminId}/faculties/${facultyId}`,
        "GET"
      );
      setFacultyData(data.faculty);
      setRatings(data.ratingObjects);
      setTotalRating(data.totalRating);
      setSubRatingsAi(data.ratingsForAi);
    }, setLoading);
  }, [facultyId]);

  useEffect(() => {
    withLoader(async () => {
      const data = await fetchFn(
        `/admin/${adminId}/faculties/${facultyId}/links`,
        "GET"
      );
      setSubjects(data.links || []);
      if (data.links?.length > 0) {
        setSelectedSubjectId(data.links[0].subject._id);
        setLimit(data.links[0].limit || 0);
      }
    }, setLoading);
  }, [facultyId]);

  useEffect(() => {
    if (!selectedSubjectId) return;

    withLoader(async () => {
      const data = await fetchFn(
        `/admin/${adminId}/faculties/${facultyId}/feedback/${selectedSubjectId}`,
        "GET"
      );
      setRatingPercentage(data.ratingPercentage);
      setcriteriaObj(data.ratings);
      setCount(data.FeedbackLength);
      setCriteriaRatingsAi(data.criteriaRatingsAi);
    }, setLoading);
  }, [selectedSubjectId]);

  const handleGenerateSummary = async () => {
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
      setAiSummary(data.points);
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
      />
    </>
  );
};

export default FacultyDashFromAdmin;
