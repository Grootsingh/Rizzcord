import React from "react";
import UserPanel from "./UserPanel";
import DirectMessage from "./DirectMessage";
import DiscordUserProfile from "./DiscordUserProfile";
import SecondarySearchBox from "./SecondarySearchBox";

function UserSecondaryNav() {
  return (
    <div className="w-60 shrink-0 bg-theme-CharcoalGray-800 ">
      <SecondarySearchBox />
      <div className="h-1" />
      <div className=" scrollbar-small outline-none h-[calc(100%-52px-3rem+-4px)] overflow-hidden hover:overflow-y-scroll py-2 hover:pr-[2px] pl-2 pr-[12px] rounded flex flex-col gap-[2px]">
        <UserPanel />
        <DirectMessage />
      </div>
      <DiscordUserProfile />
    </div>
  );
}

export default UserSecondaryNav;
