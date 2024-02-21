"use client";
import React from "react";
import { Dialog } from "@headlessui/react";
import { users } from "@/UserData";
import { motion } from "framer-motion";
import DMSearchBox from "./DMSearchBox";
import DMUserList from "./DMUserList";
function DMDialogPopUp({
  isDMDialogOpen,
  closeDMDialogFn,
  positionDMDialog,
  clipPathAnimate,
}) {
  const [isDMList, setIsDMList] = React.useState(() => new Map());
  const [isVisibleUsers, setIsVisibleUsers] = React.useState(users);
  const [isKeyMatch, setIsKeyMatch] = React.useState("");
  const [isSearchFocus, setIsSearchFocus] = React.useState(false);
  const scrollElementRef = React.useRef();

  function updateDMList(checkedState, username) {
    const updatedMap = new Map(isDMList).set(username, checkedState);
    setIsDMList(updatedMap);
  }
  React.useEffect(() => {
    if (scrollElementRef.current?.scrollTop > 0) {
      scrollElementRef.current.scrollTop = 0;
    }
  }, [isVisibleUsers]);
  const selectedUsers = [];

  for (const value of isDMList) {
    if (value[1]) {
      selectedUsers.push(value[0]);
    }
  }

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

  return (
    <Dialog
      static={true}
      layout={true}
      as={motion.div}
      key="DMDialogPopUp"
      initial={{
        clipPath: clipPathAnimate.clipPathOrigin,
        filter: "drop-shadow(0 0 12px hsl(200 13% 2% / 0))",
      }}
      animate={{
        clipPath: clipPathAnimate.clipPathEnter,
        filter: "drop-shadow(0 0 12px hsl(200 13% 2% / 0.5))",
      }}
      exit={{
        clipPath: clipPathAnimate.clipPathExit,
        filter: "drop-shadow(0 0 12px hsl(200 13% 2% / 0))",
      }}
      transition={{ type: "tween", ease: "circInOut", duration: 0.8 }}
      style={positionDMDialog}
      open={isDMDialogOpen}
      onClose={() => closeDMDialogFn()}
      className="fixed overflow-hidden z-[2]"
    >
      <div className="w-[440px] flex flex-col min-h-[400px] rounded-xl bg-theme-Driftwood-grey-light  border-theme-DarkGray-900 border-[1.5px]">
        <Dialog.Panel>
          <motion.div
            layout="position"
            className="p-4 min-h-[130px] flex flex-col justify-between"
          >
            <div>
              <Dialog.Title className="text-theme-Slate-400 text-xl font-semibold">
                Select Friends
              </Dialog.Title>
              <Dialog.Description className="text-xs font-semibold text-theme-LightGray-300">
                {selectedUsers.length === 0 ? (
                  <span> You can add 9 more Friends </span>
                ) : undefined}
                {selectedUsers.length > 0 && selectedUsers.length < 9 ? (
                  <span>
                    You can add {9 - selectedUsers.length} more Friends
                  </span>
                ) : undefined}
                {selectedUsers.length === 9 ? (
                  <span> the group has a 10 member limit </span>
                ) : undefined}
                {selectedUsers.length > 9 ? (
                  <span className="text-theme-Red-400">
                    This group has a 10 member limit
                  </span>
                ) : undefined}
              </Dialog.Description>
            </div>
            <DMSearchBox
              selectedUsers={selectedUsers}
              updateDMList={updateDMList}
              searchFilter={searchFilter}
              isDMList={isDMList}
              isKeyMatch={isKeyMatch}
              updateKeyMatch={updateKeyMatch}
              isVisibleUsers={isVisibleUsers}
              updateSearchFocus={updateSearchFocus}
              scrollElementRef={scrollElementRef}
            />
          </motion.div>
          <div
            ref={scrollElementRef}
            className={`${
              isVisibleUsers.length === 0
                ? `items-center justify-center`
                : `flex-col`
            } scrollbar-small h-[calc(400px-130px-78px)] outline-none overflow-hidden hover:overflow-y-scroll hover:pr-[6px] pl-2 pr-4 rounded flex  gap-[2px]`}
          >
            <DMUserList
              isDMList={isDMList}
              updateDMList={updateDMList}
              isVisibleUsers={isVisibleUsers}
              isKeyMatch={isKeyMatch}
              updateKeyMatch={updateKeyMatch}
              isSearchFocus={isSearchFocus}
            />
          </div>
          <motion.div
            layout="position"
            className="h-[78px] px-4 flex items-center"
          >
            <button
              onClick={() => closeDMDialogFn()}
              className="h-[38px] rounded-lg w-full text-sm font-medium text-theme-white-500 bg-theme-Brand outline-none "
            >
              {selectedUsers.length <= 1 ? "Create DM" : "Create Group DM"}
            </button>
          </motion.div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default DMDialogPopUp;
