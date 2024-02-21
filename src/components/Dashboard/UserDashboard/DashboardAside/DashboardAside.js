import React from "react";
import PrimaryCard from "./PrimaryCard";
import SecondaryCard from "./SecondaryCard";

function DashboardAside() {
  return (
    <div className="w-[22.25rem] xsm:hidden xl:block shrink-0  border-l border-theme-Smoke-700 p-4">
      <p className="font-bold text-xl mt-1 mb-4 text-theme-Slate-400">
        Active Now
      </p>
      <PrimaryCard />
      <SecondaryCard />
    </div>
  );
}

export default DashboardAside;
