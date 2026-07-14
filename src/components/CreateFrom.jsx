import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import withLoader from "../utils/withLoader";
import Loader from "./utilityComponents/Loader";
import fetchFn from "../utils/fetchFn";

const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;
const TERM_REGEX = /^(W|S)-(2[3-9]|30)$/;

const CreateForm = () => {
  const { id } = useParams();

  const deptRef = useRef();
  const semRef = useRef();
  const subjectRef = useRef();
  const termRef = useRef();

  const [subjects, setSubjects] = useState(null);
  const [loading, setLoading] = useState(false);
  const [button, setButton] = useState(false);

  const [limit, setLimit] = useState("");
  const [error, setError] = useState("");
  const [termError, setTermError] = useState("");

  const [linkMessage, setLinkMessage] = useState(null);
  const [code, setCode] = useState("");

  /* ------------------ Submit ------------------ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading || error || termError || !limit || !subjects?.length) return;

    const selectedCode = subjectRef.current.value;
    const term = termRef.current.value.trim();

    if (!TERM_REGEX.test(term)) {
      setTermError("Format: W-25 or S-26 (W/S + dash + year 23–30)");
      return;
    }

    const subject = subjects.find((s) => s.unique_code === selectedCode);
    if (!subject) {
      alert("Please select a valid subject");
      return;
    }

    setCode(selectedCode);

    await withLoader(async () => {
      await fetchFn(
        `/faculty/${id}/subject`,
        "PUT",
        JSON.stringify({ code: selectedCode })
      );

      const data = await fetchFn(
        `/faculty/${id}/feedback`,
        "POST",
        JSON.stringify({
          limit,
          term,
          subject: subject._id,
          link: `${FRONTEND_URL}/faculty/${id}/feedback/${term}/${selectedCode}`,
        })
      );

      if (data?.result) {
        setLinkMessage(data.result); // store full object
        setButton(true);
        setError("");
        setTermError("");
      } else {
        alert(data?.error || "Failed to create feedback form");
      }
    }, setLoading);
  };

  /* ------------------ Fetch Subjects ------------------ */
  const handleOnChange = async () => {
    const dept = deptRef.current.value;
    const sem = semRef.current.value;

    if (!dept || dept === "selectDepartment") {
      setSubjects(null);
      return;
    }

    const url =
      sem && sem !== "selectSem"
        ? `/faculty/${id}/subject/${dept}/${sem}`
        : `/faculty/${id}/subject/${dept}`;

    await withLoader(async () => {
      const data = await fetchFn(url, "GET");
      setSubjects(data.subjects || []);
    }, setLoading);
  };

  /* ------------------ Reset ------------------ */
  const resetForm = () => {
    setButton(false);
    setSubjects(null);
    setLimit("");
    setError("");
    setTermError("");
    setLinkMessage(null);
    setCode("");
    deptRef.current.value = "selectDepartment";
    semRef.current.value = "selectSem";
  };

  return (
    <div className="flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center px-4 py-10">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-600">Feedback workflow</p>
      <h2 className="mb-5 mt-1 text-2xl font-extrabold text-slate-800">
        Create Feedback Form
      </h2>

      {loading && <Loader />}

      {!button ? (
        <form
          onSubmit={handleSubmit}
          className="panel-card flex w-full max-w-md flex-col gap-4 p-6 sm:p-8"
        >
          {/* Department */}
          <select
            ref={deptRef}
            required
            onChange={handleOnChange}
            defaultValue="selectDepartment"
            className="basic_dropdown"
            disabled={loading}
          >
            <option value="selectDepartment">Select Department</option>
            <option value="CS">Computer Science</option>
            <option value="CE">Civil Engineering</option>
            <option value="EE">Electrical Engineering</option>
            <option value="ME">Mechanical Engineering</option>
            <option value="EC">Electronics and Telecommunication</option>
          </select>

          {/* Semester */}
          <select
            ref={semRef}
            required
            onChange={handleOnChange}
            defaultValue="selectSem"
            className="basic_dropdown"
            disabled={loading}
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

          {/* Subject */}
          <select
            ref={subjectRef}
            required
            className="basic_dropdown"
            disabled={!subjects || loading}
          >
            {subjects?.length ? (
              subjects.map((s) => (
                <option key={s._id} value={s.unique_code}>
                  {s.name}
                </option>
              ))
            ) : (
              <option>Select subject</option>
            )}
          </select>

          {/* Limit */}
          <input
            type="number"
            required
            min="1"
            max="100"
            placeholder="Maximum responses allowed (1–100)"
            value={limit}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (!val || val > 100) {
                setError("Limit must be between 1 and 100");
              } else {
                setError("");
                setLimit(e.target.value);
              }
            }}
            className={`basic_input ${error ? "border-red-500" : ""}`}
            disabled={loading}
          />
          {error && <span className="text-red-500 text-sm">{error}</span>}

          {/* Term */}
          <input
            ref={termRef}
            required
            placeholder="Term (e.g. W-25 or S-26)"
            onChange={(e) => {
              const val = e.target.value.trim();
              setTermError(
                TERM_REGEX.test(val)
                  ? ""
                  : "Format: W-25 or S-26 (W/S + dash + year 23–30)"
              );
            }}
            className={`basic_input ${termError ? "border-red-500" : ""}`}
            disabled={loading}
          />
          {termError && (
            <span className="text-red-500 text-sm">{termError}</span>
          )}

          <button
            type="submit"
            disabled={loading || error || termError || !subjects?.length}
            className={`basic_button ${
              loading || error || termError
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Create Form
          </button>
        </form>
      ) : (
        /* ---------- SUCCESS UI ---------- */
        <div className="panel-card flex w-full max-w-md flex-col gap-4 p-6 sm:p-8">
          <h3 className="text-lg font-extrabold text-emerald-700">
            Feedback form created successfully
          </h3>

          <a
            href={linkMessage.link}
            target="_blank"
            rel="noreferrer"
            className="break-words rounded-xl border border-rose-100 bg-rose-50 p-3 text-sm font-medium text-rose-700 underline"
          >
            {linkMessage.link}
          </a>

          <div className="flex gap-3">
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `${FRONTEND_URL}/faculty/${id}/feedback/${code}`
                );
                alert("Link copied!");
              }}
              className="basic_button"
            >
              Copy Link
            </button>

            <button
              onClick={resetForm}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              Create Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateForm;
