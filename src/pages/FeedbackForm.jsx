import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import questions from "../data/questions";
import Loader from "../components/Loader";
import withLoader from "../utils/withLoader";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const FeedbackForm = () => {
  const [current, setCurrent] = useState(false);
  const [name, setName] = useState();
  const [roll, setRoll] = useState();
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const { id, subject } = useParams();
  const nameRef = useRef();
  const rollRef = useRef();
  const [answers, setAnswers] = useState({});
  const [subjectName, setSubjectName] = useState();
  const [facultyName, setFacultyName] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    withLoader(async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/faculties/${id}/tokens/${subject}`,
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );

        const data = await res.json();
        console.log("token data", data);

        if (data?.newToken?.token) {
          setToken(data.newToken.token);
          setSubjectName(data.newToken.subject.name);
          setFacultyName(data.newToken.faculty.name);
        } else {
          console.warn("No token received for this subject");
        }
      } catch (err) {
        console.error("Failed to fetch token", err);
      }
    }, setLoading);
  }, [id, subject]);

  const handleChange = (IDX, value) => {
    setAnswers((prev) => ({
      ...prev,
      [IDX]: value,
    }));
  };

  const handleStudentDataSubmit = async (e) => {
    e.preventDefault();
    const studentName = nameRef.current.value;
    const studentroll = rollRef.current.value;
    setRoll(studentroll);
    setName(studentName);
    withLoader(async () => {
      const res = await fetch(`${BASE_URL}/feedback/${token}/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentRoll: studentroll,
        }),
      });
      const data = await res.json();
      console.log("Backend Response", data);
      if (data.message) {
        setCurrent(true);
      } else {
        alert("You response has been already shared");
      }
    }, setLoading);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(answers);
    withLoader(async () => {
      const res = await fetch(`${BASE_URL}/feedback/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: name,
          studentRoll: roll,
          faculty: id,
          subject: subject,
          token: token,
          parameter1: {
            q1: answers[0],
            q2: answers[1],
            q3: answers[2],
          },
          parameter2: {
            q1: answers[3],
            q2: answers[4],
            q3: answers[5],
            q4: answers[6],
          },
          parameter3: {
            q1: answers[7],
            q2: answers[8],
            q3: answers[9],
          },
          parameter4: {
            q1: answers[10],
            q2: answers[11],
            q3: answers[12],
          },
          parameter5: {
            q1: answers[13],
            q2: answers[14],
            q3: answers[15],
          },
          overallEffectiveness: answers[16],
          strengths: answers[17],
          improvements: answers[18],
          additionalComments: answers[19],
        }),
      });
      const data = await res.json();
      console.log(data);
      alert("Feedback submitted successfully!");
      navigate("/feedback/sent");
    }, setLoading);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="mt-12 max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="p-6 border rounded-lg bg-gray-50 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Feedback Form Details
          </h2>
          <p className="text-gray-700 font-medium mb-2">
            Faculty:{" "}
            <span className="font-semibold text-blue-600">{facultyName}</span>
          </p>
          <p className="text-gray-700 font-medium">
            Subject:{" "}
            <span className="font-semibold text-blue-600">{subjectName}</span>
          </p>
        </div>
        {!current ? (
          <form onSubmit={handleStudentDataSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Student Name:
              </label>
              <input
                type="text"
                ref={nameRef}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Student Roll:
              </label>
              <input
                type="text"
                ref={rollRef}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              Next
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {questions.map((question, IDX) => (
              <div
                key={IDX}
                className="space-y-4 p-4 border rounded-lg bg-gray-50 shadow-sm"
              >
                <p className="font-semibold text-gray-800">{question}</p>
                <div className="flex flex-wrap gap-4">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <label
                      key={num}
                      className={`flex flex-col items-center px-3 py-2 rounded-lg cursor-pointer border transition
                    ${
                      answers[IDX] === num
                        ? "bg-blue-600 text-white border-blue-600 shadow-md"
                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                    }`}
                    >
                      <input
                        type="radio"
                        required
                        name={`question-${IDX}`}
                        value={num}
                        checked={answers[IDX] === num}
                        onChange={() => handleChange(IDX, num)}
                        className="sr-only"
                      />
                      <span className="font-medium">
                        {num === 1
                          ? "Strongly Disagree"
                          : num === 2
                            ? "Disagree"
                            : num === 3
                              ? "Neutral"
                              : num === 4
                                ? "Agree"
                                : "Strongly Agree"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button
              type="submit"
              className="hover:cursor-pointer w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-md"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default FeedbackForm;
