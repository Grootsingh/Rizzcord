"use client";
import React from "react";
import ChatMessage from "./ChatMessage";
import { motion } from "framer-motion";

function MessageCard({ date, chatMessages, ...delegated }) {
  return (
    <motion.div>
      <div className="h-[1px] my-7 flex justify-center items-center bg-theme-Smoke-700">
        <span className="text-center border-x-4 border-theme-Driftwood-grey-light  font-semibold text-theme-SteelGray-500 text-xs">
          {date}
        </span>
      </div>
      <div className="flex flex-col gap-3 overflow-anywhere">
        {chatMessages.map(
          ({
            timeStamp,
            chatId,
            sender,
            message,
            isReplyTo = {},
            editstatus = false,
          }) => (
            <ChatMessage
              timeStamp={timeStamp}
              key={chatId}
              sender={sender}
              message={message}
              isReplyTo={isReplyTo}
              editstatus={editstatus}
              chatId={chatId}
              {...delegated}
            />
          )
        )}
      </div>
    </motion.div>
  );
}

export default MessageCard;
