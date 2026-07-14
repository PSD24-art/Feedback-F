import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import withLoader from "../../utils/withLoader";
import fetchFn from "../../utils/fetchFn";
import Dashboard from "../../components/Dashboard";
import useAuth from "../../store/AuthProvider";

// Global cache objects
const dashboardCache = {};
const feedbackCache = {};
const aiSummaryCache = {};
const termsCache = {};

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

  /* ---------------------- STEP 1: FETCH TERMS ONLY ---------------------- */
  useEffect(() => {
    if (!id) return;

    const fetchTerms = async () => {
      const termCacheKey = `terms-${id}`;
      if (termsCache[termCacheKey]) {
        setTerms(termsCache[termCacheKey]);
        setSelectedTerm(termsCache[termCacheKey][0] || "");
        return;
      }

      const termRes = await fetchFn(`/dashboard/${id}/terms`, "GET");
      const fetchedTerms = termRes.terms || [];

      termsCache[termCacheKey] = fetchedTerms;
      setTerms(fetchedTerms);
      if (fetchedTerms.length > 0) {
        setSelectedTerm(fetchedTerms[0]);
      }
    };

    withLoader(fetchTerms, setLoading);
  }, [id]);

  /* ---------------------- STEP 2: FETCH DASHBOARD DATA ---------------------- */
  useEffect(() => {
    if (!id || !selectedTerm) return;
    setAiSummary([]);

    const fetchDashboard = async () => {
      const cacheKey = `${id}-${selectedTerm}`;

      // Fixed comma operator bug to check both caches safely
      if (dashboardCache[cacheKey] && dashboardCache[cacheKey].links) {
        const cachedData = dashboardCache[cacheKey];
        setTermData(cachedData);
        if (cachedData.links.length > 0) {
          setSelectedSubjectId(cachedData.links[0].subject._id);
          setLimit(cachedData.links[0].limit || 0);
        } else {
          setSelectedSubjectId("");
          setLimit(0);
        }
        return;
      }

      const dashboardRes = await fetchFn(
        `/faculty/${id}/${selectedTerm}`,
        "GET",
      );

      if (!dashboardRes.faculty?.isPasswordSet) {
        navigate(`/change-password/${id}`);
        return;
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
    if (!id || !selectedSubjectId || !selectedTerm) return;

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
    <div className="w-full px-3 py-4 lg:px-5">
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
  );
};

export default FacultyDashboard;
