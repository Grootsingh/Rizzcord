"use client";
import React from "react";
import ToolTip from "@/components/ToolTip";
import Image from "next/image";
import { CloseIcon } from "@/Icons";
import { AnimatePresence, motion } from "framer-motion";
import { users } from "@/UserData";
import { selectedBtn } from "@/components/RootRecoilProvider/RecoilStates";
import { useRecoilState, useResetRecoilState } from "recoil";

function UsersList() {
  const [isUser, setIsUser] = React.useState(users);
  const [isSelected, setIsSelected] = useRecoilState(selectedBtn);
  const resetSelected = useResetRecoilState(selectedBtn);

  function deleteUser(ID) {
    const newUserList = isUser.filter((eachUser) => eachUser.id !== ID);
    setIsUser(newUserList);
  }

  return (
    <ul className="relative">
      <AnimatePresence initial={false} mode="popLayout">
        {isUser.length > 0
          ? isUser.map(
              ({ username, id, image, status: StatusIcon, statusText }) => (
                <motion.div
                  layout={true}
                  initial={{ opacity: 1, height: 42 }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    transition: {
                      height: {
                        delay: 0.15,
                      },
                    },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 126,
                    damping: 20,
                    restDelta: 0.01,
                  }}
                  className="isolate relative"
                  key={id}
                >
                  {isSelected === username ? (
                    <motion.div
                      layoutId="userListfromSecNav"
                      initial={{ borderRadius: 4 }}
                      className={`absolute  inset-0  bg-theme-Smoke-1000`}
                    />
                  ) : undefined}
                  <motion.li
                    layout="position"
                    key={id}
                    id={username}
                    className={`${
                      isSelected === username
                        ? " text-white"
                        : "text-theme-SteelGray-500 hover:bg-theme-Driftwood-grey hover:text-theme-LightGray-400"
                    } group relative z-[1] cursor-pointer flex items-center  rounded  p-2`}
                  >
                    <div
                      onClick={() => setIsSelected(username)}
                      className="flex items-center gap-3"
                    >
                      <div className="relative ">
                        <div className="h-4 w-4 absolute bottom-[-3px] right-[-3px] rounded-full bg-theme-CharcoalGray-800 grid place-content-center">
                          <ToolTip text={statusText} direction={"Up"}>
                            <StatusIcon className=" h-[10px] w-[10px]   rounded-full" />
                          </ToolTip>
                        </div>
                        <Image
                          src={image}
                          alt={username}
                          className="w-8 h-8 rounded-full "
                        />
                      </div>
                      <span className="font-medium text-base">{username}</span>
                    </div>
                    <button
                      onClick={() => {
                        deleteUser(id);
                        resetSelected();
                      }}
                    >
                      <CloseIcon className="hidden group-hover:block h-4 w-4 absolute right-[13px] top-[calc(50%-8px)] hover:text-white" />
                    </button>
                  </motion.li>
                </motion.div>
              )
            )
          : undefined}
      </AnimatePresence>
    </ul>
  );
}

export default UsersList;
