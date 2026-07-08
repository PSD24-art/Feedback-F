import React, { useEffect, useState } from "react";
import FacultyFeedbackChart from "../charts/HorizontallBars";
import BasicBars from "../charts/barGraph";
import AISummaryBox from "./AISummaryBox";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import DonutChart from "./DonutChart";
import fetchFn from "../utils/fetchFn";
import { useParams } from "react-router-dom";
import SkeletonCard from "./utilityComponents/SkeletonCard";

const Dashboard = React.memo(
  ({
    aiSpinner,
    loading,
    limit,
    count,
    selectedSubjectId,
    setSelectedSubjectId,
    aiSummary,
    handleGenerateSummary,
    terms = [],
    selectedTerm,
    setSelectedTerm,
    termData = {},
    feedbackData,
  }) => {
    // console.log("Faculty Data: ", feedbackData);

    const [generate, setGenerate] = useState(false);

    useEffect(() => {
      if (
        termData?.links?.length > 0 &&
        (!selectedSubjectId ||
          !termData?.links?.some((l) => l.subject?._id === selectedSubjectId))
      ) {
        const firstValid = termData?.links?.find((l) => l.subject?._id);
        if (firstValid) {
          setSelectedSubjectId(firstValid.subject._id);
        }
      }
    }, [termData?.links, selectedSubjectId]);

    // console.log("From Dashboard subjects:", subjects);

    const { id } = useParams();

    let finalId;
    let NewUrl;
    if (location.pathname.startsWith("/faculty")) {
      finalId = id; // logged-in faculty
      NewUrl = "/faculty/generate-report";
    } else {
      finalId = termData?.faculty?._id;
      NewUrl = "/admin/generate-report";
    }

    const generateReport = async () => {
      setGenerate(true);
      const response = await fetchFn(
        NewUrl,
        "POST",
        JSON.stringify({ facultyId: finalId }),
        "blob",
      );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setGenerate(false);

      const a = document.createElement("a");
      a.href = url;
      a.download = "Faculty_Report.xlsx";
      a.click();
    };

    return (
      <div className="bg-white rounded-lg p-3 flex flex-col h-[93vh]">
        {/* ================= HEADER ================= */}
        <div className="sticky top-0 bg-white z-10 border-b-2 basic_border pb-2">
          {/* Desktop */}
          <div className="hidden sm:grid grid-cols-3 items-center gap-2">
            <div className="flex justify-start">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                Faculty Analytics
                <span>
                  {isNaN(termData?.totalRating)
                    ? "⭐--"
                    : `⭐${termData?.totalRating}`}
                </span>
                <span className="flex items-center text-red-700 bg-amber-100 px-2 rounded-sm text-sm">
                  <span className="bg-red-600 w-2 h-2 rounded-full mr-1 live"></span>
                  Live
                </span>
              </h3>
            </div>

            <div className="flex flex-col items-center">
              <Gauge
                value={feedbackData?.FeedbackLength}
                valueMax={limit}
                startAngle={-110}
                endAngle={110}
                sx={{
                  width: 120,
                  height: 60,
                  [`& .${gaugeClasses.valueText}`]: { fontSize: 14 },
                }}
                text={({ value, valueMax }) => `${value} / ${valueMax}`}
              />
              <span className="text-sm">Received Feedbacks</span>
            </div>

            <div className="text-right">
              <h2 className="text-xl font-bold text-basic_color">
                {termData?.faculty?.name}
              </h2>
            </div>
          </div>

          {/* Mobile */}
          <div className="sm:hidden flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-basic_color">
                {termData?.faculty?.name}
              </h2>
              <span className="text-yellow-500 text-sm">
                {isNaN(termData?.totalRating)
                  ? "⭐--"
                  : `${termData?.totalRating}⭐`}
              </span>
            </div>
            <Gauge
              value={feedbackData?.FeedbackLength}
              valueMax={limit}
              startAngle={-110}
              endAngle={110}
              sx={{ width: 100, height: 50 }}
              text={({ value, valueMax }) => `${value}/${valueMax}`}
            />
          </div>

          {/* ================= FILTER BAR ================= */}
          <div className="mt-3 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            {/* Term */}
            <div className="flex items-center gap-2">
              <label className="font-semibold text-gray-700 text-sm">
                Term:
              </label>
              <select
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="basic_dropdown w-[150px]"
              >
                {/* <option value="ALL">All Terms</option> */}
                {terms.map((term) => (
                  <option key={term} value={term}>
                    {term}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div className="flex items-center gap-2">
              <label className="font-semibold text-gray-700 text-sm">
                Subject:
              </label>
              <select
                value={selectedSubjectId || ""}
                disabled={termData?.links?.length <= 1}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="basic_dropdown w-[180px]"
              >
                <option value="" disabled>
                  Select Subject
                </option>

                {termData?.links?.length > 0 &&
                  termData?.links
                    .filter((l) => l.subject && l.subject._id)
                    .map((link) => (
                      <option key={link._id} value={link.subject._id}>
                        {link.subject.name}
                      </option>
                    ))}
              </select>
            </div>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="flex-1 overflow-y-auto scrollbar-hide mt-4">
          {termData?.links?.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Subject Ratings */}

              {loading ? (
                <div className="border border-dashed border-orange-300 rounded-md p-3 bg-amber-50">
                  <SkeletonCard />
                </div>
              ) : (
                <div className="border border-dashed border-orange-300 rounded-md p-3 bg-amber-50">
                  <h3 className="font-semibold mb-2">
                    Average Ratings per Subject
                  </h3>
                  {termData?.ratingObjects && (
                    <BasicBars ratings={termData?.ratingObjects} />
                  )}
                </div>
              )}

              {/* Criteria */}
              {loading ? (
                <div className="border border-dashed border-orange-300 rounded-md p-3 bg-amber-50">
                  <SkeletonCard />
                </div>
              ) : (
                <div className="border border-dashed border-orange-300 rounded-md p-3 bg-amber-50">
                  <h3 className="font-semibold mb-2">
                    Criteria-wise Performance
                  </h3>
                  {feedbackData?.ratings?.length > 0 ? (
                    <FacultyFeedbackChart criteriaObj={feedbackData?.ratings} />
                  ) : (
                    <p className="text-gray-500 italic">
                      No data available for selected term
                    </p>
                  )}
                </div>
              )}

              {/* Donut */}
              {loading ? (
                <div className="border border-dashed border-orange-300 rounded-md p-3 bg-amber-50">
                  <SkeletonCard />
                </div>
              ) : (
                <div className="border border-dashed border-orange-300 rounded-md p-3 bg-amber-50">
                  <h3 className="font-semibold mb-2">Rating Distribution</h3>
                  <DonutChart
                    ratingPercentage={feedbackData?.ratingPercentage}
                  />
                </div>
              )}

              {/* AI Summary */}
              {loading ? (
                <div className=" h-full border border-dashed border-orange-300 rounded-md p-3 bg-amber-50">
                  <SkeletonCard />
                </div>
              ) : (
                <AISummaryBox
                  aiSpinner={aiSpinner}
                  aiSummary={aiSummary}
                  handleGenerateSummary={handleGenerateSummary}
                />
              )}
            </div>
          ) : (
            <div
              className={`${loading ? "" : "flex h-60 items-center justify-center text-gray-500 bg-amber-50 border-2 border-red-300 rounded-lg"}`}
            >
              {loading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Subject Ratings */}

                  {loading && (
                    <div className="border border-dashed border-orange-300 rounded-md p-3 bg-amber-50">
                      <SkeletonCard />
                    </div>
                  )}
                  {loading && (
                    <div className="border border-dashed border-orange-300 rounded-md p-3 bg-amber-50">
                      <SkeletonCard />
                    </div>
                  )}
                  {loading && (
                    <div className="border border-dashed border-orange-300 rounded-md p-3 bg-amber-50">
                      <SkeletonCard />
                    </div>
                  )}
                  {loading && (
                    <div className="border border-dashed border-orange-300 rounded-md p-3 bg-amber-50">
                      <SkeletonCard />
                    </div>
                  )}
                </div>
              ) : (
                "No subjects or feedback received."
              )}
            </div>
          )}

          <div>
            <button
              onClick={generateReport}
              className="mt-2 h-10 hover:cursor-pointer px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
            >
              {generate ? "Generating.." : "Generate EXCEL"}
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-end">
          <span>email: </span> {termData?.faculty?.email}
        </p>
      </div>
    );
  },
);

export default Dashboard;
