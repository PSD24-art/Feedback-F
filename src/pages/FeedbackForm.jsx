import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import questions from "../data/questions";
import Loader from "../components/utilityComponents/Loader";
import withLoader from "../utils/withLoader";
import fetchFn from "../utils/fetchFn";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const FeedbackForm = () => {
  const [current, setCurrent] = useState(false);
  const [name, setName] = useState();
  const [roll, setRoll] = useState();
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const { id, subject, term } = useParams();
  const nameRef = useRef();
  const rollRef = useRef();
  const [answers, setAnswers] = useState({});
  const [subjectName, setSubjectName] = useState();
  const [facultyName, setFacultyName] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    withLoader(async () => {
      try {
        const data = await fetchFn(`/faculty/${id}/tokens/${subject}`, "GET");
        console.log("Token: ", data);

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
  }, []);

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
      const data = await fetchFn(
        `/feedback/${token}/check`,
        "POST",
        JSON.stringify({
          studentRoll: studentroll,
        })
      );

      if (data.message === true) {
        setCurrent(true);
      } else if (data.text) {
        alert(data.text);
      } else {
        alert("Your response has been already shared");
      }
    }, setLoading);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    withLoader(async () => {
      const data = await fetchFn(
        `/feedback/${token}`,
        "POST",
        JSON.stringify({
          studentName: name,
          studentRoll: roll,
          faculty: id,
          subject: subject,
          token: token,
          parameter1: {
            q1: answers[0],
            q2: answers[1],
          },
          parameter2: {
            q1: answers[2],
            q2: answers[3],
            q3: answers[4],
            q4: answers[5],
          },
          parameter3: {
            q1: answers[6],
            q2: answers[7],
            q3: answers[8],
            q4: answers[9],
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
          term: term,
        })
      );
      alert("Feedback submitted successfully!");
      navigate("/feedback/sent");
    }, setLoading);
  };

  return (
    <>
      {loading && <Loader />}

      <div className="flex justify-center items-start md:items-center min-h-[calc(100vh-80px)] py-10 bg-gray-100">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Faculty Feedback Form
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your feedback plays an important role in enhancing the quality of
              teaching and learning. Please share your honest experience based
              on your interactions with the faculty.
            </p>
          </div>

          {/* Faculty & Subject Info */}
          <div className="p-6 border rounded-lg bg-blue-50 shadow-sm mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Feedback Details
            </h2>
            <p className="text-gray-700 font-medium mb-2">
              Faculty Name:{" "}
              <span className="font-semibold text-blue-700">{facultyName}</span>
            </p>
            <p className="text-gray-700 font-medium">
              Subject Name:{" "}
              <span className="font-semibold text-blue-700">{subjectName}</span>
            </p>
          </div>

          {/* Privacy Notice */}
          <div className="mb-6 p-4 rounded-lg border border-green-300 bg-green-50">
            <p className="text-sm text-green-800 leading-relaxed">
              🔒 <strong>Privacy Notice:</strong> Your responses are kept
              confidential and are used only for academic improvement purposes.
              Individual student identities are not disclosed in reports.
            </p>
          </div>

          {/* Step 1: Student Info */}
          {!current ? (
            <>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Student Information
                </h3>
                <p className="text-gray-600 text-sm">
                  Please provide your basic details to proceed. This helps
                  prevent duplicate submissions.
                </p>
              </div>

              <form onSubmit={handleStudentDataSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Student Name
                  </label>
                  <input
                    type="text"
                    ref={nameRef}
                    required
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Student Roll Number{" "}
                    <span className="font-normal">
                      {"(University Roll Number ex. 24BD_ _ _)"}
                    </span>
                  </label>
                  <input
                    type="text"
                    ref={rollRef}
                    required
                    placeholder="Enter your roll number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button type="submit" className="basic_button w-full">
                  Proceed to Feedback
                </button>
              </form>
            </>
          ) : (
            /* Step 2: Feedback Questions */
            <>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Faculty Evaluation
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Please rate the following statements based on your classroom
                  experience. Select the option that best reflects your opinion.
                </p>
              </div>

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
                          <span className="text-sm font-medium text-center">
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

                <div className="text-sm text-gray-500 italic text-center">
                  Please ensure all questions are answered before submitting.
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg 
                         hover:bg-green-700 transition shadow-md"
                >
                  Submit Feedback
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FeedbackForm;
