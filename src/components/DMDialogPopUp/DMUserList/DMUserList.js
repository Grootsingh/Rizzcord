"use client";
import React from "react";
import Image from "next/image";
import { CheckMarkIcon, SearchNotFoundTwoIcon } from "@/Icons";
import { motion, AnimatePresence } from "framer-motion";
import DMCheckBox from "./DMCheckBox";
import UserNotFound from "./UserNotFound";

function DMUserList({
  isDMList,
  updateDMList,
  isVisibleUsers,
  isKeyMatch,
  updateKeyMatch,
  isSearchFocus,
}) {
  return (
    <ul
      onMouseEnter={() => updateKeyMatch("un-init")}
      onMouseLeave={() => {
        if (isSearchFocus === true) {
          updateKeyMatch("init");
        }
      }}
      className="relative"
    >
      <AnimatePresence initial={false} mode="wait">
        {isVisibleUsers.length === 0 ? (
          <UserNotFound
            icon={SearchNotFoundTwoIcon}
            text={"No friends found that are not already in this DM"}
          />
        ) : (
          <AnimatePresence initial="false" mode="popLayout">
            {isVisibleUsers.map(
              ({ username, id, image, status: StatusIcon }, index) => (
                <motion.li
                  layout={true}
                  initial={{ height: "42px", opacity: 0 }}
                  animate={{
                    opacity: 1,
                    height: "42px",
                    transition: {
                      opacity: {
                        delay: 0.15,
                      },
                      height: {
                        type: "spring",
                        stiffness: 60,
                        damping: 11,
                      },
                    },
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    height: {
                      delay: 0.15,
                      type: "spring",
                      stiffness: 60,
                      damping: 11,
                    },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 113,
                    damping: index > 20 ? 19 : 17,
                  }}
                  key={id}
                  onClick={() => {
                    updateDMList(!Boolean(isDMList.get(username)), username);
                  }}
                  className={`${
                    isKeyMatch === index
                      ? `bg-theme-DarkGray-700 text-theme-LightGray-400`
                      : `text-theme-LightGray-200`
                  } group flex justify-between rounded cursor-pointer  hover:bg-theme-DarkGray-700 hover:text-theme-LightGray-400 p-2 gap-3`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center">
                      <div className="h-4 w-4 absolute bottom-[-3px] right-[-3px] rounded-full bg-theme-CharcoalGray-800 grid place-content-center">
                        <StatusIcon className=" h-[10px] w-[10px]   rounded-full" />
                      </div>
                      <Image
                        src={image}
                        alt={username}
                        className="w-8 h-8 rounded-full "
                      />
                    </div>
                    <span className="font-medium text-base">{username}</span>
                  </div>
                  <div className="h-[22px] w-[22px] relative">
                    <div
                      className={`${
                        Boolean(isDMList.get(username))
                          ? `border-theme-Brand`
                          : `border-theme-Driftwood-grey-100`
                      } grid pointer-events-none place-content-center absolute rounded-lg  border-2 inset-0`}
                    >
                      {Boolean(isDMList.get(username)) ? (
                        <CheckMarkIcon className={`h-4 w-4`} />
                      ) : undefined}
                    </div>
                    <DMCheckBox
                      username={username}
                      updateDMList={updateDMList}
                      isDMList={isDMList}
                    />
                  </div>
                </motion.li>
              )
            )}
          </AnimatePresence>
        )}
      </AnimatePresence>
    </ul>
  );
}

export default DMUserList;
