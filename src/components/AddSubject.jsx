import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import withLoader from "../utils/withLoader";
import Loader from "./Loader";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const AddSubject = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const nameRef = useRef();
  const deptRef = useRef();
  const codeRef = useRef();
  const semesterRef = useRef();
  const [message, setMessage] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const code = codeRef.current.value;
    const department = deptRef.current.value;
    const semester = semesterRef.current.value;
    withLoader(async () => {
      const res = await fetch(`${BASE_URL}/faculties/${id}/subject`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, code, department, semester }),
      });
      const data = await res.json();
      console.log(data);
      if (data.message) {
        setMessage(data.message);
      } else if (data.error) {
        setMessage(data.error);
      }
    }, setLoading);
  };

  return (
    <>
      {loading && <Loader />}
      <h2 className="mb-4 text-xl font-semibold text-orange-600">
        Add Subject
      </h2>
      {message === null ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-white p-6 rounded-lg border-2 border-orange-200 shadow-md"
        >
          {/* Subject Name */}
          <input
            type="text"
            id="subName"
            ref={nameRef}
            placeholder="Subject Name"
            className="p-2 border-2 border-orange-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />

          {/* Department */}
          <div className="flex flex-col">
            <label
              htmlFor="department"
              className="mb-1 font-medium text-gray-700"
            >
              Department
            </label>
            <select
              ref={deptRef}
              id="department"
              className="p-2 border-2 border-orange-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
            >
              <option value="CS">Computer Science</option>
              <option value="CE">Civil Engineering</option>
              <option value="EE">Electrical Engineering</option>
              <option value="ME">Mechanical Engineering</option>
              <option value="EC">Electronics and Telecommunication</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="code" className="mb-1 font-medium text-gray-700">
              Code
            </label>
            <select
              ref={codeRef}
              id="code"
              className="p-2 border-2 border-orange-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
            >
              {[...Array(10).keys()].map((n) => (
                <option key={n + 1} value={String(n + 1).padStart(2, "0")}>
                  {n + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="semester"
              className="mb-1 font-medium text-gray-700"
            >
              Semester
            </label>
            <select
              ref={semesterRef}
              id="semester"
              className="p-2 border-2 border-orange-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
            >
              <option value="01">SEM I</option>
              <option value="02">SEM II</option>
              <option value="03">SEM III</option>
              <option value="04">SEM IV</option>
              <option value="05">SEM V</option>
              <option value="06">SEM VI</option>
              <option value="07">SEM VII</option>
              <option value="08">SEM VIII</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-orange-500 text-white font-semibold rounded-md shadow-md hover:bg-orange-600 transition active:scale-95"
          >
            Add New Subject
          </button>
        </form>
      ) : (
        <h3 className="text-green-600 font-semibold">{message}</h3>
      )}
    </>
  );
};
export default AddSubject;
