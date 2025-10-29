import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchFn from "../../utils/fetchFn";
import withLoader from "../../utils/withLoader";
import { Loader2, Mail, Phone, Globe, MapPin } from "lucide-react";

export default function SAdminDash() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    withLoader(async () => {
      const data = await fetchFn(`/superAdmin/${id}`, "GET");
      if (data?.allRequests) setRequests(data.allRequests);
      if (!data.superAdmin.isPasswordSet) {
        navigate(`/change-password/${id}`);
      }
    }, setLoading);
  }, [id]);

  return (
    <div className="mt-16 min-h-screen bg-gray-50 px-6 md:px-10 py-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Super Admin Dashboard
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-gray-500 w-8 h-8" />
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center text-gray-500 mt-16">
          No access requests received yet.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white shadow-md hover:shadow-lg transition rounded-2xl p-5 border border-gray-100"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {req.name}
              </h2>
              {req.code && (
                <p className="text-sm text-gray-500 mb-3">Code: {req.code}</p>
              )}

              <div className="text-sm text-gray-600 space-y-2 mb-3">
                {req.contactInfo?.email && (
                  <p className="flex items-center gap-2">
                    <Mail size={16} className="text-gray-400" />
                    {req.contactInfo.email}
                  </p>
                )}
                {req.contactInfo?.phone && (
                  <p className="flex items-center gap-2">
                    <Phone size={16} className="text-gray-400" />
                    {req.contactInfo.phone}
                  </p>
                )}
                {req.contactInfo?.website && (
                  <p className="flex items-center gap-2">
                    <Globe size={16} className="text-gray-400" />
                    <a
                      href={req.contactInfo.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {req.contactInfo.website}
                    </a>
                  </p>
                )}
                {req.address && (
                  <p className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    {req.address}
                  </p>
                )}
              </div>

              {req.contactPerson && (
                <div className="border-t border-gray-100 pt-3 mt-3">
                  <p className="text-sm font-medium text-gray-800">
                    Contact Person
                  </p>
                  <p className="text-sm text-gray-600">
                    {req.contactPerson.name} — {req.contactPerson.mobile}
                  </p>
                  <p className="text-sm text-gray-500">
                    {req.contactPerson.email}
                  </p>
                </div>
              )}

              <div className="mt-4 flex justify-end">
                <button
                  className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => handleApprove(req._id)}
                >
                  Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
// Approve Request (optional functionality placeholder)
//   async function handleApprove(id) {
//     withLoader(async () => {
//       const data = await fetchFn(`/approveRequest/${id}`, "POST");
//       if (data?.success) {
//         setRequests((prev) => prev.filter((r) => r._id !== id));
//         alert("Request approved successfully!");
//       }
//     }, setLoading);
//   }
