"use client";
import { motion } from "framer-motion";

function MorePopUp({ position, username, DeleteUser }) {
  const [top, left] = position;
  let stylePosition = {
    top: `${top}px`,
    left: `${left}px`,
    translate: `-90% 30%`,
  };

  if (top > 500) {
    stylePosition = {
      top: `${top}px`,
      left: `${left}px`,
      translate: `-104% -80%`,
    };
  }

  return (
    <motion.div
      initial={{
        clipPath:
          top > 500 ? "circle(0.4% at 100% 100%)" : "circle(0.4% at 100% 0)",
      }}
      animate={{
        clipPath:
          top > 500 ? "circle(150% at 100% 100%)" : "circle(150% at 100% 0)",
      }}
      exit={{
        clipPath:
          top > 500 ? "circle(0.4% at 100% 100%)" : "circle(0.4% at 100% 0)",
      }}
      transition={{ type: "tween", ease: "circInOut", duration: 0.5 }}
      style={stylePosition}
      className="fixed z-20 flex flex-col shadow  w-[188px] p-2 bg-theme-Slate-300 rounded-lg"
    >
      <div className="h-8 font-medium text-theme-SteelGray-light text-sm px-2 py-[6px] my-[2px] rounded hover:text-theme-White hover:bg-theme-Brand">
        <p>Start Video Call</p>
      </div>
      <div className="h-8 font-medium text-theme-SteelGray-light text-sm px-2 py-[6px] my-[2px] rounded hover:text-theme-White hover:bg-theme-Brand">
        <p>Start Voice Call</p>
      </div>
      <div
        onClick={(event) => {
          event.stopPropagation();
          DeleteUser(username);
        }}
        className="h-8 font-medium  text-sm px-2 py-[6px] my-[2px] rounded hover:text-theme-White hover:bg-theme-Red-400 text-theme-Red-300 "
      >
        <p>Remove Friend</p>
      </div>
    </motion.div>
  );
}

export default MorePopUp;
