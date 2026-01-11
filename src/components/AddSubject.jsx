import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import withLoader from "../utils/withLoader";
import Loader from "./utilityComponents/Loader";
import fetchFn from "../utils/fetchFn";
import useAuth from "../store/AuthProvider";

const AddSubject = () => {
  const { user } = useAuth();
  const { id } = useParams();

  const nameRef = useRef();
  const deptRef = useRef();
  const codeRef = useRef();
  const semesterRef = useRef();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value.trim();
    const code = codeRef.current.value;
    const department = deptRef.current.value;
    const semester = semesterRef.current.value;

    await withLoader(async () => {
      if (user.role === "faculty") {
        const data = await fetchFn(
          `/faculty/${id}/subject`,
          "POST",
          JSON.stringify({ name, code, department, semester })
        );

        if (data?.message) {
          alert(data.message);
          e.target.reset();
        } else if (data?.error) {
          alert(data.error);
        }
      }

      if (user.role === "admin") {
        const data = await fetchFn(
          `/admin/${id}/subject`,
          "POST",
          JSON.stringify({ name, code, department, semester })
        );

        if (data?.message) {
          alert(data.message);
          e.target.reset();
        } else if (data?.error) {
          alert(data.error);
        }
      }
    }, setLoading);
  };

  return (
    <>
      {loading && <Loader />}

      <div className="flex items-center flex-col mt-17 mb-3 m-8">
        <h2 className="mb-4 text-xl font-semibold text-basic_color">
          Add Subject
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-white p-6 rounded-lg border-2 basic_border shadow-md"
        >
          {/* Subject Name */}
          <input
            type="text"
            ref={nameRef}
            required
            placeholder="Subject Name (Ex. Computer Graphics)"
            className="basic_input"
          />

          {/* Department */}
          <select ref={deptRef} required className="basic_dropdown">
            <option value="CS">Computer Science</option>
            <option value="CE">Civil Engineering</option>
            <option value="EE">Electrical Engineering</option>
            <option value="ME">Mechanical Engineering</option>
            <option value="EC">Electronics and Telecommunication</option>
          </select>

          {/* Code */}
          <select ref={codeRef} required className="basic_dropdown">
            {[...Array(10).keys()].map((n) => (
              <option key={n + 1} value={String(n + 1).padStart(2, "0")}>
                {n + 1}
              </option>
            ))}
          </select>

          {/* Semester */}
          <select ref={semesterRef} required className="basic_dropdown">
            <option value="01">SEM I</option>
            <option value="02">SEM II</option>
            <option value="03">SEM III</option>
            <option value="04">SEM IV</option>
            <option value="05">SEM V</option>
            <option value="06">SEM VI</option>
            <option value="07">SEM VII</option>
            <option value="08">SEM VIII</option>
          </select>

          <button type="submit" className="basic_button">
            Add New Subject
          </button>
        </form>
      </div>
    </>
  );
};

export default AddSubject;
