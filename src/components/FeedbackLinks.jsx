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

      <div className="w-full px-6">
        {/* Header */}
        <div className="mt-16 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-xl font-semibold text-basic_color">
            Feedback Links by Term
          </h2>

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
                className="bg-white border-2 basic_border rounded-lg shadow-md p-4 hover:shadow-lg transition flex flex-col"
              >
                {/* Subject */}
                <p className="text-lg font-semibold text-gray-800 mb-1">
                  {linkObj.subject?.name || "Unknown Subject"}
                </p>

                {/* Term */}
                <p className="text-sm text-gray-600 mb-2">
                  Term: <span className="font-medium">{linkObj.term}</span>
                </p>

                {/* Link */}
                <a
                  href={linkObj.link}
                  target="_blank"
                  rel="noreferrer"
                  className="block truncate max-w-[250px] text-sm text-blue-600 underline mb-3"
                  title={linkObj.link}
                >
                  {linkObj.link}
                </a>

                {/* Actions */}
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleDelete(linkObj._id)}
                    className="px-3 py-1 bg-red-100 text-red-600 rounded-md text-sm hover:bg-red-200 transition"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(linkObj.link);
                      alert("Link copied to clipboard!");
                    }}
                    className="px-3 py-1 bg-orange-100 text-basic_color rounded-md text-sm hover:bg-orange-200 transition"
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
          <div className="relative bg-white border-2 border-orange-200 rounded-lg shadow-md p-4 mb-6">
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
