"use client";
import React from "react";
import ToolTip from "@/components/ToolTip";
import { PlusIcon } from "@/Icons";
import UsersList from "./UsersList";
import usePosition from "@/Hooks/usePosition";
import { AnimatePresence } from "framer-motion";
import DMDialogPopUp from "@/components/DMDialogPopUp";

function DirectMessage() {
  const [isDMDialogOpen, setDMDialogOpen] = React.useState(false);
  const GMRef = React.useRef();
  const [top, left] = usePosition(GMRef, isDMDialogOpen);

  function closeDMDialogFn() {
    setDMDialogOpen(false);
  }

  const positionDMDialog = {
    bottom: `calc(${top}px - 192px)`,
    left: `calc(${left}px + 25px)`,
  };

  const clipPathAnimate = React.useMemo(
    () => ({
      clipPathOrigin: "circle(0.5% at 0 0)",
      clipPathEnter: "circle(200% at 0 0)",
      clipPathExit: "circle(0.5% at 0 0)",
    }),
    []
  );

  return (
    <>
      <div className="flex z-[2]  text-theme-SteelGray-500  min-h-9 pl-[0.55rem] pr-3 font-semibold items-end justify-between">
        <span className="text-xs hover:text-theme-LightGray-400">
          DIRECT MESSAGES
        </span>
        <div ref={GMRef} onClick={() => setDMDialogOpen((curr) => !curr)}>
          <ToolTip direction={"Up"} text={"Create DM"}>
            <PlusIcon className="w-4 h-4" />
          </ToolTip>
        </div>
      </div>
      <div className="h-1" />
      <UsersList />

      <AnimatePresence>
        {isDMDialogOpen && !isNaN(top) ? (
          <DMDialogPopUp
            isDMDialogOpen={isDMDialogOpen}
            closeDMDialogFn={closeDMDialogFn}
            positionDMDialog={positionDMDialog}
            clipPathAnimate={clipPathAnimate}
          />
        ) : undefined}
      </AnimatePresence>
    </>
  );
}

export default DirectMessage;
