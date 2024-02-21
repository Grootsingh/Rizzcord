"use client";
import React from "react";
import SecondarySearchBoxPopUp from "./SecondarySearchBoxPopUp";

function SecondarySearchBox() {
  const [isOpen, setOpen] = React.useState(false);

  function isCloseFn() {
    setOpen(false);
  }

  return (
    <div className="h-12 w-full flex items-center border-b-[1px]  border-theme-DarkGray-900 px-[10px]">
      <div
        onClick={() => setOpen(true)}
        className="bg-theme-DarkGray-900 flex items-center outline-none rounded text-theme-SteelGray-500 py-[1px] w-full text-sm h-7  px-[6px]"
      >
        <p>Find or start a conversation</p>
      </div>
      <SecondarySearchBoxPopUp isOpen={isOpen} isCloseFn={isCloseFn} />
    </div>
  );
}

export default SecondarySearchBox;
