"use client";
import React from "react";
import { Dialog } from "@headlessui/react";
import FilterOption from "./FilterOption";
import usePosition from "@/Hooks/usePosition";
import { motion } from "framer-motion";

function FilterPopUp({ filterRef, isFilterOpen, filterCloseFn }) {
  const [top, left] = usePosition(filterRef, isFilterOpen);

  return (
    <>
      <Dialog
        static={true}
        as={motion.div}
        key="FilterPopUp"
        className={"fixed "}
        initial={{
          clipPath: "circle(3.9% at 96% 5%)",
        }}
        animate={{
          clipPath: "circle(150% at 100% 0)",
          transition: { type: "tween", ease: "circOut" },
        }}
        exit={{
          clipPath: "circle(0.0% at 100% 0)",
          transition: { type: "tween", ease: "circIn" },
        }}
        style={{
          top: `${top + 48}px`,
          left: `${left - 218}px`,
        }}
        open={isFilterOpen}
        onClose={() => filterCloseFn()}
      >
        <Dialog.Panel>
          <div className={`w-[235px] rounded p-2 bg-theme-DarkGray-900`}>
            <FilterOption mainText={`Include @everyone mentions`} />
            <FilterOption mainText={`Include @role mentions`} />
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}

export default FilterPopUp;
