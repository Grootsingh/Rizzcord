"use client";
import React from "react";
import { GroupMessageIcon, InboxIcon, HelpIcon } from "@/Icons";
import ToolTip from "@/components/ToolTip";
import { AnimatePresence } from "framer-motion";
import InboxPopUp from "../../InboxPopUp";
import DMDialogPopUp from "@/components/DMDialogPopUp";
import usePosition from "@/Hooks/usePosition";

export default function HeaderButtonRight() {
  const [isInboxOpen, setInboxOpen] = React.useState(false);
  const [isDMDialogOpen, setDMDialogOpen] = React.useState(false);
  const GMRef = React.useRef();
  const [top, left] = usePosition(GMRef, isDMDialogOpen);
  function closeInBoxFn() {
    setInboxOpen(false);
  }
  function closeDMDialogFn() {
    setDMDialogOpen(false);
  }
  const positionDMDialog = {
    top: `calc(${top}px + 50px)`,
    left: `calc(${left}px - 430px)`,
  };

  const clipPathAnimate = React.useMemo(
    () => ({
      clipPathOrigin: "circle(3.9% at 96% 5%)",
      clipPathEnter: "circle(200% at 100% 0)",
      clipPathExit: "circle(0.0% at 100% 0)",
    }),
    []
  );
  return (
    <>
      <div
        className={`${
          !isInboxOpen ? "z-10" : ""
        } flex sticky  items-center h-12  right-0 pr-4 pl-2 gap-4 header-boxShadow py-2 border-b-[1px] border-theme-DarkGray-900 bg-theme-Driftwood-grey-light text-theme-SteelGray-light`}
      >
        <div className="gap-4 xsm:hidden mdx:flex">
          <div ref={GMRef}>
            <ToolTip direction={"Down"} text={"New Group DM"}>
              <GroupMessageIcon
                onClick={() => setDMDialogOpen((curr) => !curr)}
                className="h-6 w-6 hover:text-theme-LightGray-300"
              />
            </ToolTip>
          </div>
          <div className="w-[1px] h-6  bg-theme-Graphite-700" />
        </div>
        <ToolTip direction={"Down"} text={"Inbox"}>
          <InboxIcon
            onClick={() => setInboxOpen((curr) => !curr)}
            className="h-6 w-6 hover:text-theme-LightGray-300"
          />
        </ToolTip>
        <ToolTip direction={"Down"} text={"Help"}>
          <HelpIcon className="h-6 w-6 hover:text-theme-LightGray-300" />
        </ToolTip>
      </div>
      <AnimatePresence>
        {isInboxOpen ? (
          <InboxPopUp isInboxOpen={isInboxOpen} closeInBoxFn={closeInBoxFn} />
        ) : undefined}
      </AnimatePresence>
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
