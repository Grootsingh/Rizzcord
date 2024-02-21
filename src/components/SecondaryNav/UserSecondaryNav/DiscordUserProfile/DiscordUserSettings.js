"use client";
import {
  MuteIcon,
  UnMuteIcon,
  DeafenIcon,
  UnDeafenIcon,
  SettingIcon,
} from "@/Icons";
import React from "react";
import ToolTip from "@/components/ToolTip";

export default function DiscordUserSettings() {
  return (
    <>
      <div className="flex z-10">
        <Mute />
        <Deafen />
        <Setting />
      </div>
    </>
  );
}

function Mute() {
  const [isMute, setisMute] = React.useState(true);

  return (
    <>
      <div className="relative text-theme-SteelGray-500">
        <ToolTip direction={"Up"} text={isMute ? "Mute" : "Unmute"}>
          <div
            onClick={() => setisMute((curr) => !curr)}
            className="h-8 w-8 hover:bg-theme-Driftwood-grey grid place-content-center"
          >
            {isMute ? (
              <MuteIcon className="h-[20px] w-[20px]" />
            ) : (
              <UnMuteIcon className="h-[20px] w-[20px]" />
            )}
          </div>
        </ToolTip>
      </div>
    </>
  );
}

function Deafen() {
  const [isDeafen, setisDeafen] = React.useState(true);

  return (
    <>
      <div className="relative text-theme-SteelGray-500">
        <ToolTip direction={"Up"} text={isDeafen ? "Deafen" : "Undeafen"}>
          <div
            onClick={() => setisDeafen((curr) => !curr)}
            className="h-8 w-8 hover:bg-theme-Driftwood-grey grid place-content-center"
          >
            {isDeafen ? (
              <DeafenIcon className="h-[20px] w-[20px]" />
            ) : (
              <UnDeafenIcon className="h-[20px] w-[20px]" />
            )}
          </div>
        </ToolTip>
      </div>
    </>
  );
}

function Setting() {
  return (
    <>
      <div className="relative text-theme-SteelGray-500">
        <ToolTip direction={"Up"} text={"User Settings"}>
          <div className="h-8 w-8 hover:bg-theme-Driftwood-grey grid place-content-center">
            <SettingIcon className="h-[20px] w-[20px]" />
          </div>
        </ToolTip>
      </div>
    </>
  );
}
