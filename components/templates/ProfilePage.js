import React from "react";

import { useRouter } from "next/router";
import { toast } from "react-toastify";

function ProfilePage({ email, firstName, lastName }) {
  const [edit, setEdit] = React.useState(false);
  const [inputs, setInputs] = React.useState({
    firstName: firstName || "",
    lastName: lastName || "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputs({ ...inputs, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify(inputs),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (data.status === "success") {
      router.reload();
    } else {
      toast.error(data.message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <section>
      <div className="max-w-xl w-full space-y-5 bg-white mx-auto p-5 rounded-md shadow-md">
        <h3 className="text-xl font-semibold">{email}</h3>
        <form
          className="space-y-5"
          autoComplete="off"
          noValidate
          onSubmit={handleSave}
        >
          <div className="form-input-field">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              readOnly={!edit && true}
              value={inputs.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-input-field">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              readOnly={!edit && true}
              value={inputs.lastName}
              onChange={handleChange}
            />
          </div>
          <div
            className={`form-input-field ${edit ? "inline-block" : "hidden"}`}
          >
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              readOnly={!edit && true}
              value={inputs.password}
              onChange={handleChange}
            />
          </div>
          {edit ? (
            <div className="w-full grid gap-2.5 sm:grid-cols-2">
              <button
                className="profile-form-btn bg-green-500 sm:order-2"
                type="submit"
              >
                Save
              </button>
              <button
                className="profile-form-btn bg-red-500 sm:order-1"
                type="button"
                onClick={() => setEdit(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="profile-form-btn w-full bg-blue-500"
              type="button"
              onClick={() => setEdit(true)}
            >
              Edit
            </button>
          )}
        </form>
      </div>
    </section>
  );
}

export default ProfilePage;
