"use client";
import React from "react";
import MorePopUp from "./MorePopUp";
import usePosition from "@/Hooks/usePosition";
import ToolTip from "@/components/ToolTip";
import { TrippledotIcon } from "@/Icons";
import { AnimatePresence } from "framer-motion";
function MoreBtn({ DeleteUser, username, isMouseOver }) {
  const [isMoreClicked, setMoreClicked] = React.useState(false);
  const MoreBtnRef = React.useRef();
  const position = usePosition(MoreBtnRef, isMoreClicked);
  function MoreIsFalse() {
    setMoreClicked(false);
  }
  React.useEffect(() => {
    if (isMouseOver !== username) {
      MoreIsFalse();
    }
  }, [isMouseOver, username]);
  return (
    <>
      <ToolTip text={"More"} direction={"Up"}>
        <div
          id="More"
          ref={MoreBtnRef}
          onClick={(event) => {
            event.stopPropagation();
            setMoreClicked((curr) => !curr);
          }}
          className={`${
            isMoreClicked ? "text-theme-LightGray-300" : ""
          } h-8 w-8 hover:text-theme-LightGray-300 group-hover:bg-theme-DarkGray-900 grid place-content-center rounded-full bg-theme-CharcoalGray-800`}
        >
          <TrippledotIcon className={` h-5 w-5 `} />
        </div>
      </ToolTip>
      <AnimatePresence>
        {isMoreClicked && MoreBtnRef.current ? (
          <MorePopUp
            position={position}
            username={username}
            DeleteUser={DeleteUser}
          />
        ) : undefined}
      </AnimatePresence>
    </>
  );
}

export default MoreBtn;
