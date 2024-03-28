"use client";
import { motion } from "framer-motion";
import React from "react";
import useMusicPopUpKeyframe from "@/Hooks/useMusicPopUpKeyframe";
function MusicHelperPopUp() {
  const LineOneRef = React.useRef();
  const LineTwoRef = React.useRef();
  const [ContainerControl, LineOneControl, LineTwoControl] =
    useMusicPopUpKeyframe(LineOneRef, LineTwoRef);

  return (
    <>
      <motion.div
        layout={true}
        initial={{
          y: "175%",
          height: 40,
          borderRadius: 20,
          width: 40,
        }}
        animate={ContainerControl}
        transition={{
          type: "spring",
        }}
        exit={{ y: "175%" }}
        className="fixed font-medium overflow-hidden text-theme-Slate-400  flex flex-col shadow-xl  bottom-6 right-4 bg-theme-Slate-300"
      >
        <motion.div
          ref={LineOneRef}
          className=" whitespace-nowrap p-2"
          initial={{ opacity: 0 }}
          animate={LineOneControl}
        >
          <p>Playing Banana Shake by HUS</p>
        </motion.div>
        <motion.div
          className="whitespace-nowrap"
          ref={LineTwoRef}
          initial={{
            opacity: 0,
            width: 0,
          }}
          animate={LineTwoControl}
        >
          <p className="p-2">
            You can use Keyboard (Ctrl or Cmd) + Spacebar to Play and Pause the
            Music
          </p>
        </motion.div>
      </motion.div>
    </>
  );
}

export default MusicHelperPopUp;
