"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  SmilyWithEyesClosedEmoji,
  SmilyWithEyesClosedEmojiV2,
  SmilyWithEyesOpenEmoji,
  SmilyWithGlassesEmoji,
  SmilyWithHeartKissEmoji,
  WinkSmilyEmoji,
  BlessedSmilyEmoji,
} from "@/DiscordEmoji";
import {
  CloseIconWithBg,
  PlusIconWIthBG,
  GiftIcon,
  GIFIcon,
  StickerIcon,
} from "@/Icons";
import InputBox from "./InputBox";

function FooterTextBox({
  CloseReply,
  isReplyActive,
  username,
  addNewMessage,
  scrollDivRef,
}) {
  const [isColored, setIsColored] = React.useState(false);
  const [Emoji, setEmoji] = React.useState(() => SmilyEmoji[2]);
  const count = React.useRef(0);
  React.useEffect(() => {
    if (isColored) {
      setEmoji(() => SmilyEmoji[count.current % SmilyEmoji.length]);
      count.current += 1;
      console.log(count);
    }
  }, [isColored]);

  return (
    <>
      <AnimatePresence>
        {isReplyActive ? (
          <motion.div
            key="replyto"
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            exit={{ y: 30 }}
            transition={{ duration: 1, bounce: 0.5, type: "spring" }}
            className="absolute  flex items-center justify-between  px-3 gap-4 text-theme-SteelGray-light h-[32px] left-0 right-0 mx-4 bottom-16 rounded-tl-lg rounded-tr-lg bg-theme-CharcoalGray-800 text-sm"
          >
            <motion.p>
              Replying to <strong className="font-semibold">{username}</strong>
            </motion.p>
            <button
              onClick={CloseReply}
              className="h-full w-[40px] flex items-center justify-center -mr-3 "
            >
              <CloseIconWithBg className="h-4 w-4" />
            </button>
          </motion.div>
        ) : undefined}
      </AnimatePresence>
      <div className="container-parent-FooterTextBox absolute left-0 right-0 bottom-6">
        <div
          onMouseOut={() => setIsColored(false)}
          className="container-child-Footertext  h-[44px] px-3 gap-4 text-theme-SteelGray-light  mx-4  rounded-lg bg-theme-Smoke-750"
        >
          <PlusIconWIthBG className="h-[24px] container-child-svg-left w-[24px] hover:text-theme-White-100 " />
          <InputBox
            isReplyActive={isReplyActive}
            CloseReply={CloseReply}
            username={username}
            addNewMessage={addNewMessage}
            scrollDivRef={scrollDivRef}
          />

          <GiftIcon className="h-[24px] w-[24px] container-child-svg-right hover:text-theme-White-100 " />
          <GIFIcon className="h-[24px] w-[24px] container-child-svg-right hover:text-theme-White-100 " />
          <StickerIcon className="h-[24px] w-[24px] container-child-svg-right hover:text-theme-White-100 " />
          <div
            onMouseOver={() => setIsColored(true)}
            onMouseOut={() => setIsColored(false)}
          >
            {isColored ? (
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 150, mass: 0.5 }}
              >
                <Emoji className="h-[24px] w-[24px]" />
              </motion.div>
            ) : (
              <motion.div
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 150 }}
              >
                <Emoji
                  front={"hsl(215, 9%, 73%)"}
                  back={"hsl(225, 7%, 24%)"}
                  className="h-[24px] w-[24px]"
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default FooterTextBox;

const SmilyEmoji = [
  SmilyWithEyesClosedEmoji,
  SmilyWithEyesClosedEmojiV2,
  SmilyWithEyesOpenEmoji,
  SmilyWithGlassesEmoji,
  SmilyWithHeartKissEmoji,
  WinkSmilyEmoji,
  BlessedSmilyEmoji,
];
