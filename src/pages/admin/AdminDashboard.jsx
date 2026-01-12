import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import withLoader from "../../utils/withLoader";
import Loader from "../../components/utilityComponents/Loader";
import fetchFn from "../../utils/fetchFn";
import FacultyDashFromAdmin from "./FacultyDashFromAdmin";

const AdminDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDepartment, setSelectedDepartment] = useState("CS");
  const [facultyList, setFacultyList] = useState([]);
  const [selectedFacultyId, setSelectedFacultyId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDeleteFaculty = async () => {
    if (!selectedFacultyId) return;

    const isOk = confirm("Are you sure you want to delete this faculty?");
    if (!isOk) return;

    const isConfirmed = prompt(
      `Please note all the data related to this faculty will be lost permanently. Type "DELETE" to confirm deletion of this faculty. `
    );

    if (!isConfirmed || isConfirmed !== "DELETE") {
      alert("Faculty deletion cancelled.");
      return;
    }

    try {
      await fetchFn(`/admin/${id}/faculties/${selectedFacultyId}`, "DELETE");
      setFacultyList(
        facultyList.filter((faculty) => faculty._id !== selectedFacultyId)
      );
      setSelectedFacultyId(null);
    } catch (error) {
      console.error("Error deleting faculty:", error);
    }
  };

  useEffect(() => {
    withLoader(async () => {
      const data = await fetchFn(`/admin/${id}/${selectedDepartment}`, "GET");

      setFacultyList(data.allFaculties || []);

      if (data.allFaculties?.length > 0) {
        setSelectedFacultyId(data.allFaculties[0]._id);
      }

      if (!data.admin.isPasswordSet) {
        navigate(`/change-password/${id}`);
      }
    }, setLoading);
  }, [id, selectedDepartment]);

  return (
    <>
      {loading && <Loader />}

      {/* MAIN WRAPPER */}
      <div className="flex flex-col h-[96vh]  md:flex-row gap-4 p-8 pb-1 mb-0  pt-8 lg:pt-8 md:pt-8 min-h-[calc(100vh-80px)]">
        {/* RIGHT PANEL ON MOBILE / RIGHT ON DESKTOP — FACULTY LIST */}
        <div
          className="
    w-full 
    md:w-[300px] 
    bg-gray-50 
    rounded-xl 
    shadow 
    p-4
    md:order-2
    flex flex-col
  "
        >
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
          <ul
            className="
      flex-1
      flex md:flex-col gap-2
      overflow-y-auto
      scrollbar-hide
      pr-1
    "
          >
            {facultyList.map((faculty) => (
              <li
                key={faculty._id}
                onClick={() => setSelectedFacultyId(faculty._id)}
                className={`
          min-w-[220px] md:min-w-0
          p-3 border rounded-lg cursor-pointer transition
          ${
            selectedFacultyId === faculty._id
              ? "bg-red-100 border-red-400"
              : "bg-white hover:border-red-300"
          }
        `}
              >
                <p className="font-medium text-basic_color">{faculty.name}</p>
                <p className="text-xs text-gray-500">{faculty.department}</p>
              </li>
            ))}
          </ul>

          {/* BOTTOM — Fixed (Desktop only) */}
          <div className="hidden md:flex justify-end pt-3">
            <button className="basic_button" onClick={handleDeleteFaculty}>
              Delete Selected Faculty
            </button>
          </div>
        </div>

        {/* CENTER PANEL — FACULTY DASHBOARD */}
        <div
          className="
            flex-1 
            bg-white 
            rounded-xl 
            shadow 
            overflow-auto
            md:order-1
            scrollbar-hide
          "
        >
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
