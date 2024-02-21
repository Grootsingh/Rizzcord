import React from "react";
import SubHeaderLeft from "./SubHeaderLeft";
import SubHeaderRight from "./SubHeaderRight";
function SelectedUserHeader() {
  return (
    <div className="h-12 py-2 pl-4  relative flex border-b-[1px] justify-between border-theme-DarkGray-900 items-center text-theme-SteelGray-500 bg-theme-Driftwood-grey-light">
      <SubHeaderLeft />
      <SubHeaderRight />
    </div>
  );
}

export default SelectedUserHeader;
