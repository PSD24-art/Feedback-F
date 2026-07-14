import React, { useState } from "react";
import withLoader from "../utils/withLoader";
import fetchFn from "../utils/fetchFn";
import Loader from "../components/utilityComponents/Loader";
const Institution_form = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    contactInfo: {
      email: "",
      phone: "",
      website: "",
    },
    address: "",
    contactPerson: {
      name: "",
      mobile: "",
      email: "",
    },
  });

  const handleChange = (e, path) => {
    const { name, value } = e.target;

    if (path) {
      setFormData((prev) => ({
        ...prev,
        [path]: {
          ...prev[path],
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    withLoader(async () => {
      const data = await fetchFn(
        "/instituteRequest",
        "POST",
        JSON.stringify({ formData }),
      );

      if (data?.success) {
        alert(
          "Institure request sent. Our Representetive will reach out to you soon",
        );
        console.log("Request successful:", data);
        setFormData({
          name: "",
          code: "",
          contactInfo: {
            email: "",
            phone: "",
            website: "",
          },
          address: "",
          contactPerson: {
            name: "",
            mobile: "",
            email: "",
          },
        });
      } else {
        console.log("⚠️ Request failed:", data);
      }
    }, setLoading);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="flex min-h-[calc(100vh-8rem)] w-full justify-center px-4 py-8 sm:px-6">
        <div className="panel-card h-fit w-full max-w-3xl p-5 sm:p-8">
          <div className="mb-8 border-b border-slate-100 pb-5 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-600">
              Feedback Guru workspace
            </p>
            <h2 className="mb-2 mt-1 text-2xl font-extrabold text-slate-800">
              Institution Access Request
            </h2>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-500">
              Fill in the required details below. Our team will contact your
              institution for verification and approval.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Institution Details */}
            <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
              <h3 className="mb-4 text-base font-extrabold text-slate-800">
                Institution Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Institution Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Institution Name"
                    className="basic_input"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Institution Code
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="Enter Institution Code"
                    className="basic_input"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter full address"
                    rows={3}
                    className="basic_input"
                  />
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
              <h3 className="mb-4 text-base font-extrabold text-slate-800">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.contactInfo.email}
                    onChange={(e) => handleChange(e, "contactInfo")}
                    placeholder="Enter contact email"
                    className="basic_input"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Phone
                  </label>
                  <input
                    type="number"
                    name="phone"
                    value={formData.contactInfo.phone}
                    onChange={(e) => handleChange(e, "contactInfo")}
                    placeholder="Enter contact number"
                    className="basic_input"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Website
                </label>
                <input
                  type="text"
                  name="website"
                  value={formData.contactInfo.website}
                  onChange={(e) => handleChange(e, "contactInfo")}
                  placeholder="Enter website URL"
                  className="basic_input"
                />
              </div>
            </section>

            {/* Contact Person */}
            <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
              <h3 className="mb-2 text-base font-extrabold text-slate-800">
                Institutional Representative
              </h3>
              <p className="mb-4 text-sm text-slate-500">
                This person will act as the official representative for
                communication and admin access approval.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.contactPerson.name}
                    onChange={(e) => handleChange(e, "contactPerson")}
                    placeholder="Representative Name"
                    className="basic_input"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Mobile Number
                  </label>
                  <input
                    type="number"
                    name="mobile"
                    value={formData.contactPerson.mobile}
                    onChange={(e) => handleChange(e, "contactPerson")}
                    placeholder="Enter mobile number"
                    className="basic_input"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.contactPerson.email}
                  onChange={(e) => handleChange(e, "contactPerson")}
                  placeholder="Representative Email"
                  className="basic_input"
                />
              </div>
            </section>

            {/* Submit */}
            <div className="flex justify-end border-t border-slate-100 pt-5">
              <button
                type="submit"
                className="basic_button mt-0 w-full sm:w-auto"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Institution_form;
