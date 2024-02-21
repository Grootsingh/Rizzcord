"use client";
import React from "react";
import {
  ArrowDownIcon,
  AtTheRateIcon,
  CheckBoxIcon,
  BellIcon,
  TickIcon,
} from "@/Icons";
import ToolTip from "@/components/ToolTip";
import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { MuteUser } from "@/Constant";
import usePosition from "@/Hooks/usePosition";
export default function Unread({ isChat, randomUsers }) {
  return (
    <>
      {randomUsers.map((userInfo, index) => {
        return (
          <UnreadCard
            key={index}
            userInfo={userInfo}
            chatMessages={isChat[index]}
          />
        );
      })}
    </>
  );
}

function UnreadCard({ userInfo, chatMessages }) {
  const [isOpen, setIsOpen] = React.useState(true);
  const [isMarkAsRead, setIsMarkAsRead] = React.useState(true);

  function flipTheOpen() {
    setIsOpen((curr) => !curr);
  }
  function flipMarkAsRead() {
    setIsMarkAsRead((curr) => !curr);
  }

  return (
    <AnimatePresence>
      <motion.div
        animate={{
          height: isMarkAsRead ? "auto" : "0",
          transition: {
            height: { type: "spring", damping: 18.5, stiffness: 104 },
          },
        }}
        className={` ${isOpen && isMarkAsRead ? "pb-4" : ""} ${
          isMarkAsRead ? "" : "overflow-hidden"
        }  w-full flex flex-col `}
      >
        <StickyHeader
          flipTheOpen={flipTheOpen}
          isOpen={isOpen}
          flipMarkAsRead={flipMarkAsRead}
          userInfo={userInfo}
          chatMessages={chatMessages}
        />

        <motion.div
          animate={{
            height: isOpen ? "auto" : "0",
            transition: {
              height: { type: "spring", damping: 18.5, stiffness: 104 },
            },
          }}
          className="overflow-hidden"
        >
          <div className={` h-4 bg-theme-Driftwood-grey-light rounded-t`} />
          <div className="w-full flex flex-col gap-4 rounded-b p-4 bg-theme-Driftwood-grey-light">
            {chatMessages.map((chatData, index) => (
              <MessageCard
                key={index}
                chatData={chatData}
                username={userInfo[1]}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function StickyHeader({
  flipTheOpen,
  isOpen,
  flipMarkAsRead,
  userInfo,
  chatMessages,
}) {
  const [isBellActive, setIsBellActive] = React.useState(false);
  const [image, username] = userInfo;

  const BellRef = React.useRef();
  function BellIsNotActiveFn() {
    setIsBellActive(false);
  }

  return (
    <div className="sticky flex items-center top-0 w-full h-16 bg-theme-CharcoalGray-800">
      <ToolTip direction={"Up"} text={"Collapse"}>
        <div onClick={() => flipTheOpen()} className="flex items-center">
          <ArrowDownIcon
            className={`${
              isOpen ? "" : "rotate-[270deg]"
            } h-4 w-4 text-theme-SteelGray-light hover:text-white cursor-pointer `}
          />
        </div>
      </ToolTip>
      <div className=" py-3 flex items-center w-full justify-between ml-1">
        <div className="group flex items-center gap-2">
          <Image
            src={image}
            alt={username}
            height={40}
            width={40}
            className={`h-[40px] w-[40px] rounded-2xl `}
          />
          <div className="flex items-center">
            <AtTheRateIcon className="text-white h-[18px] w-[18px] " />
            <p className="text-white group-hover:underline text-base font-medium  ">
              {username}
            </p>
          </div>
          <div className="h-[18px] w-[18px] grid place-content-center rounded-full bg-theme-Red-400">
            <span className="text-white text-xs">
              {chatMessages[0].chatMessages.length +
                chatMessages[1].chatMessages.length}
            </span>
          </div>
        </div>
        <div className="flex items-center  gap-3">
          <ToolTip direction={"Up"} text={"Notification Settings"}>
            <div
              onClick={() => setIsBellActive((curr) => !curr)}
              ref={BellRef}
              className="group bg-theme-DarkGray-900 h-8 w-8 rounded-full grid place-content-center"
            >
              <BellIcon className="h-4 w-4 text-theme-SteelGray-light group-hover:text-white cursor-pointer" />
            </div>
          </ToolTip>

          <AnimatePresence>
            {isBellActive ? (
              <NotificationPopUp
                BellRef={BellRef}
                isBellActive={isBellActive}
                BellIsNotActiveFn={BellIsNotActiveFn}
              />
            ) : undefined}
          </AnimatePresence>

          <ToolTip direction={"Up"} text={"Mark as read"}>
            <div
              onClick={() => flipMarkAsRead()}
              className="group bg-theme-DarkGray-900 h-8 w-8 rounded-full grid place-content-center"
            >
              <TickIcon className="h-4 w-4 text-theme-SteelGray-light group-hover:text-white cursor-pointer" />
            </div>
          </ToolTip>
        </div>
      </div>
    </div>
  );
}

function MessageCard({ chatData, username }) {
  const { date, chatMessages } = chatData;
  return (
    <div>
      <div className="h-[1px] mb-4 flex justify-center items-center bg-theme-Smoke-700">
        <span className="text-center border-x-4 border-theme-Driftwood-grey-light  font-semibold text-theme-SteelGray-400 text-xs">
          {date}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {chatMessages.map((messageInfo, index) => (
          <Message key={index} messageInfo={messageInfo} username={username} />
        ))}
      </div>
    </div>
  );
}
function Message({ messageInfo, username }) {
  const { message, timestamp } = messageInfo;
  return (
    <div className="flex items-baseline gap-1">
      <p className="text-theme-SteelGray-400 shrink-0 text-xs font-semibold">
        {timestamp}
      </p>

      <p className="text-theme-LightGray-300 leading-5">
        <span className="text-theme-Smoke-800 font-medium mr-2">
          {username}
        </span>
        {message}
      </p>
    </div>
  );
}

function NotificationPopUp({ BellRef, isBellActive, BellIsNotActiveFn }) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [top, left] = usePosition(BellRef, isBellActive);

  function Visible() {
    setIsVisible(true);
  }
  function InVisible() {
    setIsVisible(false);
  }

  return (
    <>
      <Dialog
        static={true}
        as={motion.div}
        key="NotificationPopUp"
        className={"fixed w-[188px] z-[2]"}
        initial={{
          clipPath: "circle(0% at 100% 0%)",
        }}
        animate={{
          clipPath: "circle(250% at 100% 0)",
          transition: { type: "tween", ease: "circOut" },
        }}
        exit={{
          clipPath: "circle(0% at 100% 0)",
          transition: { type: "tween", ease: "circIn" },
        }}
        style={{
          top: `${top}px`,
          left: `${left}px`,
          translate: `-83% 20%`,
        }}
        open={isBellActive}
        onClose={() => BellIsNotActiveFn()}
      >
        <Dialog.Panel>
          <div className="border-left-[20px] border-">
            <div
              onMouseLeave={InVisible}
              className={` border border-l-[10px] border-transparent `}
            >
              <div className="rounded p-2 bg-theme-DarkGray-900">
                <div
                  onMouseOver={() => Visible()}
                  className={`h-8 w-full my-[2px] hover:text-white px-2 hover:bg-theme-Brand flex rounded items-center justify-between text-sm font-medium text-theme-SteelGray-light`}
                >
                  <span>
                    Mute <strong className="font-medium">@Lilli</strong>
                  </span>
                  <ArrowDownIcon className="h-4 w-4 rotate-[270deg]" />
                </div>
                <div className="h-[1px] bg-theme-Graphite-700" />
                <div onMouseEnter={InVisible}>
                  <RadioBtns />
                </div>
                <AnimatePresence>
                  {isVisible ? <MuteOption /> : undefined}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}

function RadioBtns() {
  const [isSelected, setIsSelected] = React.useState("Use Server Default");
  return (
    <>
      <Option
        mainText={"Use Server Default"}
        subText={"All Messages"}
        isSelected={isSelected}
        setIsSelected={setIsSelected}
      />
      <Option
        mainText={"All Messages"}
        isSelected={isSelected}
        setIsSelected={setIsSelected}
      />
      <Option
        mainText={"Only @mentions"}
        isSelected={isSelected}
        setIsSelected={setIsSelected}
      />
      <Option
        mainText={"Nothing"}
        isSelected={isSelected}
        setIsSelected={setIsSelected}
      />
    </>
  );
}

function Option({ mainText, subText = "", isSelected, setIsSelected }) {
  return (
    <>
      <div
        onClick={() => {
          setIsSelected(mainText);
        }}
        className={`${
          subText ? "h-[48px]" : "h-[32px]"
        } group  w-full my-[2px] hover:text-white px-2  hover:bg-theme-Brand flex rounded items-center justify-between text-sm font-medium text-theme-SteelGray-light `}
      >
        <div>
          <label htmlFor={mainText}>{mainText}</label>
          {subText ? (
            <label
              htmlFor={mainText}
              className="block text-xs text-theme-SteelGray-400 group-hover:text-white "
            >
              {subText}
            </label>
          ) : undefined}
        </div>
        <div className="grid place-content-center">
          <CheckBoxIcon
            className={`${
              isSelected === mainText ? "text-theme-Brand" : "text-transparent"
            } h-[18px] w-[18px] group-hover:text-white group-hover:outline-white outline-theme-SteelGray-light outline outline-2 rounded-full -outline-offset-[3px]`}
          />

          <input
            type="radio"
            name="Select Mute Option"
            id={mainText}
            value={mainText}
            className="appearance-none"
            checked={isSelected === mainText}
            onChange={(event) => {
              setIsSelected(event.target.value);
            }}
          />
        </div>
      </div>
    </>
  );
}

function MuteOption() {
  return (
    <motion.div
      initial={{ x: "100%", height: "52px", scale: 0.5 }}
      animate={{
        x: "0%",
        height: "auto",
        scale: 1,
        transition: {
          height: {
            delay: 0.4,
          },
          x: {
            type: "spring",
            stiffness: 163,
            damping: 18,
            bounce: 0.1,
            restDelta: 0.01,
          },
        },
      }}
      exit={{
        x: "80%",
        scale: 0,
        height: "52px",
        transition: { x: { delay: 0.4 }, scale: { delay: 0.5 } },
      }}
      className="absolute w-[188px] overflow-hidden -z-[1] top-4 right-[172px] border border-r-[10px] border-transparent   "
    >
      <motion.div
        layout="position"
        className=" rounded p-2 bg-theme-DarkGray-900"
      >
        {MuteUser.map((mute, index) => (
          <div
            key={index}
            className="h-8 w-full my-[2px] hover:text-white px-2  hover:bg-theme-Brand flex rounded items-center justify-between text-sm font-medium text-theme-SteelGray-light"
          >
            <p>{mute}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
