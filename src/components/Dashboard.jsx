import { Typewriter } from "react-simple-typewriter";
import GenerateBtn from "./generateBtn";
import FacultyFeedbackChart from "../charts/HorizontallBars";
import BasicBars from "../charts/barGraph";
import AISummaryBox from "./AISummaryBox";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { Donut } from "lucide-react";
import DonutChart from "./DonutChart";
const Dashboard = ({
  limit,
  totalRating,
  facultyData,
  count,
  subjects,
  ratings,
  selectedSubjectId,
  setSelectedSubjectId,
  criteriaObj,
  ratingPercentage,
  aiSummary,
  handleGenerateSummary,
}) => {
  return (
    <>
      <div className="bg-white rounded-lg p-4 pt-1 transition flex flex-col h-[93vh]">
        <>
          {/* Layout for sm+ screens (md and above) */}
          <div className="hidden sm:block sticky top-0 bg-white z-10 basic_border border-b-2 md:grid md:grid-cols-3 items-center p-2">
            {/* Left: Faculty Analytics + Star + Live */}
            <div className="flex items-center justify-center">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                Faculty Analytics{" "}
                <span className="ml-2">
                  {isNaN(totalRating) ? "⭐--" : `⭐${totalRating}`}
                </span>
                <div className="flex items-center text-red-700 bg-amber-100 ms-2 ps-2 pe-2 rounded-sm">
                  <div className="bg-red-600 w-2 h-2 rounded-full mr-1 live"></div>
                  Live
                </div>
              </h3>
            </div>

            {/* Center: Gauge */}
            <div className="flex justify-center items-center flex-col">
              <Gauge
                value={count}
                valueMax={limit}
                startAngle={-110}
                endAngle={110}
                sx={{
                  width: 120,
                  height: 60,
                  [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 14,
                    transform: "translate(0px, 0px)",
                  },
                }}
                text={({ value, valueMax }) => `${value} / ${valueMax}`}
              />
              <div>Recieved Feedbacks</div>
            </div>

            {/* Right: Faculty Name */}
            <div className="flex justify-center md:justify-end">
              <h2 className="text-end sm:text-md md:text-md text-xl font-bold text-basic_color">
                {facultyData.name}
              </h2>
            </div>
          </div>

          <div className="sm:hidden sticky top-0 bg-white z-10 basic_border border-b-2 flex items-center justify-between p-1">
            {/* Left: Faculty Name + Rating */}
            <div className="flex flex-col items-start justify-center">
              <h2 className="text-xl font-bold text-basic_color sm:text-xl md:text-xl">
                {facultyData.name}{" "}
                <span className="text-yellow-500">
                  {isNaN(totalRating) ? "⭐--" : `${totalRating}⭐`}
                </span>
              </h2>
            </div>

            {/* Right: Gauge */}
            <div className="flex flex-col items-center justify-center">
              <Gauge
                value={count}
                valueMax={limit}
                startAngle={-110}
                endAngle={110}
                sx={{
                  width: 120,
                  height: 60,
                  [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 14,
                    transform: "translate(0px, 0px)",
                  },
                }}
                text={({ value, valueMax }) => `${value} / ${valueMax}`}
              />
              <div className="text-center text-sm">Recieved Feedbacks</div>
            </div>
          </div>
        </>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 scrollbar-hide">
          {subjects && subjects.length > 0 ? (
            <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 gap-4 lg:gap-8 xl:gap-12 m-4 sm:gird-cols-1">
              <div className="flex-grow flex-col flex items-center justify-between text-gray-500 text-sm border border-dashed border-orange-300 rounded-md p-3 min-h-90 bg-amber-50">
                <div className="p-1 text-xl rounded-md mb-3 flex w-full justify-between items-center">
                  Average ratings for each subject
                </div>
                {ratings && <BasicBars ratings={ratings} />}
              </div>

              <div className="flex-grow flex flex-col items-center justify-between text-gray-500 text-sm border border-dashed border-orange-300 rounded-md p-3 min-h-90 bg-amber-50">
                <div className="p-1 rounded-md mb-3 flex w-full justify-between items-center">
                  <label htmlFor="linkSubject" className="font-bold">
                    Subject:
                  </label>
                  <select
                    id="linkSubject"
                    value={selectedSubjectId}
                    disabled={subjects.length <= 1}
                    onChange={(e) => setSelectedSubjectId(e.target.value)}
                    className="w-40 focus:border-red-300 px-1 border-2 border-red-300 rounded-md focus:ring-2 focus:ring-red-400 focus:outline-none"
                  >
                    {subjects.map((link) => (
                      <option key={link._id} value={link.subject._id}>
                        {link.subject.name}
                      </option>
                    ))}
                  </select>
                </div>
                {criteriaObj && criteriaObj.length !== 0 ? (
                  <FacultyFeedbackChart criteriaObj={criteriaObj} />
                ) : (
                  <div>No data to show</div>
                )}
              </div>
              {/*donut chart*/}
              <div className="flex-grow flex-col flex items-center justify-center text-gray-500 text-sm border border-dashed border-orange-300 rounded-md p-3 min-h-90 bg-amber-50">
                <h2>Percentage ratings recieved</h2>
                <DonutChart ratingPercentage={ratingPercentage} />
              </div>

              {/* AI Summary */}
              <AISummaryBox
                aiSummary={aiSummary}
                handleGenerateSummary={handleGenerateSummary}
              />
            </div>
          ) : (
            <div className="mt-4 text-gray-500 text-sm h-60 w-full flex items-center justify-center bg-amber-50 border-2 border-red-300 rounded-lg">
              No subjects or feedbacks recieved.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
