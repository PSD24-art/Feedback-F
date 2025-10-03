import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import withLoader from "../utils/withLoader";
import Loader from "../components/Loader";
const AdminDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    withLoader(async () => {
      const res = await fetch(`${BASE_URL}/admin/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setFacultyList(data.allFaculties);
      console.log(data);
      if (!data.admin.isPasswordSet) {
        navigate(`/change-password/${id}`);
      }
    }, setLoading);
  }, []);

  const handleOnClick = (facultyId) => {
    console.log("Clicked Faculty");
    navigate(`/admin/${id}/faculty/${facultyId}`);
  };

  const handleAddFacultyClick = async () => {
    console.log("Clicked Add faculty");
    navigate(`/admin/${id}/faculty/new`);
  };
  return (
    <>
      {loading && <Loader />}
      <div className="mt-10 p-6">
        {/* Title */}
        <h2 className="text-xl mt-3 font-cursive text-center pb-2 text-orange-600 font-bold mb-6 border-b-2">
          Welcome to Admin Dashboard
        </h2>

        {/* Department Filter */}
        <div className="items-center mb-6">
          <select
            id="dept"
            className="border-2 border-orange-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none"
          >
            <option value=" ">Select Department</option>
            <option value="CS">Computer Science</option>
          </select>
        </div>

        {/* Faculty List */}
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {facultyList.map((faculty) => (
            <li
              key={faculty._id}
              className="bg-white border-2 border-orange-200 rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-lg hover:border-orange-400 transition"
            >
              {/* Faculty Info */}
              <div className="text-gray-800">
                <p className="font-semibold text-lg text-orange-600">
                  {faculty.name}
                </p>
                <p className="text-sm text-gray-600">{faculty.username}</p>
                <p className="text-sm font-medium text-gray-700">
                  {faculty.department}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleOnClick(faculty._id)}
                className="hover:cursor-pointer flex hover:bg-gray-100 rounded-e-xl h-full justify-center items-center text-orange-500 hover:text-orange-700 transition"
                title="View Faculty"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </li>
          ))}
        </ul>

        {/* Add Faculty Button */}
        <div className="flex justify-center">
          <button
            onClick={handleAddFacultyClick}
            className="hover:cursor-pointer bg-orange-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-orange-600 transition"
          >
            Add Faculty
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
