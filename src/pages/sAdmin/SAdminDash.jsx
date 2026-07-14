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
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-6">
      <div className="panel-card mb-6 p-5 sm:p-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-600">Platform administration</p>
        <h1 className="mt-1 text-2xl font-extrabold text-slate-800">Super Admin Dashboard</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-gray-500 w-8 h-8" />
        </div>
      ) : requests.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center text-slate-500">
          No access requests received yet.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {requests.map((req) => (
            <div
              key={req._id}
              className="panel-card p-5 transition hover:-translate-y-0.5 hover:border-rose-200"
            >
              <h2 className="text-lg font-bold text-slate-800">
                {req.name}
              </h2>
              {req.code && (
                <p className="mb-3 text-sm text-slate-500">Code: {req.code}</p>
              )}

              <div className="mb-3 space-y-2 text-sm text-slate-600">
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
                      className="text-rose-700 hover:underline"
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
                  className="basic_button mt-0 min-h-0 px-4 py-2"
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
