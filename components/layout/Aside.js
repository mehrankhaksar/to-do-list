import React from "react";

import Link from "next/link";

import { BiListCheck, BiSolidAddToQueue, BiUserCircle } from "react-icons/bi";

function Aside() {
  return (
    <aside className="w-fit h-full bg-white p-0.5 rounded-r-3xl shadow-md z-50 sm:p-5 xl:rounded-3xl">
      <div className="w-full h-full flex flex-col items-center space-y-5 whitespace-nowrap">
        <h3 className="hidden sm:inline-block sm:text-xl sm:font-bold">
          Welcome 👋
        </h3>
        <ul className="w-full h-full space-y-2.5">
          <Link className="block" href="/">
            <li className="aside-link">
              <BiListCheck size={25} />
              <span>To-Do List</span>
            </li>
          </Link>
          <Link className="block" href="/add-task">
            <li className="aside-link">
              <BiSolidAddToQueue size={25} />
              <span>Add To-Do</span>
            </li>
          </Link>
          <Link className="block" href="/profile">
            <li className="aside-link">
              <BiUserCircle size={25} />
              <span>Profile</span>
            </li>
          </Link>
        </ul>
      </div>
    </aside>
  );
}

export default Aside;
