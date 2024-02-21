"use client";
import React from "react";

function EditBox({
  initalText = "",
  isNotActiveFn,
  replaceMessage,
  dateId,
  chatId,
}) {
  const [text, setText] = React.useState(initalText);
  const inputRef = React.useRef();

  function handleKeyboard(event) {
    if (event.code === "Escape") {
      isNotActiveFn();
      setText("");
    }
    if (event.code === "Delete") {
      setText("");
    }
  }

  function submitHandler(event) {
    event.preventDefault();
    replaceMessage(text, chatId, dateId);
    isNotActiveFn();
  }
  return (
    <>
      <form onSubmit={submitHandler} className="grow">
        <label htmlFor="Message" className="sr-only">
          Edit Message
        </label>
        <input
          id="Message"
          onKeyDown={handleKeyboard}
          autoComplete="off"
          ref={inputRef}
          value={text}
          autoFocus={true}
          className="bg-theme-Smoke-750 font-medium w-full  outline-none"
          onChange={(event) => {
            setText(event.target.value);
          }}
        />
      </form>
    </>
  );
}

export default EditBox;
