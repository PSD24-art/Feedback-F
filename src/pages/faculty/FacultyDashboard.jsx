import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import withLoader from "../../utils/withLoader";
import fetchFn from "../../utils/fetchFn";
import Dashboard from "../../components/Dashboard";
import useAuth from "../../store/AuthProvider";

const dashboardCache = {};
const feedbackCache = {};
const aiSummaryCache = {};

const FacultyDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [aiSpinner, setAiSpinner] = useState(false);

  const [terms, setTerms] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState("");

  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [limit, setLimit] = useState(0);

  const [termData, setTermData] = useState({});
  const [feedbackData, setFeedbackData] = useState({});
  const [aiSummary, setAiSummary] = useState([]);

  /* ---------------------- FETCH TERMS + DASHBOARD ---------------------- */

  useEffect(() => {
    if (!id) return;

    setAiSummary([]);

    const fetchDashboard = async () => {
      const cacheKey = `${id}-${selectedTerm}`;

      if (dashboardCache[cacheKey]) {
        const data = dashboardCache[cacheKey];

        setTermData(data);

        return;
      }

      // Terms

      const termRes = await fetchFn(`/dashboard/${id}/terms`, "GET");
      console.log("termRes: ", termRes);
      setTerms(termRes.terms || []);
      setSelectedTerm(termRes.terms[0]);

      const dashboardRes = await fetchFn(
        `/faculty/${id}/${selectedTerm}`,
        "GET",
      );
      console.log("faculty term data: ", dashboardRes);
      if (!dashboardRes.faculty?.isPasswordSet) {
        navigate(`/change-password/${id}`);
      }

      dashboardCache[cacheKey] = dashboardRes;
      setTermData(dashboardRes);

      if (dashboardRes.links?.length > 0) {
        setSelectedSubjectId(dashboardRes.links[0].subject._id);
        setLimit(dashboardRes.links[0].limit || 0);
      } else {
        setSelectedSubjectId("");
        setLimit(0);
      }
    };

    withLoader(fetchDashboard, setLoading);
  }, [id, selectedTerm, navigate]);

  /* ---------------------- SUBJECT FEEDBACK ---------------------- */

  useEffect(() => {
    if (!selectedSubjectId) return;

    const fetchFeedback = async () => {
      const cacheKey = `${id}-${selectedSubjectId}-${selectedTerm}`;

      if (feedbackCache[cacheKey]) {
        setFeedbackData(feedbackCache[cacheKey]);
        return;
      }

      const data = await fetchFn(
        `/faculty/${id}/count/${selectedSubjectId}/${selectedTerm}`,
        "GET",
      );

      feedbackCache[cacheKey] = data;
      setFeedbackData(data);
    };

    withLoader(fetchFeedback, setLoading);
  }, [selectedSubjectId, id, selectedTerm]);

  /* ---------------------- AI SUMMARY ---------------------- */

  const handleGenerateSummary = useCallback(async () => {
    try {
      setAiSpinner(true);

      if (!termData.faculty) return;

      const cacheKey = termData.faculty.name;

      if (aiSummaryCache[cacheKey]) {
        setAiSummary(aiSummaryCache[cacheKey]);
        return;
      }

      const data = await fetchFn(
        `/faculty/${id}/faculty-summary`,
        "POST",
        JSON.stringify({
          facultyName: user.name,
          criteriaAnalysis: feedbackData.criteriaRatingsAi,
          subjectAnalysis: termData.ratingsForAi,
        }),
      );

      aiSummaryCache[cacheKey] = data.points || [];
      setAiSummary(data.points || []);
    } finally {
      setAiSpinner(false);
    }
  }, [termData, feedbackData, id, user]);

  return (
    <>
      <div className="w-full mt-4 px-2 h-[94vh]">
        <Dashboard
          aiSpinner={aiSpinner}
          loading={loading}
          termData={termData}
          feedbackData={feedbackData}
          limit={limit}
          selectedSubjectId={selectedSubjectId}
          setSelectedSubjectId={setSelectedSubjectId}
          aiSummary={aiSummary}
          handleGenerateSummary={handleGenerateSummary}
          terms={terms}
          selectedTerm={selectedTerm}
          setSelectedTerm={setSelectedTerm}
        />
      </div>
    </>
  );
};

export default FacultyDashboard;
