import React from "react";

import { BiTrash } from "react-icons/bi";

function Task({ taskData, backBtn, nextBtn, fetchTasksList }) {
  const handleStatus = async (id, status) => {
    const res = await fetch("/api/tasks-list", {
      method: "PATCH",
      body: JSON.stringify({ id, status }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (data.status === "success") {
      fetchTasksList();
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/tasks-list/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (data.status === "success") {
      fetchTasksList();
    }
  };

  return (
    <div className="w-full bg-white p-2.5 rounded shadow-md">
      <div className="flex flex-col space-y-2.5 relative">
        <button
          className="absolute -top-3 -right-3 text-white bg-red-500 p-1.5 rounded-full cursor-pointer transition-colors hover:bg-red-600"
          type="button"
          onClick={() => handleDelete(taskData._id)}
        >
          <BiTrash />
        </button>
        <h5 className="text-lg font-semibold break-all">{taskData.title}</h5>
        <p className="text-sm font-medium text-justify break-all">
          {taskData.text}
        </p>
        {backBtn && nextBtn ? (
          <div className="w-full flex justify-between items-center">
            <button
              className="text-sm font-medium text-white bg-red-500 py-0.5 px-2 rounded-sm"
              type="button"
              onClick={() => handleStatus(taskData._id, backBtn)}
            >
              Back
            </button>
            <button
              className="text-sm font-medium text-white bg-green-500 py-0.5 px-2 rounded-sm"
              type="button"
              onClick={() => handleStatus(taskData._id, nextBtn)}
            >
              Next
            </button>
          </div>
        ) : (
          <button
            className={`${
              taskData.status === "toDo"
                ? "self-end bg-green-500"
                : "self-start bg-red-500"
            } text-sm font-medium text-white py-0.5 px-2 rounded-sm`}
            type="button"
            onClick={() =>
              handleStatus(
                taskData._id,
                taskData.status === "toDo" ? nextBtn : backBtn
              )
            }
          >
            {taskData.status === "toDo" ? "Next" : "Back"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Task;
