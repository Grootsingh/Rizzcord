"use client";
import React from "react";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";

function MarkAllAsReadPopUp({ FalseMarkAsReadAll, TrueIsShowUnRead }) {
  let [isOpen, setIsOpen] = React.useState(true);

  React.useEffect(() => {
    if (!isOpen) {
      FalseMarkAsReadAll();
    }
  }, [isOpen]);

  return (
    <Dialog
      static={true}
      as={motion.div}
      key={"MarkAllAsReadPopUp"}
      initial={{ opacity: 0, top: "-40%" }}
      animate={{
        opacity: 1,
        top: "calc(40% - 100px)",

        transition: {
          top: { delay: 0.3, type: "spring", bounce: 0.4, restDelta: 0.01 },
        },
      }}
      exit={{
        opacity: 0,
        top: -335,

        transition: {
          opacity: {
            delay: 0.5,
            type: "spring",
            bounce: 0.4,
            restDelta: 0.01,
          },
        },
      }}
      transition={{
        duration: 1.5,
      }}
      className="right-[calc(50%-220px)]  z-20  fixed"
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className="fixed -z-10 inset-0 bg-black/30" aria-hidden="true" />
      <div className="w-[440px] rounded overflow-hidden">
        <Dialog.Panel>
          <div className={`bg-theme-Driftwood-grey-light h-[130px] p-4 `}>
            <Dialog.Title
              className={`text-theme-Slate-400 text-xl font-semibold`}
            >
              Mark all as read?
            </Dialog.Title>
            <div className="h-4" />
            <Dialog.Description className={`text-theme-LightGray-300 text-sm `}>
              This will mark all your unmuted channels as read. Are you sure you
              want to continue?
            </Dialog.Description>
          </div>
          <div className="h-[70px] bg-theme-CharcoalGray-800 p-4 flex justify-end">
            <button
              className={`text-white h-[38px]  rounded text-sm font-medium py-[2px] px-4 mr-3 hover:underline `}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className={`text-white h-[38px]  rounded text-sm font-medium py-[2px] px-4 bg-theme-Brand hover:bg-theme-Brand-dark `}
              onClick={() => {
                setIsOpen(false);
                TrueIsShowUnRead();
              }}
            >
              Mark As Read
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default MarkAllAsReadPopUp;
