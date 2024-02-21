"use client";
import React from "react";
import ViewMore from "./ViewMore";
import { MorePopUpArr } from "@/Constant";
import { AnimatePresence, motion } from "framer-motion";
import NoCommandAvailiable from "./NoCommandAvailiable";
import { Dialog } from "@headlessui/react";
function MorePopUp({ position, isNotVisibleFn, isVisible }) {
  const [show, setShow] = React.useState(false);
  const [top, left] = position;

  let topPosition = top;
  if (top < 53) {
    topPosition = 64;
  } else if (top > 221) {
    topPosition = 221;
  }

  return (
    <Dialog
      as={motion.div}
      id="morepopup"
      key="morePopup"
      static={true}
      open={isVisible}
      onClose={() => isNotVisibleFn()}
      onMouseLeave={() => setShow(false)}
      style={{
        position: "fixed",
        top: `${topPosition}px`,
        left: `${left}px`,
        translate: `-140px -8px`,
      }}
      initial={{
        clipPath:
          top > 221 ? "circle(0.0% at 100% 100%)" : `circle(0% at 100% 0%)`,
      }}
      animate={{
        clipPath:
          top > 221 ? "circle(200% at 100% 100%)" : `circle(200% at 100% 0%)`,
      }}
      exit={{
        clipPath:
          top > 221 ? "circle(0.0% at 100% 100%)" : "circle(0% at 100% 0%)",
      }}
      transition={{ type: "tween", ease: "circInOut", duration: 0.6 }}
      className={`z-10 border border-l-[10px] border-transparent`}
    >
      <div className=" relative z-[2] flex flex-col shadow-xl w-[188px] p-2 bg-theme-Slate-300 rounded-lg ">
        {MorePopUpArr.map(({ id, text, icon: Icon }) => (
          <div
            onMouseOver={() => {
              if (text === "Add Reaction") {
                setShow("showViewMore");
              }
              if (text === "App") {
                setShow("showNoCommandAvailiable");
              }
            }}
            onMouseEnter={() => {
              if (text !== "Add Reaction" || text !== "App") {
                setShow(false);
              }
            }}
            key={id}
            className={`${
              text === "Report Message"
                ? "hover:bg-theme-Red-400 text-theme-Red-300"
                : "text-theme-SteelGray-light hover:bg-theme-Brand"
            } h-8 flex justify-between items-center font-medium  text-sm px-2 py-[6px] my-[2px] rounded hover:text-theme-White `}
          >
            <p>{text}</p>
            <Icon
              className={`${
                text === "Add Reaction" || text === "App"
                  ? "rotate-[270deg]"
                  : ""
              } h-[18px] w-[18px]`}
            />
          </div>
        ))}
      </div>
      <AnimatePresence>
        {show === "showViewMore" ? <ViewMore /> : undefined}
      </AnimatePresence>

      <AnimatePresence>
        {show === "showNoCommandAvailiable" ? (
          <NoCommandAvailiable />
        ) : undefined}
      </AnimatePresence>
    </Dialog>
  );
}

export default MorePopUp;

// initial={{
//   clipPath:
//     top < 53 ? "circle(0.4% at 100% 100%)" : "circle(0.4% at 100% 0)",
// }}
// animate={{
//   clipPath:
//     top < 53 ? "circle(150% at 100% 100%)" : "circle(150% at 100% 0)",
// }}
// exit={{
//   clipPath:
//     top < 53 ? "circle(0.4% at 100% 100%)" : "circle(0.4% at 100% 0)",
// }}
// transition={{ type: "tween", ease: "circInOut", duration: 0.5 }}
