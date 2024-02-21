"use client";
import {
  add,
  addDays,
  differenceInDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  getDaysInMonth,
  getTime,
  isAfter,
  isBefore,
  isEqual,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  isSameMonth,
  isToday,
  lastDayOfMonth,
  parse,
  startOfToday,
  startOfTomorrow,
  startOfWeek,
} from "date-fns";
import {
  ArrowDownIcon,
  ArrowDownKeyboardNavIcon,
  ArrowLeftKeyboardNavIcon,
  ArrowRightKeyboardNavIcon,
  ArrowUpKeyboardNavIcon,
} from "@/Icons";
import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { classNames } from "@/utils";

function DatePickerWithRange(
  { type, searchBoxRef, AddNewSelectedOption },
  ref
) {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedSecondDay, setSelectedSecondDay] = useState("");
  const [isHovered, setIsHovered] = useState("");
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: addDays(
      endOfMonth(firstDayCurrentMonth),
      42 - (getDaysInMonth(firstDayCurrentMonth) + getDay(firstDayCurrentMonth))
    ),
  });
  function previousMonth() {
    let firstDayPrevMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayPrevMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  useEffect(() => {
    if (type === "specific date" && selectedDay) {
      const formatedSelectedDay = format(selectedDay, "yyyy-MM-dd");
      AddNewSelectedOption(formatedSelectedDay);
      searchBoxRef.current.focus();
    }
    if (type === "date range") {
      if (selectedSecondDay) {
        const formatedSelectedSecondDay = format(
          selectedSecondDay,
          "yyyy-MM-dd"
        );
        AddNewSelectedOption(`/ ${formatedSelectedSecondDay}`);
        searchBoxRef.current.focus();
      } else if (selectedDay) {
        const formatedSelectedDay = format(selectedDay, "yyyy-MM-dd");
        AddNewSelectedOption(formatedSelectedDay);
      }
    }
  }, [selectedDay, selectedSecondDay]);

  useEffect(() => {
    const grid = document.getElementById("grid-container");
    if (document.hasFocus(grid)) {
      function handleFocus(event) {
        if (
          event.code === "ArrowUp" ||
          event.code === "ArrowDown" ||
          event.code === "ArrowLeft" ||
          event.code === "ArrowRight"
        ) {
          const btn = document.getElementById("1");
          btn?.focus();
          setTimeout(() => {
            window.removeEventListener("keydown", handleFocus);
          }, 0);
        }
      }
      window.addEventListener("keydown", handleFocus);
      return () => window.removeEventListener("keydown", handleFocus);
    }
  }, []);

  function handleKeyBoardNavigation(event, day) {
    if (event.code === "Escape") {
      searchBoxRef.current.focus();
    }
    if (event.code === "Backspace") {
      setSelectedDay("");
      setSelectedSecondDay("");
      setIsHovered("");
    }
    if (event.code === "Tab") {
      setIsHovered(addDays(day, 1));
    }
    if (event.code === "ArrowUp") {
      const theDifference = differenceInDays(day, firstDayCurrentMonth);

      if (theDifference <= 6) {
        previousMonth();

        setTimeout(() => {
          let firstDayPrevMonth = add(firstDayCurrentMonth, {
            months: -1,
          });
          const lastDayPrevMonth = lastDayOfMonth(firstDayPrevMonth);
          const idOfLastDayPrevMonth = format(lastDayPrevMonth, "d");
          const prevID = Number(idOfLastDayPrevMonth) - (6 - theDifference);

          const btn = document.getElementById(prevID);
          btn?.focus();
        }, 0);
      } else {
        const prevWeek = addDays(day, -7);
        setIsHovered(prevWeek);
        event.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.focus();
      }
    }
    if (event.code === "ArrowDown") {
      if (differenceInDays(today, nextMonth) <= 6) return;

      const theDifference = differenceInDays(lastDayOfMonth(day), day);
      if (theDifference < 7) {
        nextMonth();

        setTimeout(() => {
          let firstDayNextMonth = add(firstDayCurrentMonth, {
            months: 1,
          });

          const idOfFirstDayNextMonth = format(firstDayNextMonth, "d");
          const nextID = Number(idOfFirstDayNextMonth) + (6 - theDifference);

          const btn = document.getElementById(nextID);
          btn?.focus();
        }, 0);
      } else {
        const nextWeek = addDays(day, 7);
        setIsHovered(nextWeek);

        event.target.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.focus();
      }
    }
    if (event.code === "ArrowLeft") {
      if (isFirstDayOfMonth(day)) {
        previousMonth();

        setTimeout(() => {
          let firstDayPrevMonth = add(firstDayCurrentMonth, {
            months: -1,
          });
          const lastDayPrevMonth = lastDayOfMonth(firstDayPrevMonth);

          const idOfLastDayPrevMonth = format(lastDayPrevMonth, "d");
          const btn = document.getElementById(idOfLastDayPrevMonth);
          btn?.focus();
        }, 0);
      } else {
        setIsHovered(addDays(day, -1));
        event.target.parentElement.previousElementSibling.firstElementChild.focus();
      }
    }
    if (event.code === "ArrowRight") {
      if (isToday(day)) return;
      if (isLastDayOfMonth(day)) {
        nextMonth();
        setTimeout(() => {
          let firstDayNextMonth = add(firstDayCurrentMonth, {
            months: 1,
          });

          const idOfFirstDayNextMonth = format(firstDayNextMonth, "d");
          const btn = document.getElementById(idOfFirstDayNextMonth);
          btn?.focus();
        }, 0);
      } else {
        setIsHovered(addDays(day, 1));
        event.target.parentElement.nextElementSibling.firstElementChild.focus();
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      tabIndex={-1}
      layout={"position"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <div className="bg-theme-Driftwood-grey-light rounded-lg p-[20px]">
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={previousMonth}
            className="-my-1.5 flex flex-none items-center justify-center hover:bg-theme-Driftwood-grey-Extra-light hover:text-theme-White-100 text-theme-Gray-500  border rounded border-theme-DarkGray-900"
          >
            <span className="sr-only">Previous month</span>
            <ArrowDownIcon
              className="w-[18px] h-[18px] rotate-90"
              aria-hidden="true"
            />
          </button>
          <h2 className=" font-semibold text-[13px] mx-auto text-theme-White-100">
            {format(firstDayCurrentMonth, "MMMM yyyy").toUpperCase()}
          </h2>

          <button
            onClick={nextMonth}
            onClickCapture={() => {
              const nextMonth = add(firstDayCurrentMonth, { months: +1 });
              if (isSameMonth(nextMonth, today)) {
                ref.current.focus();
              }
            }}
            type="button"
            className={`${
              getTime(add(currentMonth, { months: 1 })) > getTime(today)
                ? "invisible"
                : "visible"
            } -my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center hover:bg-theme-Driftwood-grey-Extra-light hover:text-theme-White-100 text-theme-Gray-500 border rounded border-theme-DarkGray-900`}
          >
            <span className="sr-only">Next month</span>
            <ArrowDownIcon
              className="w-[18px] h-[18px] rotate-[270deg]"
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="h-[1px] mt-[20px] mb-[10px]  bg-theme-CharcoalGray-800" />
        <div className="grid grid-cols-7 text-[13px] leading-6 text-center font-semibold text-theme-CharcoalGray-600">
          <div>SU</div>
          <div>MO</div>
          <div>TU</div>
          <div>WE</div>
          <div>TH</div>
          <div>FR</div>
          <div>SA</div>
        </div>
        <div
          id="grid-container"
          className="grid grid-cols-7 border border-theme-DarkGray-900 gap-[1px] rounded overflow-hidden grid-rows-6 mt-2 text-sm"
        >
          {days.map((day, dayIdx) => (
            <div
              key={day.toString()}
              className={classNames(
                dayIdx === 0 && colStartClasses[getDay(day)],
                "bg-theme-Driftwood-grey-light outline outline-theme-DarkGray-900 outline-[1px]"
              )}
            >
              <button
                type="button"
                id={
                  isSameMonth(day, firstDayCurrentMonth)
                    ? format(day, "d")
                    : undefined
                }
                onClick={() => {
                  if (!selectedDay) {
                    setSelectedDay(day);
                  } else if (!selectedSecondDay) {
                    setSelectedSecondDay(isHovered);
                  } else {
                    setSelectedDay(day);
                    setSelectedSecondDay("");
                    setIsHovered("");
                  }
                }}
                onKeyDown={(event) => handleKeyBoardNavigation(event, day)}
                onMouseOver={() => {
                  if (
                    selectedDay &&
                    isAfter(day, selectedDay) &&
                    isAfter(startOfTomorrow(today), day) &&
                    isSameMonth(day, firstDayCurrentMonth) &&
                    !selectedSecondDay
                  ) {
                    setIsHovered(day);
                  }
                }}
                disabled={
                  (!isToday(day) && !isSameMonth(day, firstDayCurrentMonth)) ||
                  !isAfter(startOfTomorrow(today), day)
                }
                className={classNames(
                  isEqual(day, selectedSecondDay) && `font-bold bg-theme-Brand`,
                  isAfter(day, selectedDay) &&
                    isBefore(day, selectedSecondDay) &&
                    `bg-theme-Brand`,
                  isEqual(day, selectedDay) &&
                    isSameMonth(day, firstDayCurrentMonth) &&
                    `bg-theme-Brand`,
                  isEqual(day, selectedDay) &&
                    !isSameMonth(day, firstDayCurrentMonth) &&
                    `text-theme-Gray-600 bg-theme-CharcoalGray-800`,
                  isAfter(isHovered, selectedDay) &&
                    !isAfter(day, isHovered) &&
                    isAfter(day, selectedDay) &&
                    isAfter(startOfTomorrow(today), day) &&
                    isSameMonth(day, firstDayCurrentMonth) &&
                    "bg-theme-Brand",
                  isSameMonth(day, firstDayCurrentMonth) &&
                    isAfter(startOfTomorrow(today), day) &&
                    `text-theme-White-100  `,
                  isToday(day) && "border-b-4 font-bold border-theme-Brand",
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    !isSameMonth(day, firstDayCurrentMonth) &&
                    "text-theme-Gray-600 bg-theme-CharcoalGray-800",
                  isSameMonth(day, firstDayCurrentMonth) &&
                    !isAfter(startOfTomorrow(today), day) &&
                    "text-theme-Gray-600 bg-theme-CharcoalGray-800",

                  isAfter(startOfTomorrow(today), day) &&
                    isSameMonth(day, firstDayCurrentMonth) &&
                    "hover:bg-theme-Brand",
                  isEqual(day, selectedDay) && "font-semibold",
                  "flex h-[40px] w-[40px] items-center justify-center outline-none focus-visible:bg-theme-Brand "
                )}
              >
                <time dateTime={format(day, "yyyy-MM-dd")}>
                  {format(day, "d")}
                </time>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="h-16 px-[20px] flex items-center gap-3 justify-center">
        <p className="text-theme-LightGray-100  font-semibold">
          For keyboard navigation use
        </p>
        <div className="grid grid-rows-2 grid-cols-3 text-theme-Brand pb-[6px] ">
          <ArrowUpKeyboardNavIcon className="h-[18px] w-[18px]  col-start-2 row-start-1 " />
          <ArrowLeftKeyboardNavIcon className="h-[18px] w-[18px]  col-start-1 row-start-2 " />
          <ArrowDownKeyboardNavIcon className="h-[18px] w-[18px] col-start-2 row-start-2" />
          <ArrowRightKeyboardNavIcon className="h-[18px] w-[18px] col-start-3 row-start-2" />
        </div>
      </div>
    </motion.div>
  );
}

export default React.forwardRef(DatePickerWithRange);

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
