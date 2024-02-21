//--------------------------------------
"use client";
import { SearchIcon, CloseIcon } from "@/Icons";
import React, { useEffect } from "react";
import DatePickerWithRange from "./DatePickerWithRange";
import SearchHelper from "./SearchHelper";
import SearchOptionList from "./SearchOptionList";
import SearchPinned from "./SearchPinned";
import SearchUser from "./SearchUser";
import SearchHas from "./SearchHas";
import useSearchBoxAnimationSequence from "@/Hooks/useSearchBoxAnimationSequence";
import { AnimatePresence, motion } from "framer-motion";

export default function SearchBox() {
  const [isInput, setIsInput] = React.useState("");
  const [growSearchBar, setIsGrowSearchBar] = React.useState(false);
  const [searchBoxIsInFocus, setSearchBoxIsInFocus] = React.useState(false);
  const [datePickerIsInFocus, setDatePickerIsInFocus] = React.useState(false);
  const [isSelected, setIsSelected] = React.useState([]);
  const [isSelectedFromOptionList, setIsSelectedFromOptionList] =
    React.useState([]);
  const [
    SearchBoxControl,
    SearchOptionControl,
    OptionInitalState,
    SearchOptionExitValue,
    delayExitValue,
    isDeleteHistory,
  ] = useSearchBoxAnimationSequence(
    isSelected,
    isInput,
    searchBoxIsInFocus,
    growSearchBar
  );

  function TrueDeleteHistory() {
    isDeleteHistory.current = true;
  }

  const searchBoxRef = React.useRef();
  const FakeFocusIndex = React.useRef(null);
  const DatePickerRef = React.useRef();

  useEffect(() => {
    if (DatePickerRef.current) {
      let isFocus = null;
      function blurHandler(event) {
        if (event.currentTarget.contains(event.relatedTarget)) {
          setDatePickerIsInFocus(true);
        } else {
          setTimeout(() => {
            if (!isFocus) {
              setDatePickerIsInFocus(false);
            }
          }, 200);
        }
        isFocus = false;
      }
      function focusHandler(event) {
        if (event.target) {
          setDatePickerIsInFocus(true);
          isFocus = true;
        }
      }

      DatePickerRef.current?.addEventListener("focusin", focusHandler);
      DatePickerRef.current?.addEventListener("focusout", blurHandler);
      return () => {
        DatePickerRef.current?.removeEventListener("focusin", focusHandler);
        DatePickerRef.current?.removeEventListener("focusout", blurHandler);
      };
    }
  });

  function unFocusHandler() {
    if (isInput.length === 0 && isSelected.length === 0) {
      setTimeout(() => {
        if (document.activeElement !== searchBoxRef.current) {
          setIsGrowSearchBar(false);
        }
      }, 200);
    }

    setTimeout(() => {
      if (document.activeElement !== searchBoxRef.current) {
        setSearchBoxIsInFocus(false);
      }
    }, 200);
  }
  function keyboardHandler(event) {
    if (
      event.code === "Backspace" &&
      isSelected.length > 0 &&
      isInput.length === 0
    ) {
      RemoveLastOption();
    }
    if (event.code === "Delete" && isSelected.length > 0) {
      RemoveLastOption();
    }
    if (event.code === "Enter") {
      const selectedElement = document.querySelector(`[data-active="true"]`);
      if (selectedElement) {
        const getLabel = selectedElement.getAttribute("data-label");
        const labelArr = getLabel.split(",");
        if (labelArr.length < 1) {
          AddNewSelectedOption(getLabel);
        } else {
          AddNewSelectedOption(labelArr);
        }
      }
    }

    if (
      event.code === "ArrowDown" &&
      isSelected[0] !== "before:" &&
      isSelected[0] !== "after:" &&
      isSelected[0] !== "during:" &&
      isInput.length < 3
    ) {
      event.preventDefault();
      let selectOptionsArr = document.querySelector(
        `[datatype="select-option"]`
      ).children;
      selectOptionsArr = [...selectOptionsArr].filter((eachnode) =>
        eachnode.hasAttribute("data-label")
      );

      if (FakeFocusIndex.current == undefined) {
        FakeFocusIndex.current = 0;
      } else if (FakeFocusIndex.current < selectOptionsArr.length - 1) {
        FakeFocusIndex.current += 1;
      } else {
        FakeFocusIndex.current = 0;
      }

      const prevIndex =
        FakeFocusIndex.current === 0
          ? selectOptionsArr.length - 1
          : FakeFocusIndex.current - 1;

      if (selectOptionsArr[prevIndex].hasAttribute("data-active")) {
        selectOptionsArr[prevIndex].removeAttribute("data-active");
      }
      selectOptionsArr[FakeFocusIndex.current].setAttribute(
        "data-active",
        "true"
      );
    }
    if (
      event.code === "ArrowDown" &&
      (isSelected[0] === "before:" ||
        isSelected[0] === "after:" ||
        isSelected[0] === "during:") &&
      isInput.length < 3
    ) {
      event.preventDefault();
      const btn = document.getElementById("1");
      btn?.focus();
    }

    if (
      event.code === "ArrowUp" &&
      isSelected[0] !== "before:" &&
      isSelected[0] !== "after:" &&
      isSelected[0] !== "during:" &&
      isInput.length < 3
    ) {
      event.preventDefault();
      let selectOptionsArr = document.querySelector(
        `[datatype="select-option"]`
      ).children;
      selectOptionsArr = [...selectOptionsArr].filter((eachnode) =>
        eachnode.hasAttribute("data-label")
      );

      if (FakeFocusIndex.current == undefined) {
        FakeFocusIndex.current = selectOptionsArr.length - 1;
      } else if (FakeFocusIndex.current > 0) {
        FakeFocusIndex.current -= 1;
      } else {
        FakeFocusIndex.current = selectOptionsArr.length - 1;
      }

      const nextIndex =
        FakeFocusIndex.current === selectOptionsArr.length - 1
          ? 0
          : FakeFocusIndex.current + 1;

      if (selectOptionsArr[nextIndex].hasAttribute("data-active")) {
        selectOptionsArr[nextIndex].removeAttribute("data-active");
      }
      selectOptionsArr[FakeFocusIndex.current].setAttribute(
        "data-active",
        "true"
      );
    }
  }

  function AddNewSelectedOption(newOption) {
    if (typeof newOption === "string") {
      setIsSelected([...isSelected, newOption]);
    } else if (Array.isArray(newOption)) {
      setIsSelected([...isSelected, ...newOption]);
    }
  }

  function RemoveLastOption() {
    const newOptions = isSelected.filter(
      (_, index) => index !== isSelected.length - 1
    );
    setIsSelected(newOptions);
  }

  return (
    <>
      <div className="relative">
        <motion.div
          key="searchbox"
          animate={SearchBoxControl}
          className={` h-[24px] w-[144px] rounded flex items-center bg-theme-DarkGray-900`}
        >
          {isSelected.length > 0 ? (
            <>
              <div className="ml-[2px] rounded flex gap-1 px-1 bg-theme-SteelGray-300 ">
                {isSelected.map((eachOption) => (
                  <div
                    key={eachOption}
                    className="font-medium text-sm text-theme-White-100 "
                  >
                    <p>{eachOption}</p>
                  </div>
                ))}
              </div>
            </>
          ) : undefined}
          <div className="flex grow items-center text-theme-SteelGray-500">
            <label htmlFor="Search" className="sr-only">
              Search
            </label>
            <div className="relative flex items-center grow">
              <input
                type="text"
                name="Search"
                placeholder="Search"
                id="Search"
                autoComplete="off"
                onClick={() => {
                  setIsGrowSearchBar(true);
                  setSearchBoxIsInFocus(true);
                }}
                onBlur={unFocusHandler}
                onFocus={() => {
                  setIsGrowSearchBar(true);
                  setSearchBoxIsInFocus(true);
                }}
                size={1}
                ref={searchBoxRef}
                value={isInput}
                onChange={(event) => {
                  setIsInput(event.target.value);
                }}
                onKeyDown={keyboardHandler}
                className={`bg-theme-DarkGray-900 outline-none  grow rounded  px-2 pr-8`}
              />
              {isInput.length > 0 || isSelected.length > 0 ? (
                <button
                  className="absolute right-2"
                  onClick={() => {
                    setIsInput("");
                    setIsSelected([]);
                  }}
                >
                  <CloseIcon className=" h-4 w-4" />
                </button>
              ) : (
                <button className="absolute right-2 ">
                  <SearchIcon className=" h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
        <AnimatePresence initial={false}>
          {growSearchBar && isSelected.length === 0 && isInput.length === 0 ? (
            <motion.div
              layoutId="search"
              key="searchOption"
              animate={SearchOptionControl}
              exit={SearchOptionExitValue.get()}
              className="w-[320px] px-[20px] py-[10px] searchbox-popup-position rounded bg-theme-Slate-300"
            >
              <SearchOptionList
                AddNewSelectedOption={AddNewSelectedOption}
                searchBoxRef={searchBoxRef}
                isSelectedFromOptionList={isSelectedFromOptionList}
                setIsSelectedFromOptionList={setIsSelectedFromOptionList}
                TrueDeleteHistory={TrueDeleteHistory}
              />
            </motion.div>
          ) : undefined}
          {isSelected[0] === "from:" &&
          isInput.length === 0 &&
          searchBoxIsInFocus &&
          isSelected.length < 2 ? (
            <motion.div
              layoutId="search"
              key={"searchFromUser"}
              initial={OptionInitalState.get()}
              animate={{ height: "auto" }}
              transition={{ type: "spring", duration: 0.8, bounce: 0.2 }}
              exit={{ height: 0 }}
              className="w-[320px] overflow-hidden  searchbox-popup-position rounded bg-theme-Slate-300"
            >
              <SearchUser
                type={"FROM"}
                key={"SearchUser"}
                AddNewSelectedOption={AddNewSelectedOption}
                searchBoxRef={searchBoxRef}
              />
            </motion.div>
          ) : undefined}
          {isSelected[0] === "mentions:" &&
          isInput.length === 0 &&
          searchBoxIsInFocus &&
          isSelected.length < 2 ? (
            <motion.div
              layoutId="search"
              key="searchMentionUser"
              initial={OptionInitalState.get()}
              animate={{ height: "auto" }}
              transition={{ type: "spring", duration: 0.8, bounce: 0.2 }}
              exit={{ height: 0 }}
              className="w-[320px] overflow-hidden  searchbox-popup-position rounded bg-theme-Slate-300"
            >
              <SearchUser
                type={"MENTIONS"}
                AddNewSelectedOption={AddNewSelectedOption}
                searchBoxRef={searchBoxRef}
              />
            </motion.div>
          ) : undefined}
          {isSelected[0] === "has:" &&
          isInput.length === 0 &&
          searchBoxIsInFocus &&
          isSelected.length < 2 ? (
            <motion.div
              layoutId="search"
              key={"searchHas"}
              initial={OptionInitalState.get()}
              animate={{ height: "auto" }}
              transition={{ type: "spring", duration: 0.8, bounce: 0.2 }}
              exit={delayExitValue.get()}
              className="w-[320px] overflow-hidden  searchbox-popup-position rounded bg-theme-Slate-300"
            >
              <SearchHas
                searchBoxRef={searchBoxRef}
                AddNewSelectedOption={AddNewSelectedOption}
              />
            </motion.div>
          ) : undefined}
          {isSelected[0] === "pinned:" &&
          isInput.length === 0 &&
          searchBoxIsInFocus &&
          isSelected.length < 2 ? (
            <motion.div
              layoutId="search"
              key={"searchFromPinned"}
              initial={OptionInitalState.get()}
              animate={{ height: "auto" }}
              transition={{ type: "spring", duration: 0.8, bounce: 0.2 }}
              exit={{ height: 0 }}
              className="w-[320px] overflow-hidden  searchbox-popup-position rounded bg-theme-Slate-300"
            >
              <SearchPinned
                searchBoxRef={searchBoxRef}
                AddNewSelectedOption={AddNewSelectedOption}
              />
            </motion.div>
          ) : undefined}
          {isSelected[0] === "before:" &&
          isInput.length === 0 &&
          (searchBoxIsInFocus || datePickerIsInFocus) &&
          isSelected.length < 2 ? (
            <motion.div
              layoutId="search"
              key={"before date"}
              initial={OptionInitalState.get()}
              animate={{ height: "auto" }}
              transition={{ type: "spring", duration: 0.8, bounce: 0.2 }}
              exit={delayExitValue.get()}
              className="searchbox-popup-position overflow-hidden  w-[320px] bg-theme-Slate-300 rounded rounded-t-lg  shadow-[0px_0px_2px_black]"
            >
              <DatePickerWithRange
                searchBoxRef={searchBoxRef}
                AddNewSelectedOption={AddNewSelectedOption}
                type={"specific date"}
                ref={DatePickerRef}
              />
            </motion.div>
          ) : undefined}
          {isSelected[0] === "after:" &&
          isInput.length === 0 &&
          (searchBoxIsInFocus || datePickerIsInFocus) &&
          isSelected.length < 2 ? (
            <motion.div
              layoutId="search"
              key={"after date"}
              initial={OptionInitalState.get()}
              animate={{ height: "auto" }}
              transition={{ type: "spring", duration: 0.8, bounce: 0.2 }}
              exit={delayExitValue.get()}
              className="searchbox-popup-position overflow-hidden  w-[320px] bg-theme-Slate-300 rounded rounded-t-lg  shadow-[0px_0px_2px_black]"
            >
              <DatePickerWithRange
                searchBoxRef={searchBoxRef}
                AddNewSelectedOption={AddNewSelectedOption}
                type={"specific date"}
                ref={DatePickerRef}
              />
            </motion.div>
          ) : undefined}
          {isSelected[0] === "during:" &&
          isInput.length === 0 &&
          (searchBoxIsInFocus || datePickerIsInFocus) &&
          isSelected.length < 3 ? (
            <motion.div
              layoutId="search"
              key={"during date"}
              initial={OptionInitalState.get()}
              animate={{ height: "auto" }}
              transition={{ type: "spring", duration: 0.8, bounce: 0.2 }}
              exit={delayExitValue.get()}
              className="searchbox-popup-position overflow-hidden  w-[320px] bg-theme-Slate-300 rounded rounded-t-lg  shadow-[0px_0px_2px_black]"
            >
              <DatePickerWithRange
                searchBoxRef={searchBoxRef}
                AddNewSelectedOption={AddNewSelectedOption}
                type={"date range"}
                ref={DatePickerRef}
              />
            </motion.div>
          ) : undefined}
          {isSelected.length === 0 &&
          isInput.length > 0 &&
          searchBoxIsInFocus ? (
            <motion.div
              layoutId="search"
              key={"Searchhelper"}
              initial={OptionInitalState.get()}
              animate={{ height: "auto" }}
              transition={{ type: "spring", duration: 0.8, bounce: 0.2 }}
              exit={delayExitValue.get()}
              className={` w-[320px] bg-theme-Slate-300 overflow-hidden searchbox-popup-position rounded `}
            >
              <SearchHelper
                input={isInput}
                searchBoxRef={searchBoxRef}
                AddNewSelectedOption={AddNewSelectedOption}
              />
            </motion.div>
          ) : undefined}
        </AnimatePresence>
      </div>
    </>
  );
}
