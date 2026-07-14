import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import withLoader from "../../utils/withLoader";
import Loader from "../../components/utilityComponents/Loader";
import fetchFn from "../../utils/fetchFn";

const AddFaculty = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const nameRef = useRef();
  const emailRef = useRef();
  const deptRef = useRef();
  const navigate = useNavigate();
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const department = deptRef.current.value;

    if (
      !confirm(`You are going to add ${name} in database, click ok to confirm`)
    )
      return;

    await withLoader(async () => {
      try {
        const data = await fetchFn(
          `/admin/${id}/faculties/new`,
          "POST",
          JSON.stringify({ name, email, department })
        );

        if (data.ok) {
          alert("Faculty added successfully");
          navigate(`/admin/${id}`);
        } else {
          alert(`Error: ${data.error || data.message}`);
        }
      } catch (err) {
        console.error("Fetch failed:", err);
        alert("Something went wrong while adding faculty");
      }
    }, setLoading);

    nameRef.current.value = "";
    emailRef.current.value = "";
    deptRef.current.value = "";
  };

  return (
    <>
      {loading && <Loader />}
      <div className="flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center px-4 py-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-600">Faculty directory</p>
        <h2 className="mb-5 mt-1 text-center text-2xl font-extrabold text-slate-800">
          Enter Faculty Details
        </h2>
        <form
          onSubmit={handleOnSubmit}
          className="panel-card w-full max-w-md space-y-5 p-6 sm:p-8"
        >
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Faculty Name
            </label>
            <input
              type="text"
              ref={nameRef}
              placeholder="Enter full name"
              required
              className="basic_input"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Faculty Email
            </label>
            <input
              type="email"
              ref={emailRef}
              placeholder="Enter email"
              required
              className="basic_input"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Department
            </label>
            <select
              ref={deptRef}
              id="department"
              required
              className="w-full basic_dropdown"
            >
              <option value="CS">Computer Science</option>
              <option value="CE">Civil Engineering</option>
              <option value="EE">Electrical Engineering</option>
              <option value="ME">Mechanical Engineering</option>
              <option value="EC">Electronics and Telecommunication</option>
            </select>
          </div>

          <button
            type="submit"
            className="basic_button mt-1 w-full"
          >
            Add Faculty
          </button>
        </form>
      </div>
    </>
  );
};
export default AddFaculty;
