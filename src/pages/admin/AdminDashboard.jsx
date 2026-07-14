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
      <div className="flex h-full min-h-0 flex-col gap-5 p-3 sm:p-5 md:flex-row">
        {/* RIGHT PANEL ON MOBILE / RIGHT ON DESKTOP — FACULTY LIST */}
        <div className="panel-card flex w-full flex-col p-4 md:order-2 md:h-full md:min-h-0 md:w-[300px]">
          {/* TOP — Fixed */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-600">Faculty directory</p>
            <h3 className="mb-3 mt-1 font-extrabold text-slate-800">Faculties</h3>

            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="basic_dropdown mb-4 w-full"
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
            <div className="flex flex-1 gap-2 overflow-y-auto pr-1 scrollbar-hide md:min-h-0 md:flex-col">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : (
            <ul className="flex flex-1 gap-2 overflow-y-auto pr-1 scrollbar-hide md:min-h-0 md:flex-col">
              {facultyList.map((faculty) => (
                <li
                  key={faculty._id}
                  onClick={() => handleOnFacultyClick(faculty._id)}
                  className={` min-w-[220px] md:min-w-0 p-3 border rounded-lg cursor-pointer transition ${
                    selectedFacultyId === faculty._id
                      ? "border-rose-200 bg-rose-50"
                      : "border-slate-200 bg-white hover:border-rose-200 hover:bg-slate-50"
                  }`}
                >
                  <p className="font-semibold text-slate-800">{faculty.name}</p>
                  <p className="mt-1 text-xs text-slate-500">{faculty.department}</p>
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
        <div className="panel-card min-w-0 flex-1 overflow-hidden md:order-1 md:min-h-0">
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
