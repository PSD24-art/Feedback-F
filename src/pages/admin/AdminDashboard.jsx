import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import withLoader from "../../utils/withLoader";
import Loader from "../../components/utilityComponents/Loader";
import fetchFn from "../../utils/fetchFn";
import FacultyDashFromAdmin from "./FacultyDashFromAdmin";
import SkeletonCard from "../../components/utilityComponents/SkeletonCard";

const facultyCache = {}; //Global cache

const AdminDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDepartment, setSelectedDepartment] = useState("CS");
  const [facultyList, setFacultyList] = useState([]);
  const [selectedFacultyId, setSelectedFacultyId] = useState(() => {
    return localStorage.getItem(`selectedFaculty-${id}`);
  });

  const [loading, setLoading] = useState(false);

  const handleDeleteFaculty = async () => {
    if (!selectedFacultyId) return;

    const isOk = confirm("Are you sure you want to delete this faculty?");
    if (!isOk) return;

    const isConfirmed = prompt(
      `Please note all the data related to this faculty will be lost permanently. Type "DELETE" to confirm deletion of this faculty. `,
    );

    if (!isConfirmed || isConfirmed !== "DELETE") {
      alert("Faculty deletion cancelled.");
      return;
    }

    try {
      await fetchFn(`/admin/${id}/faculties/${selectedFacultyId}`, "DELETE");

      const updatedList = facultyList.filter(
        (faculty) => faculty._id !== selectedFacultyId,
      );
      setFacultyList(updatedList);

      // Update the cache so the deleted faculty doesn't reappear if they switch tabs
      const cacheKey = `${id}-${selectedDepartment}`;
      facultyCache[cacheKey] = updatedList;

      setSelectedFacultyId(updatedList[0]._id);
    } catch (error) {
      console.error("Error deleting faculty:", error);
    }
  };

  //Caching faculty list
  useEffect(() => {
    const cacheKey = `${id}-${selectedDepartment}`;

    // 3. Check if we already fetched this data
    if (facultyCache[cacheKey]) {
      const cachedData = facultyCache[cacheKey];
      setFacultyList(cachedData);
      let facultyId = localStorage.getItem(`selectedFaculty-${id}`);
      if (facultyId) {
        setSelectedFacultyId(facultyId);
      } else {
        setSelectedFacultyId(cachedData[0]._id);
        localStorage.setItem(`selectedFaculty-${id}`, cachedData[0]._id);
      }
      console.log("Returned from cache");
      return;
    }

    withLoader(async () => {
      console.log("Fetching facultylist...");

      const data = await fetchFn(`/admin/${id}/${selectedDepartment}`, "GET");
      const fetchedFaculties = data.allFaculties || [];
      // Store the data inside the global cache object
      facultyCache[cacheKey] = fetchedFaculties;
      setFacultyList(fetchedFaculties);

      let facultyId = localStorage.getItem(`selectedFaculty-${id}`);
      console.log("FacultyId from localStrg: ", facultyId);
      if (facultyId) {
        setSelectedFacultyId(facultyId);
      } else {
        setSelectedFacultyId(fetchedFaculties[0]._id);
        localStorage.setItem(`selectedFaculty-${id}`, fetchedFaculties[0]._id);
      }
      if (!data.admin.isPasswordSet) {
        navigate(`/change-password/${id}`);
      }
    }, setLoading);
  }, [id, selectedDepartment, navigate]);

  const handleOnFacultyClick = (facultyId) => {
    setSelectedFacultyId(facultyId);
    localStorage.setItem(`selectedFaculty-${id}`, facultyId);
  };

  return (
    <>
      {/* MAIN WRAPPER */}
      <div className="flex flex-col h-[96vh]  md:flex-row gap-4 p-8 pb-1 mb-0  pt-8 lg:pt-8 md:pt-8 min-h-[calc(100vh-80px)]">
        {/* RIGHT PANEL ON MOBILE / RIGHT ON DESKTOP — FACULTY LIST */}
        <div className="w-full md:w-[300px] bg-gray-50 rounded-xl shadow p-4 md:order-2 flex flex-col">
          {/* TOP — Fixed */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-800">Faculties</h3>

            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full mb-4 p-2 border rounded-md"
            >
              <option value="CS">Computer Science</option>
              <option value="CE">Civil Engineering</option>
              <option value="EE">Electrical Engineering</option>
              <option value="ME">Mechanical Engineering</option>
              <option value="EC">Electronics & Telecommunication</option>
            </select>
          </div>

          {/* MIDDLE — SCROLLABLE LIST */}
          {loading ? (
            <div className="flex-1 flex md:flex-col gap-2 overflow-y-auto scrollbar-hide pr-1">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : (
            <ul className="flex-1 flex md:flex-col gap-2 overflow-y-auto scrollbar-hide pr-1">
              {facultyList.map((faculty) => (
                <li
                  key={faculty._id}
                  onClick={() => handleOnFacultyClick(faculty._id)}
                  className={` min-w-[220px] md:min-w-0 p-3 border rounded-lg cursor-pointer transition ${
                    selectedFacultyId === faculty._id
                      ? "bg-gray-100 border-amber-500"
                      : "bg-white hover:border-red-300 hover:border-2"
                  }`}
                >
                  <p className="font-medium text-basic_color">{faculty.name}</p>
                  <p className="text-xs text-gray-500">{faculty.department}</p>
                </li>
              ))}
            </ul>
          )}

          {/* BOTTOM — Fixed (Desktop only) */}
          <div className="hidden md:flex justify-end pt-3">
            <button className="basic_button" onClick={handleDeleteFaculty}>
              Delete Selected Faculty
            </button>
          </div>
        </div>

        {/* CENTER PANEL — FACULTY DASHBOARD */}
        <div className="flex-1  bg-white rounded-xl shadow overflow-automd:order-1scrollbar-hide ">
          {selectedFacultyId ? (
            <FacultyDashFromAdmin adminId={id} facultyId={selectedFacultyId} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Select a faculty to view dashboard
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
