"use client";
import { PinNotFoundIcon } from "@/Icons";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
function PinPopUp({ isPinOpen, closePinFn }) {
  return (
    <Dialog
      static={true}
      as={motion.div}
      key="PinPopup"
      open={isPinOpen}
      onClose={() => closePinFn()}
      className={
        "fixed top-[3.5rem] z-[2] rounded-lg right-[22rem] overflow-hidden "
      }
      initial={{
        clipPath: "circle(0% at 100% 0%)",
        filter: "drop-shadow(0 0 12px hsl(200 13% 2% / 0))",
      }}
      animate={{
        clipPath: "circle(200% at 100% 0)",
        filter: "drop-shadow(0 0 12px hsl(200 13% 2% / 0.5))",
      }}
      exit={{
        clipPath: "circle(0% at 100% 0)",
        filter: "drop-shadow(0 0 12px hsl(200 13% 2% / 0))",
      }}
      transition={{ type: "tween", ease: "circInOut", duration: 0.8 }}
    >
      <div className="w-[420px] flex flex-col overflow-hidden   h-[352px] bg-theme-CharcoalGray-800">
        <div className="h-[52px]  flex items-center pl-4 bg-theme-DarkGray-900">
          <p className="text-theme-Slate-400 font-semibold">Pinned Message</p>
        </div>
        <div className="h-[210px] py-4  gap-3 flex flex-col items-center">
          <PinNotFoundIcon className="h-[120px] w-[92px]" />
          <p className="text-theme-LightGray-300 font-medium text-center">
            This direct message doesn't have <br /> any pinned messages... yet.
          </p>
        </div>
        <div className="grow flex flex-col items-center justify-center gap-[2px] bg-theme-DarkGray-900">
          <p className="font-bold text-sm text-theme-Teal-600">PROTIP:</p>
          <p className="text-sm font-medium text-theme-CharcoalGray-600">
            You can pin a message from its context menu.
          </p>
        </div>
      </div>
    </Dialog>
  );
}

export default PinPopUp;
