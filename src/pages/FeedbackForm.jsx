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
  const [isDisable, setIsDisable] = useState(true);
  useEffect(() => {
    async function getToken() {
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
    }
    getToken();
    setIsDisable(false);
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
        }),
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
        }),
      );
      alert("Feedback submitted successfully!");
      navigate("/feedback/sent");
    }, setLoading);
  };

  return (
    <>
      {loading && <Loader />}

      <div className="flex min-h-full items-start justify-center bg-[radial-gradient(circle_at_top_right,_rgba(244,63,94,0.1),_transparent_32%)] px-4 py-6 sm:p-8">
        <div className="panel-card w-full max-w-4xl overflow-hidden p-5 sm:p-8">
          {/* Page Header */}
          <div className="mb-7 border-b border-slate-100 pb-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-100 text-sm">✦</span>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-600">Confidential student response</p>
            </div>
            <h1 className="mb-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Faculty Feedback Form
            </h1>
            <p className="text-sm leading-relaxed text-slate-500">
              Your feedback plays an important role in enhancing the quality of
              teaching and learning. Please share your honest experience based
              on your interactions with the faculty.
            </p>
          </div>

          {/* Faculty & Subject Info */}
          <div className="mb-6 grid gap-4 rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50 via-white to-white p-5 sm:grid-cols-2">
            <h2 className="sr-only">
              Feedback Details
            </h2>
            <p className="rounded-xl border border-white bg-white/80 p-3 text-sm font-medium text-slate-500 shadow-sm">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400">Faculty</span>
              <span className="font-bold text-rose-700">{facultyName || "Loading faculty..."}</span>
            </p>
            <p className="rounded-xl border border-white bg-white/80 p-3 text-sm font-medium text-slate-500 shadow-sm">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400">Subject</span>
              <span className="font-bold text-rose-700">{subjectName || "Loading subject..."}</span>
            </p>
          </div>

          {/* Privacy Notice */}
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm leading-relaxed text-emerald-800">
              🔒 <strong>Privacy Notice:</strong> Your responses are kept
              confidential and are used only for academic improvement purposes.
              Individual student identities are not disclosed in reports.
            </p>
          </div>

          {/* Step 1: Student Info */}
          {!current ? (
            <>
              <div className="mb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-600">Step 1 of 2</p>
                <h3 className="mb-2 mt-1 text-xl font-extrabold text-slate-800">
                  Student Information
                </h3>
                <p className="text-sm text-slate-500">
                  Please provide your basic details to proceed. This helps
                  prevent duplicate submissions.
                </p>
              </div>

              <form onSubmit={handleStudentDataSubmit} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 space-y-5 sm:p-6">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Student Name
                  </label>
                  <input
                    type="text"
                    ref={nameRef}
                    required
                    placeholder="Enter your full name"
                    className="basic_input"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
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
                    className="basic_input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isDisable}
                  className={
                    isDisable
                      ? "mt-0 flex min-h-11 w-full items-center justify-center rounded-xl bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-500"
                      : "basic_button mt-0 w-full"
                  }
                >
                  {isDisable ? "Please wait.." : "Proceed to Feedback"}
                </button>
              </form>
            </>
          ) : (
            /* Step 2: Feedback Questions */
            <>
              <div className="mb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-600">Step 2 of 2</p>
                <h3 className="mb-2 mt-1 text-xl font-extrabold text-slate-800">
                  Faculty Evaluation
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  Please rate the following statements based on your classroom
                  experience. Select the option that best reflects your opinion.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {questions.map((question, IDX) => (
                  <div
                    key={IDX}
                    className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 shadow-sm sm:p-5"
                  >
                    <p className="mb-4 text-sm font-bold leading-relaxed text-slate-800">{question}</p>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <label
                          key={num}
                          className={`flex min-h-16 cursor-pointer flex-col items-center justify-center rounded-xl border px-2 py-2 text-center transition
                        ${
                          answers[IDX] === num
                            ? "border-rose-700 bg-rose-700 text-white shadow-md shadow-rose-500/20"
                            : "border-slate-200 bg-white text-slate-600 hover:border-rose-300 hover:bg-rose-50"
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

                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-center text-sm italic text-slate-500">
                  Please ensure all questions are answered before submitting.
                </div>

                <button
                  type="submit"
                  className="basic_button mt-0 w-full py-3"
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
