import { Typewriter } from "react-simple-typewriter";
import GenerateBtn from "./generateBtn";
import FacultyFeedbackChart from "../charts/HorizontallBars";
import BasicBars from "../charts/barGraph";
import AISummaryBox from "./AISummaryBox";

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
  aiSummary,
  handleGenerateSummary,
}) => {
  return (
    <>
      <div className=" bg-white  rounded-lg p-4 pt-1 transition flex flex-col ">
        <div className="mt-2 flex flex-col md:flex-row justify-between items-center mb-2 mx-4 ">
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
          <h2 className=" text-end sm:text-md md:text-md bg-white mt-2 mb-2 border-amber-500 left-5 text-xl font-bold text-basic_color ">
            {facultyData.name}
          </h2>
        </div>

        <div className="flex  items-center justify-between mb-3 text-sm font-medium text-gray-700 mx-4">
          <div>
            {" "}
            Recieved Feedbacks:{" "}
            <span className="text-basic_color font-bold">{count}</span>
          </div>
          <div>
            {" "}
            Feedback Limit:{" "}
            <span className="text-basic_color font-bold">{limit}</span>
          </div>
        </div>
        {subjects && subjects.length > 0 ? (
          <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 gap-4 lg:gap-8  xl:gap-12 m-4  sm:gird-cols-1">
            <div className="flex-grow flex-col flex items-center justify-between text-gray-500 text-sm border border-dashed border-orange-300 rounded-md p-3 min-h-90 bg-amber-50">
              {/* <div className="font-bold text-xl"></div> */}
              <div className="p-1 text-xl rounded-md mb-3 flex w-full justify-between items-center">
                Average ratings for each subject
              </div>

              {ratings && <BasicBars ratings={ratings} />}
            </div>
            <div className="flex-grow flex flex-col items-center justify-between text-gray-500 text-sm border border-dashed border-orange-300 rounded-md p-3 min-h-90 bg-amber-50 ">
              <div className="p-1 rounded-md mb-3 flex w-full justify-between items-center">
                {" "}
                <label htmlFor="linkSubject" className="font-bold">
                  {" "}
                  Subject:{" "}
                </label>
                <select
                  id="linkSubject"
                  value={selectedSubjectId}
                  disabled={subjects.length <= 1}
                  onChange={(e) => {
                    setSelectedSubjectId(e.target.value);
                  }}
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
            {/* AI Summary */}
            <AISummaryBox
              aiSummary={aiSummary}
              handleGenerateSummary={handleGenerateSummary}
            />
          </div>
        ) : (
          <div className="text-gray-500 text-sm">
            No subjects or feedbacks recieved.
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
