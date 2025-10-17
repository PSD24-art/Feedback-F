import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import withLoader from "../utils/withLoader";
import Loader from "./Loader";
import fetchFn from "../utils/fetchFn";
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
      const data = await fetchFn(
        `/faculty/${id}/subject`,
        "POST",
        JSON.stringify({ name, code, department, semester })
      );

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
      <div className=" mt-17 mb-3 m-8">
        <h2 className="mb-4 text-xl font-semibold text-basic_color">
          Add Subject
        </h2>
        {message === null ? (
          <form
            onSubmit={handleSubmit}
            className=" flex flex-col gap-4 bg-white p-6 rounded-lg border-2 basic_border shadow-md"
          >
            {/* Subject Name */}
            <input
              type="text"
              id="subName"
              ref={nameRef}
              placeholder="Subject Name"
              className="basic_input"
            />

            {/* Department */}
            <div className="flex flex-col">
              <label
                htmlFor="department"
                className="mb-1 font-medium text-gray-700"
              >
                Department
              </label>
              <select ref={deptRef} id="department" className="basic_dropdown">
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
              <select ref={codeRef} id="code" className="basic_dropdown">
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
                className="basic_dropdown"
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

            <button type="submit" className="basic_button">
              Add New Subject
            </button>
          </form>
        ) : (
          <h3 className="text-green-600 font-semibold">{message}</h3>
        )}
      </div>
    </>
  );
};
export default AddSubject;
