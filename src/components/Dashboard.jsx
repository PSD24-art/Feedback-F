import { useEffect } from "react";
import FacultyFeedbackChart from "../charts/HorizontallBars";
import BasicBars from "../charts/barGraph";
import AISummaryBox from "./AISummaryBox";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import DonutChart from "./DonutChart";

const Dashboard = ({
  limit,
  totalRating,
  facultyData,
  count,
  subjects = [],
  ratings,
  selectedSubjectId,
  setSelectedSubjectId,
  criteriaObj,
  ratingPercentage,
  aiSummary,
  handleGenerateSummary,
  terms = [],
  selectedTerm,
  setSelectedTerm,
}) => {
  console.log("Faculty Data: ", facultyData);

  useEffect(() => {
    if (
      subjects.length > 0 &&
      (!selectedSubjectId ||
        !subjects.some((l) => l.subject?._id === selectedSubjectId))
    ) {
      const firstValid = subjects.find((l) => l.subject?._id);
      if (firstValid) {
        setSelectedSubjectId(firstValid.subject._id);
      }
    }
  }, [subjects, selectedSubjectId, setSelectedSubjectId]);

  console.log("From Dashboard subjects:", subjects);

  return (
    <div className="bg-white rounded-lg p-3 flex flex-col h-[93vh]">
      {/* ================= HEADER ================= */}
      <div className="sticky top-0 bg-white z-10 border-b-2 basic_border pb-2">
        {/* Desktop */}
        <div className="hidden sm:grid grid-cols-3 items-center gap-2">
          <div className="flex justify-start">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              Faculty Analytics
              <span>{isNaN(totalRating) ? "⭐--" : `⭐${totalRating}`}</span>
              <span className="flex items-center text-red-700 bg-amber-100 px-2 rounded-sm text-sm">
                <span className="bg-red-600 w-2 h-2 rounded-full mr-1 live"></span>
                Live
              </span>
            </h3>
          </div>

          <div className="flex flex-col items-center">
            <Gauge
              value={count}
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
              {facultyData?.name}
            </h2>
          </div>
        </div>

        {/* Mobile */}
        <div className="sm:hidden flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-basic_color">
              {facultyData?.name}
            </h2>
            <span className="text-yellow-500 text-sm">
              {isNaN(totalRating) ? "⭐--" : `${totalRating}⭐`}
            </span>
          </div>
          <Gauge
            value={count}
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
            <label className="font-semibold text-gray-700 text-sm">Term:</label>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="basic_dropdown w-[150px]"
            >
              <option value="ALL">All Terms</option>
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
              disabled={subjects.length <= 1}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="basic_dropdown w-[180px]"
            >
              <option value="" disabled>
                Select Subject
              </option>

              {subjects
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
        {subjects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Subject Ratings */}
            <div className="border border-dashed border-orange-300 rounded-md p-3 bg-amber-50">
              <h3 className="font-semibold mb-2">
                Average Ratings per Subject
              </h3>
              {ratings && <BasicBars ratings={ratings} />}
            </div>

            {/* Criteria */}
            <div className="border border-dashed border-orange-300 rounded-md p-3 bg-amber-50">
              <h3 className="font-semibold mb-2">Criteria-wise Performance</h3>
              {criteriaObj?.length ? (
                <FacultyFeedbackChart criteriaObj={criteriaObj} />
              ) : (
                <p className="text-gray-500 italic">
                  No data available for selected term
                </p>
              )}
            </div>

            {/* Donut */}
            <div className="border border-dashed border-orange-300 rounded-md p-3 bg-amber-50">
              <h3 className="font-semibold mb-2">Rating Distribution</h3>
              <DonutChart ratingPercentage={ratingPercentage} />
            </div>

            {/* AI Summary */}
            <AISummaryBox
              aiSummary={aiSummary}
              handleGenerateSummary={handleGenerateSummary}
            />
          </div>
        ) : (
          <div className="h-60 flex items-center justify-center text-gray-500 bg-amber-50 border-2 border-red-300 rounded-lg">
            No subjects or feedback received.
          </div>
        )}
      </div>
      <p className="text-xs text-gray-400 mt-2 text-end">
        <span>email: </span> {facultyData.email}
      </p>
    </div>
  );
};

export default Dashboard;
