"use client";
import React from "react";
import { motion } from "framer-motion";
import EditBox from "./EditBox";
import {
  SmilyWithEyesClosedEmoji,
  SmilyWithEyesClosedEmojiV2,
  SmilyWithEyesOpenEmoji,
  SmilyWithGlassesEmoji,
  SmilyWithHeartKissEmoji,
  WinkSmilyEmoji,
  BlessedSmilyEmoji,
} from "@/DiscordEmoji";

function EditMessage({
  initalText,
  isNotActiveFn,
  replaceMessage,
  chatId,
  dateId,
}) {
  const [isColored, setIsColored] = React.useState(false);
  const [Emoji, setEmoji] = React.useState(() => SmilyEmoji[2]);
  const count = React.useRef(0);
  React.useEffect(() => {
    if (isColored) {
      setEmoji(() => SmilyEmoji[count.current % SmilyEmoji.length]);
      count.current += 1;
    }
  }, [isColored]);
  return (
    <motion.div layout={"position"} className="my-2">
      <div className="min-w-[325px] flex items-center h-[44px] px-3 gap-4 text-theme-SteelGray-light left-0 right-0 bottom-6 rounded-lg bg-theme-Smoke-750">
        <EditBox
          initalText={initalText}
          isNotActiveFn={isNotActiveFn}
          replaceMessage={replaceMessage}
          chatId={chatId}
          dateId={dateId}
        />
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
      <div className="flex text-xs pt-2 px-3 gap-1 text-theme-LightGray-300">
        <p>
          escape to <span className="text-theme-Forest-900">cancel</span>
        </p>
        <p>.</p>
        <p>
          delete to{" "}
          <span className="text-theme-Forest-900">remove all text</span>
        </p>
        <p>.</p>
        <p>
          enter to <span className="text-theme-Forest-900">save</span>
        </p>
      </div>
    </motion.div>
  );
}

export default EditMessage;

const SmilyEmoji = [
  SmilyWithEyesClosedEmoji,
  SmilyWithEyesClosedEmojiV2,
  SmilyWithEyesOpenEmoji,
  SmilyWithGlassesEmoji,
  SmilyWithHeartKissEmoji,
  WinkSmilyEmoji,
  BlessedSmilyEmoji,
];
