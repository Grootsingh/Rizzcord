"use client";
import React from "react";
import {
  FriendRequestGuyIcon,
  InboxIcon,
  InboxNotFoundIcon,
  StartsBGIcon,
  AtTheRateIcon,
} from "@/Icons";
import Unread from "./Unread";
import ToolTip from "@/components/ToolTip";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { users } from "@/UserData";
import GenerateChat from "@/Helper/GenerateChat";
import { randomDigit } from "@/utils";
import { differentChatOption, InboxPopupBtn } from "@/Constant";
import InboxNavBtns from "./InboxNavBtns";

function InboxPopUp({ isInboxOpen, closeInBoxFn }) {
  const [isActive, setIsActive] = React.useState(InboxPopupBtn[0].status);

  const [isShowUnRead, setIsShowUnRead] = React.useState(false);
  const [isNotFoundAnimate, setIsNotFoundAnimate] = React.useState(false);
  const [isChat, setIsChat] = React.useState(() => {
    let randomChat = randomDigit(0, differentChatOption.length - 1);
    let data = GenerateChat(differentChatOption[randomChat]);
    while (data.length < 6) {
      data = GenerateChat(differentChatOption[randomChat]);
    }
    data = data.slice(0, 6);
    data = data.map((prop) => {
      return {
        date: prop.date,
        chatMessages: prop.chatMessages.slice(0, randomDigit(1, 5)),
      };
    });
    const newArr = [];
    for (let i = 0; i < 6; i += 2) {
      newArr.push([data[i], data[i + 1]]);
    }
    return newArr;
  });

  const [randomUsers, setRandomUsers] = React.useState(() => {
    let randomUserOne = randomDigit(0, users.length - 1);
    let randomUserTwo = randomDigit(0, users.length - 1);
    let randomUserThree = randomDigit(0, users.length - 1);

    const usersList = [randomUserOne, randomUserTwo, randomUserThree].map(
      (digit) => {
        return [users[digit].image.src, users[digit].username];
      }
    );

    return usersList;
  });

  const unreadValue = useMotionValue("0%");
  const forYouValue = useMotionValue("0%");
  const mentionsValue = useMotionValue("0%");

  function TrueIsShowUnRead() {
    setIsShowUnRead(true);
  }

  function updateActive(newActive) {
    setIsActive(newActive);
  }

  React.useEffect(() => {
    if (isShowUnRead) {
      setIsNotFoundAnimate(true);
      setTimeout(() => {
        setIsNotFoundAnimate(false);
      }, 1500);
    }
  }, [isShowUnRead]);

  return (
    <Dialog
      static={true}
      as={motion.div}
      key="InboxPopup"
      open={isInboxOpen}
      onClose={() => closeInBoxFn()}
      className={"fixed top-[3.5rem] z-[2] right-[4rem] overflow-hidden "}
      initial={{
        clipPath: "circle(0% at 100% 0%)",
        boxShadow: "0 0 20px rgba(4, 5, 6, 0)",
      }}
      animate={{
        clipPath: "circle(200% at 100% 0)",
        boxShadow: "0 0 20px rgba(4, 5, 6, 0.5)",
      }}
      exit={{
        clipPath: "circle(0% at 100% 0)",
        boxShadow: "0 0 20px rgba(4, 5, 6, 0)",
      }}
      transition={{ type: "tween", ease: "circInOut", duration: 0.8 }}
    >
      <Dialog.Panel>
        <div className="flex flex-col w-[480px] h-[501px] border-theme-Black/60 rounded overflow-hidden border  ">
          <div className="bg-theme-DarkGray-900  h-[88px] w-full px-4 py-3">
            <div className="flex items-center gap-2">
              <InboxIcon className="h-6 w-6 text-white " />
              <Dialog.Title className="text-theme-LightGray-300 text-xl font-semibold">
                Inbox
              </Dialog.Title>

              <div className="ml-auto">
                <ToolTip direction={"Up"} text={"View Friend Requests"}>
                  <div className="w-[56px] group flex items-center justify-evenly h-[28px]  bg-theme-CharcoalGray-800 rounded-3xl">
                    <FriendRequestGuyIcon className="text-theme-SteelGray-light group-hover:text-white h-4 w-4" />
                    <div className="bg-theme-Smoke-900 place-content-center grid h-4 w-4 rounded-full">
                      <p className="text-white text-xs font-bold">0</p>
                    </div>
                  </div>
                </ToolTip>
              </div>
            </div>
            <InboxNavBtns
              isActive={isActive}
              updateActive={updateActive}
              TrueIsShowUnRead={TrueIsShowUnRead}
            />
          </div>
          <div
            className={`${
              isActive !== "For you"
                ? "overflow-y-scroll overflow-x-hidden scrollbar-small"
                : ""
            } grow bg-theme-CharcoalGray-800 pl-4 pr-[6px]`}
          >
            <AnimatePresence initial={false} mode="popLayout">
              {isActive === "For You" ? (
                <motion.div
                  initial={() => {
                    return { x: forYouValue.get() };
                  }}
                  key="For You"
                  animate={() => {
                    if (forYouValue.get() !== "0%") {
                      forYouValue.set("0%");
                    }
                    unreadValue.set("100%");
                    mentionsValue.set("200%");

                    return { x: forYouValue.get() };
                  }}
                  exit={() => {
                    forYouValue.set("-120%");

                    return { x: forYouValue.get() };
                  }}
                  transition={{ type: "spring", stiffness: 163, damping: 20 }}
                  className="h-full"
                >
                  <ForYouNotFound
                    icon={InboxNotFoundIcon}
                    mainText={"Nothing here yet"}
                    subText={
                      "Come back for notifications on events, streams, and more"
                    }
                  />
                </motion.div>
              ) : undefined}

              {isActive === "Unreads" && isShowUnRead === false ? (
                <motion.div
                  key="Unreads"
                  initial={() => {
                    return { x: unreadValue.get() };
                  }}
                  animate={() => {
                    if (unreadValue.get() !== "0%") {
                      unreadValue.set("0%");
                    }
                    mentionsValue.set("100%");
                    forYouValue.set("-100%");

                    return {
                      x: unreadValue.get(),
                      transitionEnd: {
                        transform:
                          document.activeElement.textContent === "Unreads"
                            ? "none"
                            : "",
                      },
                    };
                  }}
                  exit={() => {
                    if (document.activeElement.textContent === "For You") {
                      unreadValue.set("120%");
                    } else if (
                      document.activeElement.textContent === "Mentions"
                    ) {
                      unreadValue.set("-120%");
                    } else {
                      unreadValue.set("0%");
                    }

                    return {
                      x: unreadValue.get(),
                    };
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 163,
                    damping: 20,
                  }}
                >
                  <Unread isChat={isChat} randomUsers={randomUsers} />
                </motion.div>
              ) : undefined}
              {isActive === "Unreads" ? (
                <motion.div
                  key="UnreadsNotFound"
                  initial={() => {
                    return { x: unreadValue.get() };
                  }}
                  animate={() => {
                    if (unreadValue.get() !== "0%") {
                      unreadValue.set("0%");
                    }
                    mentionsValue.set("100%");
                    forYouValue.set("-100%");

                    return {
                      x: unreadValue.get(),
                      transitionEnd: {
                        transform:
                          document.activeElement.textContent !== "Unreads"
                            ? ""
                            : "none",
                      },
                    };
                  }}
                  exit={() => {
                    if (document.activeElement.textContent === "For You") {
                      unreadValue.set("120%");
                    } else if (
                      document.activeElement.textContent === "Mentions"
                    ) {
                      unreadValue.set("-120%");
                    } else {
                      unreadValue.set("0%");
                    }
                    return {
                      x: unreadValue.get(),
                    };
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 163,
                    damping: 20,
                  }}
                  className="h-full"
                >
                  {isNotFoundAnimate ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.25 }}
                      className="h-full"
                    >
                      <NotFound
                        key={isShowUnRead}
                        icon={InboxIcon}
                        primaryText={" You're all caught up!"}
                        secondaryText={`Open
              the Inbox by pressing CTRL+I, and mark your top message as read with
              CTRL+Shift+E`}
                      />
                    </motion.div>
                  ) : (
                    <NotFound
                      key={isShowUnRead}
                      icon={InboxIcon}
                      primaryText={" You're all caught up!"}
                      secondaryText={`Open
              the Inbox by pressing CTRL+I, and mark your top message as read with
              CTRL+Shift+E`}
                    />
                  )}
                </motion.div>
              ) : undefined}

              {isActive === "Mentions" ? (
                <motion.div
                  initial={() => {
                    return { x: mentionsValue.get() };
                  }}
                  key="Mentions"
                  animate={() => {
                    if (mentionsValue.get() !== "0%") {
                      mentionsValue.set("0%");
                    }
                    unreadValue.set("-100%");
                    forYouValue.set("-200%");

                    return { x: mentionsValue.get() };
                  }}
                  exit={() => {
                    mentionsValue.set("120%");

                    return { x: mentionsValue.get() };
                  }}
                  transition={{ type: "spring", stiffness: 163, damping: 20 }}
                  className="h-full"
                >
                  <NotFound
                    icon={AtTheRateIcon}
                    primaryText={`You made it through everything!`}
                    secondaryText={`Whenever someone mentions you it will be saved here for 7 days`}
                  />
                </motion.div>
              ) : undefined}
            </AnimatePresence>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

export default InboxPopUp;

function ForYouNotFound({ icon: Icon, mainText, subText }) {
  return (
    <>
      <div
        className={`flex flex-col h-full items-center text-theme-SteelGray-500 justify-center`}
      >
        <Icon className="h-[11rem] w-[16rem]" />
        <p className="text-center text-lg font-bold text-white">{mainText}</p>
        <p className="text-center">{subText}</p>
      </div>
    </>
  );
}

function NotFound({ icon: Icon, primaryText, secondaryText }) {
  return (
    <>
      <div
        className={`flex flex-col h-full items-center text-theme-SteelGray-500 justify-center`}
      >
        <div className="relative grid place-content-center mb-4">
          <StartsBGIcon className="h-[80px] w-[104px]" />
          <div className="absolute top-[calc(50%-40px)] left-[calc(50%-40px)] h-[80px] w-[80px] grid place-content-center rounded-full bg-theme-Driftwood-grey-light">
            <Icon className="h-[36px] w-[36px]" />
          </div>
        </div>
        <p className="text-center text-2xl font-semibold text-white mt-1">
          {primaryText}
        </p>
        <p className="text-center text-xs text-theme-SteelGray-light ">
          <span className="text-theme-Teal-600 font-bold">PROTIP:</span>{" "}
          {secondaryText}
        </p>
      </div>
    </>
  );
}
