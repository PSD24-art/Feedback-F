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
      <div className="mt-15 flex justify-center items-center ps-3 pe-3 flex-col ">
        <h2 className="text-xl text-center font-bold text-basic_color mt-4 mb-2">
          Enter Faculty Details
        </h2>
        <form
          onSubmit={handleOnSubmit}
          className="bg-white shadow-md basic_border rounded-xl p-6 w-full max-w-md space-y-6 border-2 border-amber-100"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
            className="w-full bg-basic_color basic_button text-white font-medium py-2 rounded-lg shadow transition"
          >
            Add Faculty
          </button>
        </form>
      </div>
    </>
  );
};
export default AddFaculty;
