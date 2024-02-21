"use client";
import { motion } from "framer-motion";
import { SmileEmojiIcon } from "@/Icons";
function ViewMore() {
  return (
    <motion.div
      id="viewMore"
      key="ViewMore"
      initial={{
        top: "1rem",
        right: "-0.5rem",
        scaleX: 0.9,
        borderRadius: 8,
      }}
      animate={{
        right: "11.5rem",

        scaleX: 1,
        pointerEvents: "none",
        transition: {
          right: {
            type: "spring",
            stiffness: 65,
            damping: 12,

            restDelta: 0.01,
          },
        },
        transitionEnd: { pointerEvents: "auto" },
      }}
      exit={{
        right: "-0.5rem",
        scaleX: 0.9,

        pointerEvents: "none",
        transition: {
          right: {
            type: "spring",
            stiffness: 60,
            damping: 13,
            delay: 0.2,
            restDelta: 0.01,
          },
          scaleX: {
            delay: 0.3,
          },
        },
        transitionEnd: { pointerEvents: "auto" },
      }}
      className="absolute  z-1 border border-r-[10px] border-transparent"
    >
      <div className=" flex flex-col shadow-xl w-[188px] p-2 bg-theme-Slate-300 rounded-lg">
        <div
          className={`
          text-theme-SteelGray-light hover:bg-theme-Brand
          h-8 flex justify-between items-center font-medium  text-sm px-2 py-[6px] my-[2px] rounded hover:text-theme-White `}
        >
          <p>View More</p>
          <SmileEmojiIcon className={`h-[18px] w-[18px]`} />
        </div>
      </div>
    </motion.div>
  );
}

export default ViewMore;
