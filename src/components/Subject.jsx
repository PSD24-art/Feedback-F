import { useEffect, useState } from "react";
import CreateForm from "./CreateFrom";
import AddSubject from "./AddSubject";
import { useParams, useNavigate } from "react-router-dom";
import withLoader from "../utils/withLoader";
import Loader from "../components/Loader";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const Subject = () => {
  const navigate = useNavigate();
  const [clickValue, setClickValue] = useState(null);
  const { id } = useParams();
  const [shouldFetch, setShouldFetch] = useState(false);
  const [feedbackLinks, setFeedbackLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    withLoader(async () => {
      try {
        const res = await fetch(`${BASE_URL}/faculties/${id}/feedback`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        console.log("Fetched:", data.links);
        setFeedbackLinks(data.links);
      } catch (err) {
        console.error("Failed to fetch links", err);
      }
    }, setLoading);
  }, [shouldFetch]);

  const handleDelete = async (link) => {
    const confirmed = confirm("Are you sure want to delete this form");
    if (!confirmed) return;

    withLoader(async () => {
      const res = await fetch(`${BASE_URL}/faculties/${id}/feedback/${link}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      setShouldFetch((prev) => !prev);
    }, setLoading);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="ps-2 pe-2">
        <div className="mt-16 mb-4 text-xl font-semibold text-orange-600">
          All Created Links
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
          {feedbackLinks &&
            feedbackLinks.map((linkObj) => (
              <div
                key={linkObj._id}
                className="bg-white border-2 border-orange-200 rounded-lg shadow-md p-4 hover:shadow-lg hover:border-orange-400 transition flex flex-col"
              >
                {/* Subject Name */}
                <p className="text-lg font-semibold text-gray-800 mb-1">
                  {linkObj.subject?.name}
                </p>

                {/* Link Section */}
                <a
                  href={linkObj.link}
                  target="_blank"
                  rel="noreferrer"
                  className="block truncate max-w-[250px] text-sm text-blue-600 underline mb-3 hover:text-blue-800"
                  title={linkObj.link}
                >
                  {linkObj.link}
                </a>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(linkObj._id)}
                    className="hover:cursor-pointer px-3 py-1 bg-red-100 text-red-600 rounded-md text-sm hover:bg-red-200 transition"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(linkObj.link);
                      alert("Link copied to clipboard!");
                    }}
                    className="hover:cursor-pointer px-3 py-1 bg-orange-100 text-orange-600 rounded-md text-sm hover:bg-orange-200 transition"
                  >
                    Copy
                  </button>
                </div>
              </div>
            ))}
        </div>

        {clickValue === "AddSubject" && (
          <div className="relative bg-white border-2 border-orange-200 rounded-lg shadow-md p-4 mb-6">
            {/* Close Button */}
            <button
              onClick={() => setClickValue(null)}
              className="absolute top-0 right-2 text-2xl text-gray-500 hover:text-red-500 transition"
              title="Close"
            >
              ✕
            </button>
            <AddSubject />
          </div>
        )}

        {clickValue === "CreateForm" && (
          <div className="relative bg-white border-2 border-orange-200 rounded-lg shadow-md p-4 pt-8 mb-6">
            {/* Close Button */}
            <button
              onClick={() => setClickValue(null)}
              className="hover:cursor-pointer absolute top-0 right-2 text-gray-500 text-2xl mt-0 hover:text-red-500 transition"
              title="Close"
            >
              ✕
            </button>
            <CreateForm triggerFetch={() => setShouldFetch((prev) => !prev)} />
          </div>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setClickValue("AddSubject")}
            className="hover:cursor-pointer px-4 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
          >
            Add Subject
          </button>
          <button
            onClick={() => setClickValue("CreateForm")}
            className="hover:cursor-pointer px-4 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
          >
            Create Form
          </button>
          <button
            onClick={() => navigate(`/faculty/${id}`)}
            className="hover:cursor-pointer px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default Subject;
