import { FriendIcon } from "@/Icons";

import SubHeaderLeft from "./SubHeaderLeft";
import SubHeaderRight from "./SubHeaderRight";

function DashboardHeader() {
  return (
    <div className="h-12 py-2 pl-4  relative flex border-b-[1px] justify-between border-theme-DarkGray-900 items-center text-theme-SteelGray-500 bg-theme-Driftwood-grey-light">
      <div className="flex  shrink-0 gap-4 item-center">
        <div className="flex gap-2 items-center">
          <FriendIcon className="h-6 w-6" />
          <span className="font-semibold text-white">Friends</span>
        </div>
        <div className="w-[1px] h-6  bg-theme-Graphite-700 " />
        <SubHeaderLeft />
      </div>
      <SubHeaderRight />
    </div>
  );
}

export default DashboardHeader;
