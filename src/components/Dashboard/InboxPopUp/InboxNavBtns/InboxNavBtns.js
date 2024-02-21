"use client";
import React from "react";
import NavButton from "./NavBtn";
import ToolTip from "@/components/ToolTip";
import { AnimatePresence } from "framer-motion";
import { DoubleTickIcon, FilterIcon } from "@/Icons";
import MarkAllAsReadPopUp from "./MarkAllAsReadPopUp";
import FilterPopUp from "./FilterPopUp";

function InboxNavBtns({ isActive, updateActive, TrueIsShowUnRead }) {
  const [isMarkAsReadAll, setIsMarkAsReadAll] = React.useState(false);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const filterRef = React.useRef();

  function FalseMarkAsReadAll() {
    setIsMarkAsReadAll(false);
  }

  function filterCloseFn() {
    setIsFilterOpen(false);
  }

  return (
    <>
      <div className="flex items-center gap-2 h-8 mt-2">
        <NavButton isActive={isActive} updateActive={updateActive} />
        {isActive === "Unreads" ? (
          <div className="ml-auto">
            <ToolTip direction={"Up"} text={"Mark All as Read"}>
              <button
                onClick={() => setIsMarkAsReadAll(true)}
                className="group h-8 w-8  rounded-full bg-theme-CharcoalGray-800 grid place-content-center"
              >
                <DoubleTickIcon className="text-theme-SteelGray-light group-hover:text-white h-4 w-4" />
              </button>
            </ToolTip>
            <AnimatePresence>
              {isMarkAsReadAll ? (
                <MarkAllAsReadPopUp
                  FalseMarkAsReadAll={FalseMarkAsReadAll}
                  TrueIsShowUnRead={TrueIsShowUnRead}
                />
              ) : undefined}
            </AnimatePresence>
          </div>
        ) : undefined}
        {isActive === "Mentions" ? (
          <div className="ml-auto">
            <ToolTip direction={"Up"} text={"Filter"}>
              <button
                ref={filterRef}
                onClick={() => setIsFilterOpen((curr) => !curr)}
                className="group h-8 w-8  rounded-full bg-theme-CharcoalGray-800 grid place-content-center"
              >
                <FilterIcon className="text-theme-SteelGray-light group-hover:text-white h-4 w-4" />
              </button>
            </ToolTip>
            <AnimatePresence>
              {isFilterOpen ? (
                <FilterPopUp
                  filterRef={filterRef}
                  isFilterOpen={isFilterOpen}
                  filterCloseFn={filterCloseFn}
                />
              ) : undefined}
            </AnimatePresence>
          </div>
        ) : undefined}
      </div>
    </>
  );
}

export default InboxNavBtns;
