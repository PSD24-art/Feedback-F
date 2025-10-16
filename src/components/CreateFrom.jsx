import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import withLoader from "../utils/withLoader";
import Loader from "./Loader";
import fetchFn from "../utils/fetchFn";
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;
const CreateForm = () => {
  console.log("Frontend url: ", FRONTEND_URL);
  const { id } = useParams();
  const subjectRef = useRef();
  const [button, setButton] = useState(false);
  const [code, setCode] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [subjects, setSubjects] = useState();
  const deptRef = useRef();
  const semRef = useRef();
  const [linkMessage, setLinkMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedCode = subjectRef.current.value;
    setCode(selectedCode);

    let foundSubjectId = "";
    if (subjects) {
      const subject = subjects.find((s) => s.unique_code === selectedCode);
      if (subject) {
        foundSubjectId = subject._id;
        setSubjectId(foundSubjectId);
      }
    }

    // Add faculty to subject
    withLoader(async () => {
      const putData = await fetchFn(
        `/faculty/${id}/subject`,
        "PUT",
        JSON.stringify({ code: selectedCode })
      );
      console.log("Put faculty: ", putData);

      // Add feedback link
      const data = await fetchFn(
        `/faculty/${id}/feedback`,
        "POST",
        JSON.stringify({
          subject: foundSubjectId,
          link: `${FRONTEND_URL}/faculty/${id}/feedback/${selectedCode}`,
        })
      );
      if (data.message) {
        setLinkMessage(data.message);
      }
      setButton(true);
    }, setLoading);
  };

  const handleOnChange = async () => {
    const dept = deptRef.current.value;
    const sem = semRef.current.value;

    if (dept === "selectDepartment") {
      setSubjects(null);
      return;
    }

    let url;
    if (dept && sem) {
      url = `/faculty/${id}/subject/${dept}/${sem}`;
    } else {
      url = `/faculty/${id}/subject/${dept}`;
    }
    withLoader(async () => {
      try {
        const data = await fetchFn(url, "GET");
        setSubjects(data.subjects);
      } catch (err) {
        console.error("Failed to fetch subjects", err);
      }
    }, setLoading);
  };

  return (
    <div className="flex flex-col w-[100%]">
      <h2 className="mb-4 ms-8 mt-16 text-xl font-semibold text-basic_color">
        Create Feedback Form
      </h2>
      {loading && <Loader />}
      {!button ? (
        <form
          onSubmit={handleSubmit}
          className="h-fit mt-2 mb-3 m-8 flex flex-col gap-4 bg-white p-6 rounded-lg border-2 border-orange-200 shadow-md"
        >
          <div className="flex flex-col">
            <label
              htmlFor="department"
              className="mb-1 font-medium text-gray-700"
            >
              Department
            </label>
            <select
              required
              ref={deptRef}
              id="department"
              onChange={handleOnChange}
              defaultValue={"selectDepartment"}
              className="basic_dropdown"
            >
              <option value="selectDepartment">Select Department</option>
              <option value="CS">Computer Science</option>
              <option value="CE">Civil Engineering</option>
              <option value="EE">Electrical Engineering</option>
              <option value="ME">Mechanical Engineering</option>
              <option value="EC">Electronics and Telecommunication</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="semester"
              className="mb-1 font-medium text-gray-700"
            >
              Semester
            </label>
            <select
              required
              ref={semRef}
              id="semester"
              onChange={handleOnChange}
              defaultValue={"selectSemester"}
              className="basic_dropdown"
            >
              <option value="selectSem">Select Semester</option>
              <option value="01">SEM I</option>
              <option value="02">SEM II</option>
              <option value="03">SEM III</option>
              <option value="04">SEM IV</option>
              <option value="05">SEM V</option>
              <option value="06">SEM VI</option>
              <option value="07">SEM VII</option>
              <option value="08">SEM VIII</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="subject" className="mb-1 font-medium text-gray-700">
              Subject
            </label>
            <select
              required
              id="subject"
              ref={subjectRef}
              className="basic_dropdown"
            >
              {subjects ? (
                subjects.map((subject) => (
                  <option key={subject._id} value={subject.unique_code}>
                    {subject.name}
                  </option>
                ))
              ) : (
                <option value="">Select subjects</option>
              )}
            </select>
          </div>

          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-orange-500 text-white font-semibold rounded-md shadow-md hover:bg-basic_color transition active:scale-95"
          >
            Create Form
          </button>
        </form>
      ) : (
        <div className="flex flex-col gap-4 bg-white p-6 rounded-lg border-2 border-orange-200 shadow-md">
          <h3 className="text-lg font-semibold text-basic_color">
            Please share the below link to get the feedback
          </h3>
          <div className="flex flex-col gap-2">
            {/* Link */}
            <div className="whitespace-normal break-words text-blue-700 underline bg-blue-50 p-2 rounded-md">
              <a
                href={`${FRONTEND_URL}/faculty/${id}/feedback/${code}`}
                target="_blank"
                rel="noreferrer"
              >
                {linkMessage ??
                  `${FRONTEND_URL}/faculty/${id}/feedback/${code}`}
              </a>
            </div>

            {/* Copy Button */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  linkMessage ??
                    `${FRONTEND_URL}/faculty/${id}/feedback/${code}`
                );
                alert("Link copied to clipboard!");
              }}
              className="self-start px-3 py-1 bg-orange-500 text-white text-sm rounded-md shadow hover:bg-basic_color active:scale-95 transition"
            >
              Copy Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateForm;
