import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import withLoader from "../../utils/withLoader";
import Loader from "../../components/utilityComponents/Loader";
import fetchFn from "../../utils/fetchFn";
import "../../App.css";
const AdminDashboard = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("CS");
  const { id } = useParams();
  const navigate = useNavigate();
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      await withLoader(async () => {
        const data = await fetchFn(`/admin/${id}/${selectedDepartment}`, "GET");
        setFacultyList(data.allFaculties || []);
        if (!data.admin.isPasswordSet) {
          navigate(`/change-password/${id}`);
        }
      }, setLoading);
    };
    fetchData();
  }, [id, selectedDepartment]);

  const handleOnChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleOnClick = (facultyId) => {
    navigate(`/admin/${id}/faculty/${facultyId}`);
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

        <div className="flex flex-row mb-6 items-center">
          <label
            htmlFor="department"
            className="mb-1 font-medium text-gray-700 mr-5"
          >
            Department :
          </label>
          <select
            value={selectedDepartment}
            onChange={handleOnChange}
            id="department"
            className="mb-1 w-50 basic_dropdown"
          >
            <option value="CS">Computer Science</option>
            <option value="CE">Civil Engineering</option>
            <option value="EE">Electrical Engineering</option>
            <option value="ME">Mechanical Engineering</option>
            <option value="EC">Electronics and Telecommunication</option>
          </select>
        </div>

        {/* Faculty List */}
        {facultyList.length !== 0 ? (
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
        ) : (
          <div className="notFoundClass">No Faculties to show</div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
