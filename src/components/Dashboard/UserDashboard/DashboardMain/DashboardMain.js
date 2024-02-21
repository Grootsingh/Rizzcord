"use client";
import React from "react";
import { useRecoilValue } from "recoil";
import { activeHeaderBtn } from "@/components/RootRecoilProvider/RecoilStates";
import UserSearchBox from "./UserSearchBox";
import { users } from "@/UserData";
import UserPanelList from "./UserPanelList";
import UserNotFound from "./UserNotFound";
import AddFriendPanel from "./AddFriendPanel";
import { PandingNotFoundIcon, BlockedNotFoundIcon } from "@/Icons";
import { AnimatePresence, motion } from "framer-motion";

const filterUsers = users.filter(
  (eachUser) => eachUser.statusText !== "Offline"
);

export default function DashboardMain() {
  const isActive = useRecoilValue(activeHeaderBtn);
  const [isVisibleUsers, setIsVisibleUsers] = React.useState(filterUsers);
  const inputref = React.useRef();
  React.useEffect(() => {
    if (isActive === "Online") {
      setIsVisibleUsers(filterUsers);
    } else {
      setIsVisibleUsers(users);
    }
  }, [isActive]);

  const searchFilter = React.useCallback(
    (name) => {
      let data = isActive === "Online" ? filterUsers : users;

      const searchFilteredUser = data.filter((user) => {
        let listUserName = user.username.toString().toLowerCase();
        let searchChar = name.toString().toLowerCase();
        return listUserName.startsWith(searchChar);
      });

      if (name.length > 0 && searchFilteredUser.length > 0) {
        setIsVisibleUsers(searchFilteredUser);
      } else if (name.length > 0 && searchFilteredUser.length === 0) {
        setIsVisibleUsers([]);
      } else if (name.length === 0) {
        setIsVisibleUsers(data);
      }
    },
    [isActive]
  );
  function DeleteUser(DeleteUsername) {
    const newVisibleUserList = isVisibleUsers.filter(
      ({ username }) => username !== DeleteUsername
    );
    setIsVisibleUsers(newVisibleUserList);
  }

  return (
    <>
      <AnimatePresence initial={false} mode="wait">
        {isActive === "Online" || isActive === "All" ? (
          <>
            <motion.div
              layout={true}
              key={"Online&All"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "tween", ease: "easeInOut" }}
            >
              <UserSearchBox
                searchFilter={searchFilter}
                ref={inputref}
                isActive={isActive}
              />

              <AnimatePresence initial={false} mode="wait">
                {isActive === "Online" ? (
                  <motion.div
                    layout={true}
                    key={"Online"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "tween", ease: "easeInOut" }}
                  >
                    <UserPanelList
                      key="Online"
                      isVisibleUsers={isVisibleUsers}
                      DeleteUser={DeleteUser}
                      isActive={isActive}
                      inputref={inputref}
                    />
                  </motion.div>
                ) : undefined}

                {isActive === "All" ? (
                  <motion.div
                    layout={true}
                    key={"All"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "tween", ease: "easeInOut" }}
                  >
                    <UserPanelList
                      key={"All"}
                      isVisibleUsers={isVisibleUsers}
                      DeleteUser={DeleteUser}
                      isActive={isActive}
                      inputref={inputref}
                    />
                  </motion.div>
                ) : undefined}
              </AnimatePresence>
            </motion.div>
          </>
        ) : undefined}

        {isActive === "Panding" ? (
          <UserNotFound
            key={"Panding"}
            icon={PandingNotFoundIcon}
            text={
              "There are no pending friend requests. Here's Wumpus for now."
            }
          />
        ) : undefined}
        {isActive === "Blocked" ? (
          <UserNotFound
            key={"Blocked"}
            icon={BlockedNotFoundIcon}
            text={"You can't unblock the Wumpus."}
          />
        ) : undefined}
        {isActive === "Add Friend" ? (
          <AddFriendPanel key={"AddAFriend"} />
        ) : undefined}
      </AnimatePresence>
    </>
  );
}
