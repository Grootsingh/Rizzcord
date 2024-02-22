"use client";
import React from "react";
import { selectedBtn } from "@/components/RootRecoilProvider/RecoilStates";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { users } from "@/UserData";
import { filterUser, randomDigit } from "@/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import FooterTextBox from "./FooterTextBox";
import MessageCard from "./MessageCard";

import GenerateChat from "@/Helper/GenerateChat";
import { format } from "date-fns";
import { produce } from "immer";
import { isReplyToMessage } from "@/components/RootRecoilProvider/RecoilStates";
import { differentChatOption } from "@/Constant";

function SelectedUserMain() {
  const [showSetting, setShowSetting] = React.useState(false);
  const [isChat, setIsChat] = React.useState(() => {
    let randomChat = randomDigit(0, differentChatOption.length - 1);
    let data = GenerateChat(differentChatOption[randomChat]);

    while (data.at(-1).chatMessages.length === 0) {
      data = GenerateChat(differentChatOption[randomChat]);
    }

    return data;
  });
  const [isReplyActive, setIsReplyActive] = React.useState(false);
  const scrollDivRef = React.useRef();
  const footTextBoxRef = React.useRef();
  const [showReplyDiv, setShowReplyDiv] = React.useState(false);
  const setIsReplyTo = useSetRecoilState(isReplyToMessage);
  const selectedUserName = useRecoilValue(selectedBtn);
  function CloseReply() {
    setIsReplyActive(false);
    setIsReplyTo({});
  }
  function OpenReply() {
    setIsReplyActive(true);
  }
  function updateSetting(text) {
    setShowSetting(text);
  }
  function showRepliedElement(elementId) {
    setShowReplyDiv(elementId);
  }

  React.useEffect(() => {
    if (!showReplyDiv) return;
    function keyboardHandler(event) {
      if (event.code === "Escape") {
        setShowReplyDiv(false);
      }
    }

    document.addEventListener("keydown", keyboardHandler);
    return () => {
      document.removeEventListener("keydown", keyboardHandler);
    };
  }, [showReplyDiv]);

  React.useEffect(() => {
    const randomChat = randomDigit(0, differentChatOption.length - 1);
    let data = GenerateChat(differentChatOption[randomChat]);
    while (data.at(-1).chatMessages.length === 0) {
      data = GenerateChat(differentChatOption[randomChat]);
    }

    setIsChat(data);
  }, [selectedUserName]);

  React.useEffect(() => {
    if (isReplyActive) return;
    function handleClick(event) {
      const msgArr = [...document.querySelectorAll("#popup")];
      const trueArr = msgArr.filter((each) => each?.contains(event.target))[0];
      if (
        !(
          trueArr?.contains(event.target) ||
          document.getElementById("morepopup")?.contains(event.target) ||
          document.getElementById("viewMore")?.contains(event.target) ||
          document.getElementById("nocommand")?.contains(event.target)
        )
      ) {
        updateSetting(false);
      }
    }

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isReplyActive]);

  React.useEffect(() => {
    if (!showReplyDiv) return;
    function handleClick(event) {
      if (!footTextBoxRef.current?.contains(event.target)) {
        showRepliedElement(false);
      }
    }

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [showReplyDiv]);

  if (selectedUserName === "Friends") return <div></div>;

  const { username, image } = filterUser(users, "username", selectedUserName);

  function addNewMessage(directMessage, isReplyTo = {}) {
    console.log(isChat);
    setIsChat(
      produce((draft) => {
        const chatmessage = draft.at(-1).chatMessages;
        let lastchatId = chatmessage.at(-1).chatId + 1;
        chatmessage.push({
          timeStamp: format(Date.now(), "h:mm aa"),
          chatId: lastchatId,
          sender: "Me",
          message: directMessage,
          isReplyTo,
        });
      })
    );
  }
  function replaceMessage(newMessage, providedChatId, providedDateId) {
    setIsChat(
      produce((draft) => {
        const findChatMessageIndex = draft[
          providedDateId - 1
        ].chatMessages.findIndex(({ chatId }) => chatId === providedChatId);

        const chatObject =
          draft[providedDateId - 1].chatMessages[findChatMessageIndex];
        if (newMessage.length > 0) {
          chatObject.message = newMessage;
          chatObject.editstatus = true;
        } else {
          draft[providedDateId - 1].chatMessages.splice(
            findChatMessageIndex,
            1
          );
        }
      })
    );
  }

  return (
    <>
      <div
        ref={scrollDivRef}
        className="overflow-y-scroll overflow-x-hidden outline-none h-[calc(100vh-120px)] scrollbar-big"
      >
        <div className=" flex flex-col min-w-[578px]  h-[246px] p-4  gap-2 ">
          <Image
            height={80}
            width={80}
            src={image}
            alt={username}
            priority={true}
            as="image"
            style={{ filter: "drop-shadow(0 0 2px hsl(0deg 0% 0%/0.25))" }}
            className="h-[80px] w-[80px] rounded-full"
          />

          <h1 className="text-[32px] font-extrabold leading-10 text-theme-Slate-400">
            {username}
          </h1>
          <h2 className="text-2xl font-medium text-theme-Slate-400">
            {username.toLowerCase()}
          </h2>
          <p className="my-2 text-theme-SteelGray-light">
            This is the beginning of your direct message history with{" "}
            <strong>{username}</strong>.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-sm text-theme-SteelGray-light">
              No servers in common
            </p>
            <div className="bg-theme-Gray-950 h-1 w-1 rounded-full" />
            <div className="flex items-center gap-2">
              <button className="text-sm text-theme-White-100 bg-theme-Graphite-700 py-[2px] px-4 font-medium hover:bg-theme-Graphite-760 rounded ">
                Remove Friend
              </button>
              <button className="text-sm text-theme-White-100 bg-theme-Graphite-700 py-[2px] px-4 font-medium hover:bg-theme-Graphite-760 rounded ">
                Block
              </button>
            </div>
          </div>
        </div>
        <motion.div
          layout={showSetting}
          className="flex flex-col p-7 min-w-[412px] -mt-4 pr-12 overflow-hidden"
        >
          {isChat.map(({ date, chatMessages, dateId }) => (
            <MessageCard
              key={dateId}
              showSetting={showSetting}
              updateSetting={updateSetting}
              isReplyActive={isReplyActive}
              OpenReply={OpenReply}
              date={date}
              dateId={dateId}
              chatMessages={chatMessages}
              username={username}
              showReplyDiv={showReplyDiv}
              showRepliedElement={showRepliedElement}
              replaceMessage={replaceMessage}
            />
          ))}
        </motion.div>
      </div>
      {scrollDivRef.current && (
        <div ref={footTextBoxRef}>
          <FooterTextBox
            isReplyActive={isReplyActive}
            CloseReply={CloseReply}
            username={username}
            addNewMessage={addNewMessage}
            scrollDivRef={scrollDivRef}
          />
        </div>
      )}
    </>
  );
}

export default SelectedUserMain;
