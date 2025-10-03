import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import withLoader from "../utils/withLoader";
import Loader from "./Loader";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const CreateForm = ({ triggerFetch }) => {
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
      await fetch(`${BASE_URL}/faculties/${id}/subject`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: selectedCode }),
      });
      console.log("selectedCode:", selectedCode);
      console.log("subjects:", subjects);
      console.log("foundSubjectId:", subjectId);

      // Add feedback link
      const res = await fetch(`${BASE_URL}/faculties/${id}/feedback`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: foundSubjectId,
          link: `http://localhost:5173/faculty/${id}/feedback/${selectedCode}`,
        }),
      });

      const data = await res.json();
      if (data.message) {
        setLinkMessage(data.message);
      }

      setButton(true);
      triggerFetch();
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
      url = `${BASE_URL}/faculties/${id}/subject/${dept}/${sem}`;
    } else {
      url = `${BASE_URL}/faculties/${id}/subject/${dept}`;
    }
    withLoader(async () => {
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await res.json();
        setSubjects(data.subjects);
      } catch (err) {
        console.error("Failed to fetch subjects", err);
      }
    }, setLoading);
  };

  return (
    <>
      {loading && <Loader />}
      {!button ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-white p-6 rounded-lg border-2 border-orange-200 shadow-md"
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
              className="p-2 border-2 border-orange-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
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
              className="p-2 border-2 border-orange-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
            >
              <option value="">Select Semester</option>
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
              className="p-2 border-2 border-orange-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
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
            className="mt-2 px-4 py-2 bg-orange-500 text-white font-semibold rounded-md shadow-md hover:bg-orange-600 transition active:scale-95"
          >
            Create Form
          </button>
        </form>
      ) : (
        <div className="flex flex-col gap-4 bg-white p-6 rounded-lg border-2 border-orange-200 shadow-md">
          <h3 className="text-lg font-semibold text-orange-600">
            Please share the below link to get the feedback
          </h3>
          <div className="flex flex-col gap-2">
            {/* Link */}
            <div className="whitespace-normal break-words text-blue-700 underline bg-blue-50 p-2 rounded-md">
              <a
                href={`http://localhost:5173/faculty/${id}/feedback/${code}`}
                target="_blank"
                rel="noreferrer"
              >
                {linkMessage ??
                  `http://localhost:5173/faculty/${id}/feedback/${code}`}
              </a>
            </div>

            {/* Copy Button */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  linkMessage ??
                    `http://localhost:5173/faculty/${id}/feedback/${code}`
                );
                alert("Link copied to clipboard!");
              }}
              className="self-start px-3 py-1 bg-orange-500 text-white text-sm rounded-md shadow hover:bg-orange-600 active:scale-95 transition"
            >
              Copy Link
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateForm;
