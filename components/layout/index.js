import React from "react";

import Header from "./Header";
import Aside from "./Aside";

function Layout({ children }) {
  return (
    <div className="w-full h-screen flex flex-col items-center font-Quicksand overflow-hidden">
      <Header />
      <div className="w-full flex-1 flex space-x-2.5 overflow-y-auto xl:max-w-7xl xl:p-5">
        <Aside />
        <main className="w-full h-full bg-white p-2.5 rounded-l-3xl shadow-md sm:p-5 xl:rounded-3xl">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
