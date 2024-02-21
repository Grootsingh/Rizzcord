"use client";
import React from "react";
import { motion } from "framer-motion";

function PopUp({ text, position, direction, size }) {
  const [top, left, width, height] = position;
  let style;

  let animateDirection;
  let specificCSS;
  if (direction === "Up") {
    specificCSS = `-bottom-1 left-[calc(50%-0.5rem)]`;
    style = {
      top: `${top}px`,
      left: `${left}px`,
      translate: `calc(-50% + ${width / 2}px) -130%`,
    };
    animateDirection = { y: [0, -2] };
  } else if (direction === "Left") {
    specificCSS = `-left-1 top-[calc(50%-0.5rem)] popup-clip-path`;
    style = {
      top: `${top}px`,
      left: `${left}px`,
      translate: `4.3rem calc(-50% + ${height / 2}px )`,
    };
    animateDirection = { x: [-2, 0] };
  } else if (direction === "Down") {
    specificCSS = `rotate-180 -top-1 left-[calc(50%-0.5rem)]`;
    style = {
      top: `${top}px`,
      left: `${left}px`,
      translate: `calc(-50% + ${width / 2}px) 130%`,
    };
    animateDirection = { y: [0, 2] };
  } else if (direction === "Top-Right") {
    // unique case
    specificCSS = `-bottom-1 right-[calc(12%-0.5rem)]`;
    style = {
      top: `${top - 59}px`,
      left: `${left + 75}px`,
      translate: `calc(-50% + ${width / 2}px) -130%`,
    };
    animateDirection = { y: [0, -2] };
  } else {
    specificCSS = `top-[calc(50%-0.5rem)] rotate-[270deg] -right-[4px]`;
    style = {
      top: `${top}px`,
      left: `${left}px`,
      translate: `calc(-109%) calc(-50% + ${height / 2}px)`,
    };

    animateDirection = {
      x: [0, -2],
    };
  }

  return (
    <motion.div
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, ...animateDirection }}
      transition={{ type: "spring" }}
      className={
        size === "small"
          ? `fixed drop-shadow-xl  text-sm w-max px-2 py-1 rounded text-theme-LightGray-400 bg-theme-DarkGray-800`
          : `font-medium max-w-48   px-3 py-2 rounded-lg  fixed drop-shadow-xl  text-theme-LightGray-400 bg-theme-DarkGray-800`
      }
    >
      {text}
      <div
        className={
          size === "small"
            ? `${specificCSS} popup-dm absolute  bg-theme-DarkGray-800 h-4 w-4`
            : `${specificCSS} absolute bg-theme-DarkGray-800  h-4 w-4`
        }
      ></div>
    </motion.div>
  );
}

export default PopUp;
