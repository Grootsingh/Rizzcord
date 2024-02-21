"use client";
import React from "react";
import {
  ReplyIcon,
  SmileEmojiIcon,
  TrippledotIcon,
  ArrowLeftCurveIcon,
  EditIcon,
} from "@/Icons";
import ToolTip from "@/components/ToolTip";
import EditMessage from "./EditMessage";
import MorePopUp from "./MorePopUp";
import usePosition from "@/Hooks/usePosition";
import { useSetRecoilState } from "recoil";
import { isReplyToMessage } from "@/components/RootRecoilProvider/RecoilStates";
import { classNames } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";

function ChatMessage({
  showSetting,
  updateSetting,
  isReplyActive,
  OpenReply,
  timeStamp,
  sender,
  message,
  username,
  isReplyTo,
  showRepliedElement,
  showReplyDiv,
  editstatus,
  replaceMessage,
  chatId,
  dateId,
}) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);

  const setIsReplyTo = useSetRecoilState(isReplyToMessage);
  const instanceID = React.useId();
  const PopUpRef = React.useRef();
  const position = usePosition(PopUpRef, isVisible);

  React.useEffect(() => {
    if (showSetting !== instanceID) {
      setIsActive(false);
      isNotVisibleFn();
    }
  }, [showSetting, instanceID]);
  React.useEffect(() => {
    if (!isReplyActive && isActive === "arrow") {
      updateSetting(false);
    }
  }, [isReplyActive, updateSetting, isActive]);

  function isNotVisibleFn() {
    setIsVisible(false);
  }
  function isNotActiveFn() {
    setIsActive(false);
  }

  return (
    <motion.div
      layout={true}
      transition={{ type: "spring", bounce: 0.3 }}
      className={classNames(
        (isActive === "smily" || isActive === "dot" || isActive === "edit") &&
          `bg-theme-Driftwood-grey-300 py-2 -my-2`,
        (isActive === "arrow" || instanceID === showReplyDiv) &&
          `bg-theme-Graphite-755  hover:bg-theme-Graphite-755 border-l-4 border-theme-Brand py-2 -my-2 pl-[1.5rem]`,
        isActive !== "arrow" && instanceID !== showReplyDiv && "pl-[1.75rem]",
        !isReplyActive && "hover:bg-theme-Driftwood-grey-300",
        "relative group flex flex-col hover:py-2 hover:-my-2 pr-[3.75rem] -ml-7 -mr-[3.75rem] "
      )}
    >
      {"message" in isReplyTo ? (
        <motion.div layout={"position"} className="flex items-center gap-1 h-5">
          <div className="shrink-0 h-3 w-9 ml-4 self-end border-t-2 border-l-2 border-theme-Graphite-700 rounded-tl-md" />
          <div className="shrink-0 h-4 w-5 grid place-content-center rounded-[50%] bg-theme-DarkGray-900">
            <ReplyIcon className="shrink-0 h-2 w-3 text-theme-SteelGray-light" />
          </div>
          <p className="whitespace-nowrap hover:underline text-theme-Gray-650 font-semibold text-sm">{`@${username}`}</p>
          <p
            onClick={() => showRepliedElement(isReplyTo.elementId)}
            className=" text-theme-Gray-650 hover:text-theme-Slate-400 text-ellipsis whitespace-nowrap overflow-hidden max-w-max text-sm"
          >
            {isReplyTo.message}
          </p>
        </motion.div>
      ) : undefined}
      <motion.div layout={"position"} className="flex items-baseline gap-1">
        <p className="text-theme-SteelGray-500 shrink-0 text-xs font-semibold">
          {timeStamp}
        </p>

        <div
          className={classNames(
            isActive === "edit" && "grow",
            `text-theme-LightGray-300 leading-5 relative`
          )}
        >
          <span className="text-theme-Smoke-800 font-medium mr-2 hover:underline whitespace-nowrap">
            {sender === "You" ? username : "Rajat Singh"}
          </span>
          <AnimatePresence mode={"popLayout"}>
            {isActive === "edit" ? (
              <motion.div
                key={"exit"}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { opacity: { delay: 0.4 } },
                }}
                exit={{ opacity: 1 }}
              >
                <EditMessage
                  initalText={message}
                  isNotActiveFn={isNotActiveFn}
                  replaceMessage={replaceMessage}
                  chatId={chatId}
                  dateId={dateId}
                />
              </motion.div>
            ) : (
              <motion.span
                key={"message"}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { opacity: { delay: 0.4 } },
                }}
                exit={{ opacity: 1 }}
              >
                <span>{message}</span>{" "}
                <span
                  className={`${
                    editstatus === true
                      ? "inline text-xs text-theme-SteelGray-500"
                      : "hidden"
                  }`}
                >{`(edited)`}</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      <motion.div
        layout={"position"}
        id={"popup"}
        ref={PopUpRef}
        className={classNames(
          `absolute  right-9  rounded  shadow-[0_0_2px_black] text-theme-SteelGray-light bg-theme-Driftwood-grey-light`,
          !isActive && "hidden group-hover:-top-6  -top-8 ",
          isActive && "flex -top-6",
          showSetting !== instanceID && isReplyActive
            ? "hidden"
            : "group-hover:flex"
        )}
      >
        <ToolTip direction={"Up"} text={"Add Reaction"}>
          <div
            onClick={() => {
              setIsActive("smily");
              updateSetting(instanceID);
            }}
            className={`${
              isActive === "smily"
                ? "bg-theme-Driftwood-grey-Extra-light text-theme-White-100"
                : ""
            } hover:bg-theme-Driftwood-grey-Extra-light rounded hover:text-theme-White-100 flex items-center justify-center h-8 w-8`}
          >
            <SmileEmojiIcon className="h-[20px] w-[20px] " />
          </div>
        </ToolTip>
        {sender === "You" ? (
          <ToolTip direction={"Up"} text={"Reply"}>
            <div
              onClick={() => {
                setIsActive("arrow");
                updateSetting(instanceID);
                OpenReply();
                setIsReplyTo({ message, elementId: instanceID });
              }}
              className={`${
                isActive === "arrow"
                  ? "bg-theme-Driftwood-grey-Extra-light text-theme-White-100"
                  : ""
              } hover:bg-theme-Driftwood-grey-Extra-light hover:text-theme-White-100 flex items-center justify-center h-8 w-8`}
            >
              <ArrowLeftCurveIcon className="h-[20px] w-[20px] " />
            </div>
          </ToolTip>
        ) : (
          <ToolTip direction={"Up"} text={"Edit"}>
            <div
              onClick={() => {
                setIsActive("edit");
              }}
              className={`${
                isActive === "edit"
                  ? "bg-theme-Driftwood-grey-Extra-light text-theme-White-100"
                  : ""
              } hover:bg-theme-Driftwood-grey-Extra-light hover:text-theme-White-100 flex items-center justify-center h-8 w-8`}
            >
              <EditIcon className="h-[20px] w-[20px] " />
            </div>
          </ToolTip>
        )}
        <ToolTip direction={"Up"} text={"More"}>
          <div
            onClick={() => {
              setIsVisible((curr) => !curr);
              setIsActive("dot");
              updateSetting(instanceID);
            }}
            className={`${
              isActive === "dot"
                ? "bg-theme-Driftwood-grey-Extra-light text-theme-White-100"
                : ""
            } hover:bg-theme-Driftwood-grey-Extra-light rounded hover:text-theme-White-100 flex items-center justify-center h-8 w-8`}
          >
            <TrippledotIcon className="h-[20px] w-[20px] rotate-90 " />
          </div>
        </ToolTip>
        <AnimatePresence>
          {isVisible && position ? (
            <MorePopUp
              position={position}
              isVisible={isVisible}
              isNotVisibleFn={isNotVisibleFn}
            />
          ) : undefined}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default ChatMessage;
