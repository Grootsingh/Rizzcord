"use client";
import React from "react";
import TextBox from "./TextBox";
import { Dialog } from "@headlessui/react";
import { users } from "@/UserData";
import UserList from "./UserList/UserList";
import { AnimatePresence, motion } from "framer-motion";

function SecondarySearchBoxPopUp({ isOpen, isCloseFn }) {
  const [isVisibleUsers, setIsVisibleUsers] = React.useState(users);
  const [isKeyMatch, setIsKeyMatch] = React.useState("");
  const [isSearchFocus, setIsSearchFocus] = React.useState(false);
  const scrollElementRef = React.useRef();

  function updateSearchFocus(state) {
    setIsSearchFocus(state);
  }

  function searchFilter(name) {
    const searchFilteredUser = users.filter((user) => {
      let listUserName = user.username.toString().toLowerCase();
      let searchChar = name.toString().toLowerCase();
      return listUserName.startsWith(searchChar);
    });

    if (name.length > 0 && searchFilteredUser.length > 0) {
      setIsVisibleUsers(searchFilteredUser);
      setIsKeyMatch(0);
    } else if (name.length > 0 && searchFilteredUser.length === 0) {
      setIsVisibleUsers([]);
    } else if (name.length === 0) {
      setIsVisibleUsers(users);
      setIsKeyMatch(0);
    }
  }

  React.useEffect(() => {
    if (scrollElementRef.current?.scrollTop > 0) {
      scrollElementRef.current.scrollTop = 0;
    }
  }, [isVisibleUsers]);

  function updateKeyMatch(type) {
    let newKey;
    if (type === "increase") {
      newKey = isKeyMatch + 1;
      setIsKeyMatch(newKey);
    } else if (type === "decrease") {
      newKey = isKeyMatch - 1;
      setIsKeyMatch(newKey);
    } else if (type === "init") {
      setIsKeyMatch(0);
    } else if (type === "un-init") {
      setIsKeyMatch("");
    }
  }

  const transiton = {
    type: "spring",
    stiffness: 90,
    damping: 13,
    delay: 0.1,
    restDelta: 0.01,
    when: "beforeChildren",
  };

  return (
    <AnimatePresence inital={false}>
      {isOpen ? (
        <Dialog
          static={true}
          as={motion.div}
          onClose={isCloseFn}
          open={isOpen}
          key={"popup"}
          initial={{ opacity: 0, top: -335 }}
          animate={{
            opacity: 1,
            top: "calc(50% - 335px/2)",

            transition: {
              top: {
                delay: 0.3,
                type: "spring",
                bounce: 0.4,
                duration: 1,
                restDelta: 0.01,
              },
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
          className="left-[calc(50%-570px/2)]  z-20  fixed"
        >
          <div
            onClick={() => isCloseFn()}
            className="fixed inset-0 bg-black/60 -z-[1]"
            aria-hidden="true"
          />

          <Dialog.Panel>
            <motion.div
              layout="size"
              transition={transiton}
              className="w-[570px]  bg-theme-CharcoalGray-800 flex flex-col px-5 pt-5 rounded-xl shadow-lg"
            >
              <motion.div layout="preserve-aspect">
                <TextBox
                  searchFilter={searchFilter}
                  isKeyMatch={isKeyMatch}
                  updateKeyMatch={updateKeyMatch}
                  isVisibleUsers={isVisibleUsers}
                  updateSearchFocus={updateSearchFocus}
                  scrollElementRef={scrollElementRef}
                  isCloseFn={isCloseFn}
                />
              </motion.div>
              <div className="h-7" />

              <div className="realtive flex flex-col">
                <motion.div
                  ref={scrollElementRef}
                  layout={true}
                  inital={{ flexShrink: 0 }}
                  animate={{
                    flexShrink: 1,
                  }}
                  transition={transiton}
                  className={`
                ${
                  isVisibleUsers.length === 0
                    ? `items-center justify-center`
                    : `flex-col`
                } scrollbar-big max-h-[179px] hover:pr-0 pl-1 pr-4 overflow-hidden hover:overflow-y-scroll  rounded flex  gap-[2px]`}
                >
                  {isVisibleUsers.length > 0 ? (
                    <>
                      <motion.p
                        layout="position"
                        className="pl-2 text-theme-SteelGray-500 font-semibold  text-xs"
                      >
                        PREVIOUS CHANNELS
                      </motion.p>
                      <div className="h-1 shrink-0" />
                    </>
                  ) : undefined}
                  <UserList
                    isVisibleUsers={isVisibleUsers}
                    isKeyMatch={isKeyMatch}
                    updateKeyMatch={updateKeyMatch}
                    isSearchFocus={isSearchFocus}
                    isCloseFn={isCloseFn}
                  />
                </motion.div>
              </div>
              <motion.div
                layout="preserve-aspect"
                transition={transiton}
                className="h-[38px] text-xs gap-1 flex items-center"
              >
                <p className=" text-theme-Teal-600 font-semibold">PROTIPS:</p>
                <p className="text-theme-CharcoalGray-600 font-medium ">
                  Start searches with
                </p>
                <div className="bg-theme-DarkGray-900 rounded p-[2px] text-theme-CharcoalGray-600 font-Code">
                  @
                </div>
                <div className="bg-theme-DarkGray-900 rounded p-[2px] text-theme-CharcoalGray-600 font-Code">
                  #
                </div>
                <div className="bg-theme-DarkGray-900 rounded p-[2px] text-theme-CharcoalGray-600 font-Code">
                  !
                </div>
                <div className="bg-theme-DarkGray-900 rounded p-[2px] text-theme-CharcoalGray-600 font-Code">
                  *
                </div>
                <p className="text-theme-CharcoalGray-600 font-medium ">
                  to narrow results
                </p>
                <p className="text-theme-Forest-900 font-medium">Learn more</p>
              </motion.div>
            </motion.div>
          </Dialog.Panel>
        </Dialog>
      ) : undefined}
    </AnimatePresence>
  );
}

export default SecondarySearchBoxPopUp;
