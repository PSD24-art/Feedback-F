import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddSubject from "./AddSubject";
import withLoader from "../utils/withLoader";
import Loader from "./utilityComponents/Loader";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const FeedbackLinks = () => {
  const { id } = useParams();

  const [terms, setTerms] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState("");
  const [feedbackLinks, setFeedbackLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [clickValue, setClickValue] = useState(null);

  /* ---------------------------------------------
     1️⃣ Fetch available terms
  ----------------------------------------------*/
  useEffect(() => {
    withLoader(async () => {
      try {
        const res = await fetch(`${BASE_URL}/faculty/${id}/feedback/term`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        const fetchedTerms = data.terms || [];

        setTerms(fetchedTerms);

        // ✅ Auto-select first term
        if (fetchedTerms.length > 0) {
          setSelectedTerm(fetchedTerms[0]);
        }
      } catch (err) {
        console.error("Failed to fetch terms", err);
      }
    }, setLoading);
  }, [id]);

  /* ---------------------------------------------
     2️⃣ Fetch feedback links (TERM ONLY)
  ----------------------------------------------*/
  useEffect(() => {
    if (!selectedTerm) return;

    withLoader(async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/faculty/${id}/feedbacks?term=${selectedTerm}`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await res.json();
        console.log(data);

        if (data.links) setFeedbackLinks(data.links || []);
      } catch (err) {
        console.error("Failed to fetch links", err);
      }
    }, setLoading);
  }, [id, selectedTerm, refresh]);

  /* ---------------------------------------------
     Delete feedback link
  ----------------------------------------------*/
  const handleDelete = async (linkId) => {
    const confirmed = confirm("Are you sure you want to delete this form?");
    if (!confirmed) return;

    withLoader(async () => {
      await fetch(`${BASE_URL}/faculty/${id}/feedback/${linkId}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      setRefresh((prev) => !prev);
    }, setLoading);
  };

  return (
    <>
      {loading && <Loader />}

      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
        {/* Header */}
        <div className="panel-card mb-5 flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-600">Feedback workflow</p>
            <h2 className="mt-1 text-xl font-extrabold text-slate-800">
            Feedback Links by Term
            </h2>
          </div>

          {/* ✅ Term Filter (NO ALL OPTION) */}
          <select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
            className="basic_dropdown w-[180px]"
            disabled={!terms.length}
          >
            {terms.map((term) => (
              <option key={term} value={term}>
                {term}
              </option>
            ))}
          </select>
        </div>

        {/* Links Grid */}
        {feedbackLinks.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
            {feedbackLinks.map((linkObj) => (
              <div
                key={linkObj._id}
                className="panel-card flex flex-col p-5 transition hover:-translate-y-0.5 hover:border-rose-200"
              >
                {/* Subject */}
                <p className="mb-1 text-lg font-bold text-slate-800">
                  {linkObj.subject?.name || "Unknown Subject"}
                </p>

                {/* Term */}
                <p className="mb-3 text-sm text-slate-500">
                  Term: <span className="font-medium">{linkObj.term}</span>
                </p>

                {/* Link */}
                <a
                  href={linkObj.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mb-4 block max-w-[250px] truncate text-sm font-medium text-rose-700 underline"
                  title={linkObj.link}
                >
                  {linkObj.link}
                </a>

                {/* Actions */}
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleDelete(linkObj._id)}
                    className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(linkObj.link);
                      alert("Link copied to clipboard!");
                    }}
                    className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                  >
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 italic mb-6">
            No feedback links found for this term.
          </div>
        )}

        {/* Add Subject Section */}
        {clickValue === "AddSubject" && (
          <div className="panel-card relative mb-6 p-4">
            <button
              onClick={() => setClickValue(null)}
              className="absolute top-0 right-2 text-2xl text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
            <AddSubject />
          </div>
        )}
      </div>
    </>
  );
};

export default FeedbackLinks;
