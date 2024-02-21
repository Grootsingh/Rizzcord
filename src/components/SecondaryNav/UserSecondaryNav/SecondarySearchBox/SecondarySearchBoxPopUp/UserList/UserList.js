"use client";
import Image from "next/image";
import React from "react";
import { ServerNotFoundIcon } from "@/Icons";
import { motion, AnimatePresence } from "framer-motion";
import NotFound from "./NotFound";
import { selectedBtn } from "@/components/RootRecoilProvider/RecoilStates";
import { useSetRecoilState } from "recoil";

function UserList({
  isVisibleUsers,
  isKeyMatch,
  updateKeyMatch,
  isSearchFocus,
  isCloseFn,
}) {
  const selectButton = useSetRecoilState(selectedBtn);

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
          <NotFound
            icon={ServerNotFoundIcon}
            Primanrytext={"Can’t seem to find what you’re looking for?"}
            Secondarytext={"Learn more about Quick Switcher"}
          />
        ) : (
          <AnimatePresence initial="false" mode="popLayout">
            {isVisibleUsers.map(({ username, id, image }, index) => (
              <motion.li
                layout={true}
                initial={{ height: "34px", opacity: 0 }}
                animate={{
                  opacity: 1,
                  height: "34px",
                  transition: {
                    height: {
                      type: "spring",
                      stiffness: 60,
                      damping: 11,
                      delay: 0.15,
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
                  isCloseFn();
                  selectButton(username);
                  const element = document.getElementById(username);
                  element.scrollIntoView({
                    block: "center",
                    behavior: "smooth",
                  });
                }}
                className={`${
                  isKeyMatch === index
                    ? `bg-theme-DarkGray-700 text-theme-LightGray-400`
                    : `text-theme-LightGray-200`
                } group flex justify-between rounded cursor-pointer  hover:bg-theme-DarkGray-700 hover:text-theme-LightGray-400 p-2 gap-3`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    <Image
                      src={image}
                      alt={username}
                      height={20}
                      width={20}
                      className="w-5 h-5 rounded-full "
                    />
                  </div>
                  <p className="font-medium text-base">{username}</p>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        )}
      </AnimatePresence>
    </ul>
  );
}

export default UserList;
