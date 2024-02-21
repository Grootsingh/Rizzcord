"use client";
import { MessageIcon, SearchNotFoundIcon } from "@/Icons";
import React from "react";
import Image from "next/image";
import ToolTip from "@/components/ToolTip";
import { motion, AnimatePresence } from "framer-motion";
import UserNotFound from "../UserNotFound";
import { selectedBtn } from "@/components/RootRecoilProvider/RecoilStates";
import { useSetRecoilState } from "recoil";
import MoreBtn from "./MoreBtn";

function UserPanelList({ isVisibleUsers, DeleteUser, isActive, inputref }) {
  const selectButton = useSetRecoilState(selectedBtn);
  const [isMouseOver, setMouseOver] = React.useState(false);
  const [inputBoxFocus, setInputBoxFocus] = React.useState(false);

  React.useEffect(() => {
    function handleFocusEvent(event) {
      if (event.target === inputref?.current) {
        setInputBoxFocus(true);
      } else {
        setInputBoxFocus(false);
      }
    }
    document.addEventListener("focusin", handleFocusEvent);
    return () => document.removeEventListener("focusin", handleFocusEvent);
  }, []);

  const animateVarient = {
    opacity: 1,
    height: 60,
    borderColor: "hsl(223 7% 21%)",
    transition: {
      opacity: {
        delay: 0.3,
      },
      height: {
        type: "spring",
        stiffness: 60,
        damping: 13,
        restDelta: 0.01,
      },
    },
    transitionEnd: {
      borderColor: "hsl(225 6% 26%)",
    },
  };

  const initialInactiveVarient = {
    height: 60,
    opacity: 1,
    borderColor: "hsl(225 6% 26%)",
  };
  const initialActiveVarient = {
    height: 0,
    opacity: 0,
    borderColor: "hsl(225 6% 26%)",
  };

  return (
    <>
      <div className="pl-[30px] pr-[20px] text-theme-SteelGray-500">
        <p className="font-bold pt-2 text-xs">
          ONLINE - {isVisibleUsers?.length || 0}
        </p>
      </div>
      <div className="h-4" />
      <div
        key={isActive}
        className={`${
          isVisibleUsers.length === 0
            ? `overflow-hidden flex items-center justify-center`
            : `overflow-y-scroll `
        } h-[calc(100vh-7.25rem-10px)] outline-none px-[22px] border-theme-Driftwood-grey-light  pb-14 scrollbar-big text-theme-SteelGray-500`}
      >
        <ul className="relative">
          <AnimatePresence initial={false} mode="wait">
            {isVisibleUsers.length === 0 ? (
              <UserNotFound
                icon={SearchNotFoundIcon}
                text={`Wumpus looked, but couldn’t find anyone with that name.`}
              />
            ) : (
              <>
                <AnimatePresence mode="popLayout">
                  {isVisibleUsers?.map(
                    ({
                      username,
                      id,
                      userstatus,
                      image,
                      status: StatusIcon,
                    }) => (
                      <motion.li
                        layout={true}
                        initial={
                          inputBoxFocus
                            ? initialActiveVarient
                            : initialInactiveVarient
                        }
                        animate={inputBoxFocus && animateVarient}
                        exit={{
                          opacity: 0,
                          height: 0,

                          transition: {
                            height: {
                              delay: 0.2,
                            },
                          },
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 60,
                          damping: 12,
                        }}
                        key={id}
                        onMouseOver={() => setMouseOver(username)}
                        onMouseLeave={(event) => {
                          if (event.relatedTarget.nodeName !== "LI") {
                            setMouseOver(false);
                          }
                        }}
                        onClick={(event) => {
                          if (
                            !(
                              event.target?.id === "More" ||
                              event.target.parentElement?.id === "More" ||
                              event.target.childElement?.id === "More"
                            )
                          ) {
                            selectButton(username);
                            const element = document.getElementById(username);
                            element.scrollIntoView({
                              block: "center",
                              behavior: "smooth",
                            });
                          }
                        }}
                        className="flex items-center  h-[60px] justify-between  group rounded-lg border-t   hover:bg-theme-Smoke-700 "
                      >
                        <motion.div
                          layout="position"
                          className="flex px-2 min-w-0 items-center gap-3"
                        >
                          <div className="relative shrink-0">
                            <div className="h-4 w-4 absolute bottom-[-3px] right-[-3px] rounded-full bg-theme-CharcoalGray-800 grid place-content-center">
                              <StatusIcon className=" h-[10px] w-[10px]   rounded-full" />
                            </div>
                            <Image
                              src={image}
                              alt={username}
                              height={32}
                              width={32}
                              className="w-8 h-8 rounded-full "
                            />
                          </div>

                          <div className="min-w-0 shrink-[1000]">
                            <p className="font-bold text-ellipsis whitespace-nowrap overflow-hidden max-w-max text-theme-Slate-400">
                              {username}
                            </p>
                            <p className="text-sm font-semibold text-ellipsis whitespace-nowrap overflow-hidden max-w-max text-theme-Stone-580">
                              {userstatus}
                            </p>
                          </div>
                        </motion.div>
                        <motion.div
                          layout="position"
                          className="flex px-2 relative gap-[10px]"
                        >
                          <ToolTip text={"Message"} direction={"Up"}>
                            <div className="h-8 w-8 hover:text-theme-LightGray-300   group-hover:bg-theme-DarkGray-900 grid place-content-center rounded-full bg-theme-CharcoalGray-800">
                              <MessageIcon className="h-5 w-5 " />
                            </div>
                          </ToolTip>

                          <MoreBtn
                            username={username}
                            DeleteUser={DeleteUser}
                            isMouseOver={isMouseOver}
                          />
                        </motion.div>
                      </motion.li>
                    )
                  )}
                </AnimatePresence>
              </>
            )}
          </AnimatePresence>
        </ul>
      </div>
    </>
  );
}

export default UserPanelList;
