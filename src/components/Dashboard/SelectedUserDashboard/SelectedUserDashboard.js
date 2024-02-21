import React from "react";
import SelectedUserHeader from "./SelectedUserHeader";
import SelectedUserMain from "./SelectedUserMain";
import SelectedUserAside from "./SelectedUserAside";
function SelectedUserDashboard() {
  return (
    <div className="flex flex-col grow min-w-0">
      <SelectedUserHeader />
      <div className="flex grow bg-theme-Driftwood-grey-light">
        <div className="grow relative min-w-0">
          <SelectedUserMain />
        </div>
        <SelectedUserAside />
      </div>
    </div>
  );
}

export default SelectedUserDashboard;
