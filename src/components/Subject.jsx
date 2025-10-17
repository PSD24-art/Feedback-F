import { useEffect, useState } from "react";
import AddSubject from "./AddSubject";
import { useParams } from "react-router-dom";
import withLoader from "../utils/withLoader";
import Loader from "../components/Loader";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const Subject = () => {
  const [clickValue, setClickValue] = useState(null);
  const { id } = useParams();
  const [shouldFetch, setShouldFetch] = useState(false);
  const [feedbackLinks, setFeedbackLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    withLoader(async () => {
      try {
        const res = await fetch(`${BASE_URL}/faculty/${id}/feedback`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();

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
      const res = await fetch(`${BASE_URL}/faculty/${id}/feedback/${link}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setShouldFetch((prev) => !prev);
    }, setLoading);
  };

  return (
    <>
      {loading && <Loader />}
      <div className=" w-[100%] ps-6 pe-6">
        <div className=" mt-16 mb-4 text-xl font-semibold text-basic_color">
          All Created Links
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
          {feedbackLinks &&
            feedbackLinks.map((linkObj) => (
              <div
                key={linkObj._id}
                className="bg-white border-2 basic_border rounded-lg shadow-md p-4 hover:shadow-lg transition flex flex-col"
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
                    className="hover:cursor-pointer px-3 py-1 bg-orange-100 text-basic_color rounded-md text-sm hover:bg-orange-200 transition"
                  >
                    Copy
                  </button>
                </div>
              </div>
            ))}
        </div>

        {clickValue === "AddSubject" && (
          <div className="flex flex-col justify-center items-center relative bg-white border-2 border-orange-200 rounded-lg shadow-md p-4 mb-6">
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
      </div>
    </>
  );
};

export default Subject;
