"use client";
import { isReplyToMessage } from "@/components/RootRecoilProvider/RecoilStates";
import React from "react";
import { useRecoilValue } from "recoil";

function InputBox({
  isReplyActive,
  CloseReply,
  username,
  addNewMessage,
  scrollDivRef,
}) {
  const [text, setText] = React.useState("");
  const inputRef = React.useRef();
  const isReplyTo = useRecoilValue(isReplyToMessage);

  React.useEffect(() => {
    if (isReplyActive) {
      inputRef.current.focus();
    }
  }, [isReplyActive]);

  function handleKeyboard(event) {
    if (event.code === "Escape") {
      CloseReply();
      setText("");
    }
    if (text.length === 0 && event.code === "Delete") {
      CloseReply();
      setText("");
    }
  }

  function Scroll() {
    setTimeout(() => {
      scrollDivRef.current.scrollTo({
        top: scrollDivRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 0);
  }

  function submitHandler(event) {
    event.preventDefault();
    if (text.length > 0) {
      addNewMessage(text, isReplyTo);
      CloseReply();
      setText("");
      Scroll();
    }
  }
  return (
    <>
      <form onSubmit={submitHandler} className="grow">
        <label htmlFor="Message" className="sr-only">
          chat box
        </label>
        <input
          id="Message"
          onKeyDown={handleKeyboard}
          autoComplete="off"
          ref={inputRef}
          value={text}
          className="bg-theme-Smoke-750 font-medium placeholder:text-theme-DarkGray-850 w-full  outline-none"
          placeholder={`Message @${username}`}
          onChange={(event) => {
            setText(event.target.value);
          }}
        />
      </form>
    </>
  );
}

export default InputBox;
