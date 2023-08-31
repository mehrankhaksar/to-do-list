import React from "react";

import Link from "next/link";

import { BiSolidAddToQueue } from "react-icons/bi";

function AddTaskBtn({ textColor, bgColor }) {
  return (
    <div
      className={`w-full h-full grid justify-items-center content-center gap-2.5 ${textColor}`}
    >
      <BiSolidAddToQueue size={50} />
      <Link href="/add-task">
        <button
          className={`text-sm font-semibold text-white ${bgColor} py-1.5 px-3 rounded-sm`}
          type="button"
        >
          Add Task
        </button>
      </Link>
    </div>
  );
}

export default AddTaskBtn;
