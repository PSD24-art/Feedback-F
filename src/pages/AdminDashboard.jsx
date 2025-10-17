import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import withLoader from "../utils/withLoader";
import Loader from "../components/Loader";
import fetchFn from "../utils/fetchFn";
const AdminDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    withLoader(async () => {
      const data = await fetchFn(`/admin/${id}`, "GET");
      setFacultyList(data.allFaculties);
      if (!data.admin.isPasswordSet) {
        navigate(`/change-password/${id}`);
      }
    }, setLoading);
  }, []);

  const handleOnClick = (facultyId) => {
    navigate(`/admin/${id}/faculty/${facultyId}`);
  };

  const handleAddFacultyClick = async () => {
    navigate(`/admin/${id}/faculty/new`);
  };
  return (
    <>
      {loading && <Loader />}
      <div className="mt-10 p-6">
        {/* Title */}
        <h2 className="text-xl mt-3 font-cursive text-center pb-2 text-basic_color font-bold mb-6 border-b-2">
          Welcome to Admin Dashboard
        </h2>

        {/* Department Filter */}
        <div className="items-center mb-6">
          <select id="dept" className="w-50 basic_dropdown">
            <option value=" ">Select Department</option>
            <option value="CS">Computer Science</option>
          </select>
        </div>

        {/* Faculty List */}
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {facultyList.map((faculty) => (
            <li
              key={faculty._id}
              className="bg-white border-2 border-red-200 rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-lg hover:border-red-400 transition"
            >
              {/* Faculty Info */}
              <div className="text-gray-800">
                <p className="font-semibold text-lg text-basic_color">
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
                className="hover:cursor-pointer flex hover:bg-gray-100 rounded-e-xl h-full justify-center items-center text-red-500 hover:text-red  -700 transition"
                title="View Faculty"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AdminDashboard;
