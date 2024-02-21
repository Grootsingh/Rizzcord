"use client";
import React from "react";
import {
  InboxIcon,
  HelpIcon,
  ShowUserProfileIcon,
  AddFriendToDMIcon,
  PinIcon,
  VideoCallIcon,
  VoiceCallIcon,
} from "@/Icons";
import IconButton from "./IconButton";
import SearchBox from "../SearchBox";
import { AnimatePresence } from "framer-motion";
import InboxPopUp from "@/components/Dashboard/InboxPopUp";
import DMDialogPopUp from "@/components/DMDialogPopUp";
import usePosition from "@/Hooks/usePosition";
import PinPopUp from "./PinPopUp";

export default function SubHeaderRight() {
  const [isInboxOpen, setInboxOpen] = React.useState(false);
  const [isDMDialogOpen, setDMDialogOpen] = React.useState(false);
  const [isPinOpen, setPinOpen] = React.useState(false);
  const GMRef = React.useRef();
  const [top, left] = usePosition(GMRef, isDMDialogOpen);
  function closeInBoxFn() {
    setInboxOpen(false);
  }
  function FlipInBoxFn() {
    setInboxOpen((curr) => !curr);
  }
  function closeDMDialogFn() {
    setDMDialogOpen(false);
  }
  function closePinFn() {
    setPinOpen(false);
  }
  const positionDMDialog = {
    top: `calc(${top}px + 50px)`,
    left: `calc(${left}px - 430px)`,
  };

  const clipPathAnimate = React.useMemo(
    () => ({
      clipPathOrigin: "circle(0.0% at 100% 0%)",
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
        } flex sticky items-center h-12  right-0 pr-4 pl-2 gap-4 header-boxShadow py-2 border-b-[1px] border-theme-DarkGray-900 bg-theme-Driftwood-grey-light text-theme-SteelGray-light`}
      >
        <IconButton icon={VoiceCallIcon} text={"Start Voice Call"} />
        <IconButton icon={VideoCallIcon} text={"Start Video Call"} />
        <div onClick={() => setPinOpen((curr) => !curr)}>
          <IconButton
            icon={PinIcon}
            isPinOpen={isPinOpen}
            text={"Pinned Messages"}
          />
        </div>
        <div ref={GMRef} onClick={() => setDMDialogOpen((curr) => !curr)}>
          <IconButton
            isDMDialogOpen={isDMDialogOpen}
            icon={AddFriendToDMIcon}
            text={"Add Friends to DM"}
          />
        </div>
        <IconButton icon={ShowUserProfileIcon} text={"Show User Profile"} />
        <SearchBox />
        <IconButton
          icon={InboxIcon}
          text={"Inbox"}
          FlipInBoxFn={FlipInBoxFn}
          isInboxOpen={isInboxOpen}
        />
        <IconButton icon={HelpIcon} text={"Help"} />
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
      <AnimatePresence>
        {isPinOpen ? (
          <PinPopUp closePinFn={closePinFn} isPinOpen={isPinOpen} />
        ) : undefined}
      </AnimatePresence>
    </>
  );
}
