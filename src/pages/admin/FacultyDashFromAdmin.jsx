import { useCallback, useEffect, useState } from "react";
import withLoader from "../../utils/withLoader";
import fetchFn from "../../utils/fetchFn";
import Dashboard from "../../components/Dashboard";
const aiSumaryCache = {};
const termDataCache = {};
const feedbackDataCache = {};
const termsCache = {};
const FacultyDashFromAdmin = ({ adminId, facultyId }) => {
  const [aiSpinner, setAiSpinner] = useState(false);
  const [aiSummary, setAiSummary] = useState([]);
  const [limit, setLimit] = useState(0);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedbackData, setFeedbackData] = useState({});
  const [termData, setTermData] = useState({});
  const [terms, setTerms] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState("ALL");

  // Single effect handling all sequential data fetching
  useEffect(() => {
    if (!facultyId || !adminId) return;
    setAiSummary([]);
    const fetchAllDashboardData = async () => {
      let cacheKey = `${facultyId}-${selectedTerm}`;

      if (termDataCache[cacheKey] && termsCache[cacheKey]) {
        setTermData(termDataCache[cacheKey]);
        setTerms(termsCache[cacheKey]);
        return;
      } else {
        // 1. Fetch Terms
        const termsResult = await fetchFn(
          `/dashboard/${facultyId}/terms`,
          "GET",
        );
        setTerms(termsResult.terms || []);
        termsCache[cacheKey] = termsResult.terms;
        // 2. Fetch Dashboard Data based on current selectedTerm
        const dashboardResult = await fetchFn(
          `/admin/${adminId}/faculties/${facultyId}/${selectedTerm}`,
          "GET",
        );
        setTermData(dashboardResult || {});
        termDataCache[cacheKey] = dashboardResult;

        //  Determine target subject ID
        if (dashboardResult?.links?.length > 0) {
          let currentSubjectId = dashboardResult.links[0].subject._id;
          setSelectedSubjectId(currentSubjectId);
          setLimit(dashboardResult.links[0].limit || 0);
        } else {
          setSelectedSubjectId("");
          setLimit(0);
        }
      }
    };

    // Execute with your existing loader wrapper
    withLoader(fetchAllDashboardData, setLoading);
  }, [facultyId, adminId, selectedTerm]);

  useEffect(() => {
    async function getAllFeedbackData() {
      let cacheKey = `${facultyId}-${selectedSubjectId}`;

      if (feedbackDataCache[cacheKey]) {
        setFeedbackData(feedbackDataCache[cacheKey]);
        return;
      } else {
        const feedbackResult = await fetchFn(
          `/admin/${adminId}/faculties/${facultyId}/feedback/${selectedSubjectId}`,
          "GET",
        );
        setFeedbackData(feedbackResult);
        feedbackDataCache[cacheKey] = feedbackResult;
      }
    }

    withLoader(getAllFeedbackData, setLoading);
  }, [selectedSubjectId]);

  // AI SUMMARY

  const handleGenerateSummary = useCallback(async () => {
    try {
      setAiSpinner(true);
      if (!termData.faculty) return;
      let cacheKey = termData.faculty.name;
      if (aiSumaryCache[cacheKey]) {
        setAiSummary(aiSumaryCache[cacheKey]);
      } else {
        const data = await fetchFn(
          `/admin/${adminId}/faculty-summary`,
          "POST",
          JSON.stringify({
            facultyName: termData.faculty.name,
            criteriaAnalysis: feedbackData.criteriaRatingsAi,
            subjectAnalysis: termData.ratingsForAi,
          }),
        );
        aiSumaryCache[cacheKey] = data.points || [];
        setAiSummary(data.points || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAiSpinner(false);
    }
  }, [termData, facultyId]);

  return (
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
  );
};

export default FacultyDashFromAdmin;
