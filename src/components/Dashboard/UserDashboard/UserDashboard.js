import React from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardMain from "./DashboardMain";
import DashboardAside from "./DashboardAside";

function UserDashboard() {
  return (
    <div className="flex flex-col grow min-w-0">
      <DashboardHeader />
      <div className="flex grow bg-theme-Driftwood-grey-light">
        <div className="grow min-w-0">
          <DashboardMain />
        </div>
        <DashboardAside />
      </div>
    </div>
  );
}

export default UserDashboard;
