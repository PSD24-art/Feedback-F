import React, { useState } from "react";

const Institution_form = () => {
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
    console.log(formData);
    // Call your API here
  };

  return (
    <div className="mt-16 w-full flex justify-center py-10 px-4 bg-amber-50 min-h-screen">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-8 border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center ">
          Institution Access Request
        </h2>
        <p className="text-gray-500 text-center mb-8 border-b-2 pb-3  border-red-500">
          Fill in the required details below. Our team will contact your
          institution for verification and approval.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Institution Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Institution Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 font-medium mb-1">
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
                <label className="block text-gray-600 font-medium mb-1">
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
                <label className="block text-gray-600 font-medium mb-1">
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
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 font-medium mb-1">
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
                <label className="block text-gray-600 font-medium mb-1">
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
              <label className="block text-gray-600 font-medium mb-1">
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
          </div>

          {/* Contact Person */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Institutional Representative
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              This person will act as the official representative for
              communication and admin access approval.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 font-medium mb-1">
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
                <label className="block text-gray-600 font-medium mb-1">
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
              <label className="block text-gray-600 font-medium mb-1">
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
          </div>

          {/* Submit */}
          <div className="pt-4 flex justify-center">
            <button type="submit" className="basic_button">
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Institution_form;
