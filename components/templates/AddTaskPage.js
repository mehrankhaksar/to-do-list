import React from "react";

import { useRouter } from "next/router";

import { RadioGroup } from "@headlessui/react";

import { toast } from "react-toastify";

const allStatus = [
  {
    status: "toDo",
    textColor: "text-orange-500",
    bgColor: "bg-orange-500",
    borderColor: "border-orange-500",
  },
  {
    status: "inProgress",
    textColor: "text-emerald-500",
    bgColor: "bg-emerald-500",
    borderColor: "border-emerald-500",
  },
  {
    status: "review",
    textColor: "text-blue-500",
    bgColor: "bg-blue-500",
    borderColor: "border-blue-500",
  },
  {
    status: "done",
    textColor: "text-cyan-500",
    bgColor: "bg-cyan-500",
    borderColor: "border-cyan-500",
  },
];

function AddTaskPage() {
  const [inputs, setInputs] = React.useState({
    title: "",
    text: "",
  });
  const [status, setStatus] = React.useState(allStatus[0].status);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputs({ ...inputs, [name]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/tasks-list", {
      method: "POST",
      body: JSON.stringify({ ...inputs, status }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (data.status === "success") {
      toast.success(data.message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push("/");
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
    <section className="w-full h-full">
      <div className="max-w-xl w-full space-y-5 bg-white mx-auto p-5 rounded-md shadow-md">
        <h3 className="text-xl font-semibold">Add New To-Do</h3>
        <form
          className="space-y-5"
          autoComplete="off"
          noValidate
          onSubmit={handleAdd}
        >
          <div className="form-input-field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              value={inputs.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-input-field">
            <label htmlFor="text">Description</label>
            <textarea
              id="text"
              name="text"
              rows="3"
              maxLength="85"
              value={inputs.text}
              onChange={handleChange}
            ></textarea>
          </div>
          <RadioGroup
            className="w-full grid gap-2.5 sm:grid-cols-2 md:grid-cols-4"
            value={status}
            onChange={setStatus}
          >
            {allStatus.map((item, index) => (
              <RadioGroup.Option
                className="cursor-pointer"
                value={item.status}
                key={index}
              >
                {({ active, checked }) => (
                  <div
                    className={`text-sm font-semibold text-center py-1 rounded-md ${
                      active || checked
                        ? `text-white ${item.bgColor} border-2 border-solid border-transparent`
                        : `${item.textColor} border-2 border-solid ${item.borderColor}`
                    } sm:text-base`}
                  >
                    {item.status}
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </RadioGroup>
          <button
            className="w-full font-semibold text-white bg-green-500 py-1.5 rounded-md"
            type="submit"
          >
            ADD
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddTaskPage;
