"use client";
import React from "react";
import { CloseIcon } from "@/Icons";
function DMSearchBox({
  selectedUsers,
  updateDMList,
  searchFilter,
  isDMList,
  isKeyMatch,
  updateKeyMatch,
  isVisibleUsers,
  scrollElementRef,
  updateSearchFocus,
}) {
  const [isInput, setIsInput] = React.useState("");
  const [isScrollGap, setIsScrollGap] = React.useState(0);

  const inputref = React.useRef();
  React.useEffect(() => {
    searchFilter(isInput);
  }, [isInput]);

  React.useEffect(() => {
    setIsInput("");
  }, [isDMList]);

  React.useEffect(() => {
    inputref.current.focus();
    updateSearchFocus(true);
  }, []);

  React.useEffect(() => {
    function handleDocumentKeyPress(event) {
      if (
        document.activeElement === scrollElementRef.current &&
        (event.key === "Backspace" || event.key === "Delete")
      ) {
        updateDMList(false, selectedUsers.at(-1));
      }
    }

    document.addEventListener("keydown", handleDocumentKeyPress);
    return () =>
      document.removeEventListener("keydown", handleDocumentKeyPress);
  }, [isInput, scrollElementRef, selectedUsers, updateDMList]);

  function keyboardHandler(event) {
    if (isInput.length > 0 && event.key === "Delete") {
      setIsInput("");
    } else if (
      (isInput.length === 0 && event.key === "Backspace") ||
      event.key === "Delete"
    ) {
      updateDMList(false, selectedUsers.at(-1));
    }

    if (event.key === "ArrowUp") {
      if (isKeyMatch > 0) {
        updateKeyMatch("decrease");
        if (isKeyMatch === isScrollGap) {
          scrollElementRef.current.scrollTop =
            scrollElementRef.current.scrollTop - 42 / 2;
        } else if (isKeyMatch < isScrollGap) {
          scrollElementRef.current.scrollTop =
            scrollElementRef.current.scrollTop - 42;
        }
      }
      event.preventDefault();
    }
    if (event.key === "ArrowDown") {
      if (isKeyMatch < isVisibleUsers.length - 1) {
        updateKeyMatch("increase");
        if (isKeyMatch - 2 === 1) {
          scrollElementRef.current.scrollTop = 42 / 2;
        } else if (isKeyMatch - 2 > 1) {
          scrollElementRef.current.scrollTop =
            scrollElementRef.current.scrollTop + 42;
        }
        setIsScrollGap(isKeyMatch - 2);
      }
      event.preventDefault();
    }
    if (event.key === "Enter") {
      const username = isVisibleUsers[isKeyMatch].username;
      updateDMList(!Boolean(isDMList.get(username)), username);
    }
  }

  return (
    <div className=" w-full mt-[20px] rounded flex items-center flex-wrap text-theme-SteelGray-500 bg-theme-DarkGray-900">
      {selectedUsers.length > 0
        ? selectedUsers.map((eachUser, index) => (
            <div
              key={index}
              onClick={() => {
                updateDMList(false, eachUser);
              }}
              className="h-[30px] gap-1 cursor-pointer hover:bg-theme-DarkGray-700 rounded text-theme-Slate-400 bg-theme-Driftwood-grey-light flex items-center m-[1px] px-2 "
            >
              <p>{eachUser}</p>
              <CloseIcon className="h-3 w-3" />
            </div>
          ))
        : undefined}
      <label htmlFor="Search" className="sr-only">
        Search
      </label>
      <div className="relative flex items-center grow ">
        <input
          type="text"
          name="Search"
          placeholder="Type the username of a friend"
          id="Search"
          size={1}
          autoComplete="off"
          ref={inputref}
          value={isInput}
          onChange={(event) => setIsInput(event.target.value)}
          onFocus={() => {
            updateKeyMatch("init");
            updateSearchFocus(true);
          }}
          onBlur={() => {
            updateKeyMatch("un-init");
            updateSearchFocus(false);
          }}
          onKeyDown={(event) => {
            keyboardHandler(event);
          }}
          className=" bg-theme-DarkGray-900  outline-none  min-w-0 rounded grow h-[34px] px-2 "
        />
      </div>
    </div>
  );
}

export default DMSearchBox;
