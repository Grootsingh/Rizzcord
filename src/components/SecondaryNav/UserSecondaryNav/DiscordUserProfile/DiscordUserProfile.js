"use client";
import React from "react";
import { users } from "@/UserData";
import Image from "next/image";
import DiscordUserSettings from "./DiscordUserSettings";
import ProfilePopUp from "./ProfilePopUp";
import usePosition from "@/Hooks/usePosition";
import { myProfilePic } from "@/UserData";
import { AnimatePresence, motion } from "framer-motion";

function DiscordUserProfile() {
  const [isOpen, setOpen] = React.useState(false);
  const [showStatus, setStatus] = React.useState(false);

  const UserProfileRef = React.useRef();
  const ProfilePosition = usePosition(UserProfileRef, isOpen);
  const [top, left] = ProfilePosition;

  React.useEffect(() => {
    if (isOpen) {
      setStatus(true);
    } else {
      setTimeout(() => {
        setStatus(false);
      }, 500);
    }
  }, [isOpen]);

  function isCloseFn() {
    setOpen(false);
  }

  return (
    <div className="h-[52px] flex items-center justify-between  px-2 ">
      <div
        onClick={() => setOpen(true)}
        ref={UserProfileRef}
        className="flex w-1/2 rounded items-center group gap-2 hover:bg-theme-Driftwood-grey text-theme-SteelGray-500"
      >
        <div className="relative ">
          {showStatus === false && (
            <>
              <motion.div
                layoutId="onlineStatus"
                initial={{
                  color: "#3BA55D",
                }}
                animate={{
                  color: [
                    "#ed2b2a",
                    "#ff3fa4",
                    "#DA0C81",
                    "#fcb045",
                    "#F4CE14",
                  ],
                }}
                transition={{
                  color: {
                    repeatType: "reverse",
                    repeat: Infinity,
                    duration: 5,
                  },
                }}
                className="h-4 w-4 z-10 absolute bottom-[-3px] right-[-3px] rounded-full bg-theme-CharcoalGray-800 grid place-content-center"
              >
                <svg
                  fill="none"
                  className="h-[10px] w-[10px]"
                  viewBox="0 0 10 10"
                >
                  <rect width="10" height="10" fill="currentColor" rx="22.5" />
                </svg>
              </motion.div>
            </>
          )}

          <Image
            src={myProfilePic}
            alt={"rajat singh"}
            className="w-8 h-8 rounded-full "
          />
        </div>
        <div>
          <p className="text-white text-sm">Rajat Singh</p>
          <div className="relative text-xs overflow-hidden  ">
            <span className=" inline-block will-change-transform translate-y-0 transition-transform duration-500 motion-safe:group-hover:transition-transform motion-safe:group-hover:duration-[250ms] motion-safe:group-hover:-translate-y-full">
              Hire me !!!
            </span>
            <span className="absolute will-change-transform inset-0 transition-transform duration-500 translate-y-full motion-safe:group-hover:duration-[250ms] motion-safe:group-hover:transition-transform motion-safe:group-hover:translate-y-0">
              View Profile
            </span>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <ProfilePopUp
            ProfilePosition={ProfilePosition}
            isOpen={isOpen}
            isCloseFn={isCloseFn}
          />
        )}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {showStatus && ProfilePosition && (
          <>
            <motion.div
              layoutId="onlineStatus"
              animate={{
                color: ["#ed2b2a", "#ff3fa4", "#DA0C81", "#fcb045", "#F4CE14"],
              }}
              exit={{ transition: { delay: 3 } }}
              transition={{
                type: "spring",
                bounce: 0.2,
                color: {
                  repeatType: "reverse",
                  repeat: Infinity,
                  duration: 5,
                },
              }}
              style={{
                position: "fixed",
                top: top - 394,
                left: left + 85,
              }}
              className="h-6 w-6 z-50  rounded-full bg-theme-CharcoalGray-800 grid place-content-center"
            >
              <svg fill="none" className="h-4 w-4" viewBox="0 0 16 16">
                <rect width="16" height="16" fill="currentColor" rx="22.5" />
              </svg>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <DiscordUserSettings />
    </div>
  );
}

export default DiscordUserProfile;
