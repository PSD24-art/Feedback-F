import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Trash } from "lucide-react";
import withLoader from "../../utils/withLoader";
import Loader from "../../components/utilityComponents/Loader";
import fetchFn from "../../utils/fetchFn";

const Subjects = () => {
  const { id } = useParams();
  const deptRef = useRef();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetch, setFetch] = useState(false);
  useEffect(() => {
    const fetchSubjects = async () => {
      const dept = deptRef.current?.value || "CS";
      await withLoader(async () => {
        const data = await fetchFn(`/admin/${id}/subjects/${dept}`, "GET");
        setSubjects(data.subjects || []);
      }, setLoading);
    };

    fetchSubjects();
  }, [fetch]);

  const handleOnChange = async () => {
    const dept = deptRef.current.value;
    await withLoader(async () => {
      const data = await fetchFn(`/admin/${id}/subjects/${dept}`, "GET");
      setSubjects(data.subjects || []);
    }, setLoading);
  };

  const handleDelete = (subject_id) => {
    const isconfirm = confirm("Want to delete this subject?");
    if (!isconfirm) return;
    withLoader(async () => {
      const data = await fetchFn(
        `/admin/${id}/subjects/${subject_id}`,
        "DELETE"
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
      <div className="mt-10 p-6">
        {/* Title */}
        <h2 className="text-xl mt-3 font-cursive text-center pb-2 text-basic_color font-bold mb-6 border-b-2">
          All Subjects
        </h2>
        <label htmlFor="department" className="mb-1 font-medium text-gray-700">
          Department
        </label>
        {/* Department Filter */}
        <div className="flex flex-row items-center mb-6 justify-between">
          <div className="flex flex-col pt-2 w-[180px] sm:w-fit">
            <select
              required
              ref={deptRef}
              id="department"
              onChange={handleOnChange}
              defaultValue="CS"
              className="basic_dropdown"
            >
              <option value="CS">Computer Science</option>
              <option value="CE">Civil Engineering</option>
              <option value="EE">Electrical Engineering</option>
              <option value="ME">Mechanical Engineering</option>
              <option value="EC">Electronics and Telecommunication</option>
            </select>
          </div>
          <div className="">
            <button
              className="basic_button w-[122px]"
              onClick={() => {
                navigate(`/admin/${id}/subjects/new`);
              }}
            >
              Add Subject
            </button>
          </div>
        </div>

        {/* ✅ Subjects List */}
        {subjects.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {subjects.map((subject) => (
              <div
                key={subject._id}
                className="bg-white border border-red-200 rounded-xl shadow-sm flex justify-between items-center hover:shadow-md hover:border-red-400 transition-all duration-300"
              >
                <li className="bg-white rounded-l-xl flex justify-between items-center px-5 pe-0 py-4">
                  <div className="flex flex-col gap-1 text-gray-800">
                    <p className="font-semibold text-lg text-basic_color">
                      {subject.name}
                    </p>

                    <div className="flex flex-wrap gap-x-6 text-sm text-gray-600">
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
                  className="text-basic_color hover:text-red-500 bg-white hover:bg-gray-100 h-full rounded-r-xl px-3 py-2 transition-colors duration-300"
                >
                  <Trash size={20} />
                </button>
              </div>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 border border-dashed border-gray-300 rounded-xl">
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
