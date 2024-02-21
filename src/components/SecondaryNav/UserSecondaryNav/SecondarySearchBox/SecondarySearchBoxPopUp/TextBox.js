"use client";
import React from "react";
import { selectedBtn } from "@/components/RootRecoilProvider/RecoilStates";
import { useSetRecoilState } from "recoil";

function TextBox({
  searchFilter,
  isClose,
  isKeyMatch,
  updateKeyMatch,
  isVisibleUsers,
  scrollElementRef,
  updateSearchFocus,
}) {
  const [isInput, setIsInput] = React.useState("");
  const [isScrollGap, setIsScrollGap] = React.useState(0);
  const selectButton = useSetRecoilState(selectedBtn);
  const inputref = React.useRef();
  React.useEffect(() => {
    searchFilter(isInput);
  }, [isInput]);

  React.useEffect(() => {
    inputref.current.focus();
    updateSearchFocus(true);
  }, []);

  function keyboardHandler(event) {
    if (isInput.length > 0 && event.key === "Delete") {
      setIsInput("");
    }

    if (event.key === "ArrowUp") {
      if (isKeyMatch > 0) {
        updateKeyMatch("decrease");
        if (isKeyMatch === isScrollGap) {
          scrollElementRef.current.scrollTop =
            scrollElementRef.current.scrollTop - 34 / 2;
        } else if (isKeyMatch < isScrollGap) {
          scrollElementRef.current.scrollTop =
            scrollElementRef.current.scrollTop - 34;
        }
      }
      event.preventDefault();
    }
    if (event.key === "ArrowDown") {
      if (isKeyMatch < isVisibleUsers.length - 1) {
        updateKeyMatch("increase");
        if (isKeyMatch - 2 === 1) {
          scrollElementRef.current.scrollTop = 34 / 2;
        } else if (isKeyMatch - 2 > 1) {
          scrollElementRef.current.scrollTop =
            scrollElementRef.current.scrollTop + 34;
        }
        setIsScrollGap(isKeyMatch - 2);
      }
      event.preventDefault();
    }
    if (event.key === "Enter") {
      const username = isVisibleUsers[isKeyMatch].username;
      isClose();
      selectButton(username);
      const element = document.getElementById(username);
      element.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  }

  return (
    <>
      <label htmlFor="SearchForUser" className="sr-only">
        Search
      </label>

      <input
        type="text"
        name="Search"
        placeholder="Where would you like to go?"
        id="SearchForUser"
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
        className="h-[70px] w-full bg-theme text-xl bg-theme-DarkGray-900 rounded-lg outline-none px-3 text-theme-CharcoalGray-600 "
      />
    </>
  );
}

export default TextBox;
