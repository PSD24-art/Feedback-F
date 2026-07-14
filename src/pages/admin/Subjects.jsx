import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Trash } from "lucide-react";
import withLoader from "../../utils/withLoader";
import fetchFn from "../../utils/fetchFn";
import Loader from "../../components/utilityComponents/Loader";
const subjectsData = {};
const Subjects = () => {
  const { id } = useParams();
  const [dept, setDept] = useState("CS");
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    let cacheKey = `${id}-${dept}`;

    if (subjectsData[cacheKey]) {
      setSubjects(subjectsData[cacheKey]);
      return;
    }

    const fetchSubjects = async () => {
      await withLoader(async () => {
        const data = await fetchFn(`/admin/${id}/subjects/${dept}`, "GET");
        setSubjects(data.subjects || []);
        subjectsData[cacheKey] = data.subjects;
      }, setLoading);
    };

    fetchSubjects();
  }, [dept, id, fetch]);

  const handleDelete = (subject_id) => {
    const isconfirm = confirm("Want to delete this subject?");
    if (!isconfirm) return;
    withLoader(async () => {
      const data = await fetchFn(
        `/admin/${id}/subjects/${subject_id}`,
        "DELETE",
      );
      if (data) {
        alert(data.message);
        setFetch((prev) => !prev);
      }
    }, setLoading);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="mx-auto w-full max-w-7xl p-4 sm:p-6">
        {/* Title */}
        <div className="panel-card mb-5 flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-600">Subject catalogue</p>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-800">
          All Subjects
            </h2>
          </div>
          <button
            className="basic_button mt-0 w-full sm:w-auto"
            onClick={() => {
              navigate(`/admin/${id}/subjects/new`);
            }}
          >
            Add Subject
          </button>
        </div>
        <label htmlFor="department" className="mb-1 font-semibold text-slate-700">
          Department
        </label>
        {/* Department Filter */}
        <div className="mb-6 flex flex-row items-center justify-between">
          <div className="flex flex-col pt-2 w-[180px] sm:w-fit">
            <select
              required
              value={dept}
              id="department"
              onChange={(e) => setDept(e.target.value)}
              className="basic_dropdown"
            >
              <option value="CS">Computer Science</option>
              <option value="CE">Civil Engineering</option>
              <option value="EE">Electrical Engineering</option>
              <option value="ME">Mechanical Engineering</option>
              <option value="EC">Electronics and Telecommunication</option>
            </select>
          </div>
        </div>

        {/* Subjects List */}
        {subjects.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {subjects.map((subject) => (
              <div
                key={subject._id}
                className="panel-card flex items-center justify-between overflow-hidden transition hover:-translate-y-0.5 hover:border-rose-200"
              >
                <li className="flex items-center justify-between px-5 py-4">
                  <div className="flex flex-col gap-1 text-slate-800">
                    <p className="text-lg font-bold text-slate-800">
                      {subject.name}
                    </p>

                    <div className="flex flex-wrap gap-x-6 text-sm text-slate-500">
                      <span className="font-medium">
                        Code: {subject.unique_code}
                      </span>
                      <span className="font-medium">
                        Dept: {subject.department}
                      </span>
                      <span className="font-medium">
                        Created by: {subject.created_by?.name || "System"}
                      </span>
                    </div>
                  </div>
                </li>

                <button
                  onClick={() => handleDelete(subject._id)}
                  className="h-full rounded-r-xl px-4 py-2 text-rose-700 transition-colors hover:bg-rose-50 hover:text-rose-800"
                >
                  <Trash size={20} />
                </button>
              </div>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-16">
            <p className="text-lg font-semibold text-gray-700 mb-2">
              No subjects found
            </p>
            <p className="text-sm text-gray-500 text-center mb-4">
              There are currently no subjects available for this department. You
              can add a new subject to get started.
            </p>

            <button
              onClick={() => navigate(`/admin/${id}/subjects/new`)}
              className="basic_button"
            >
              Add Subject
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Subjects;
