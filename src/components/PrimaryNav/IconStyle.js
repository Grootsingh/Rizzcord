"use client";
import React from "react";
import ToolTip from "../ToolTip";
import { classNames } from "@/utils";
import { motion } from "framer-motion";

function IconStyle({ children, varient, text = "" }) {
  const [isClicked, setClicked] = React.useState(false);

  return (
    <>
      <div className="relative ">
        <HoverBar text={text} />
        <ToolTip direction={"Left"} text={text} size={"Big"}>
          <motion.div
            onClick={() => {
              setClicked((curr) => !curr);
              setTimeout(() => setClicked(false), 1000);
            }}
            initial={{ y: 0 }}
            animate={{
              y: isClicked ? [0, 1, 0] : 0,
            }}
            transition={{ type: "tween", ease: "easeInOut" }}
          >
            <div
              className={classNames(
                varient === "secondary" &&
                  `text-theme-Teal-500 hover:bg-theme-Teal-500 group-[[id="active-link"]]:bg-theme-Teal-500`,
                varient === "primary" &&
                  `text-theme-LightGray-400 hover:bg-theme-Brand group-[[id="active-link"]]:bg-theme-Brand`,
                `peer grid place-content-center transition-all duration-200 ease-out h-12 w-12 rounded-3xl  hover:text-theme-White group-[[id="active-link"]]:text-theme-White hover:rounded-2xl group-[[id="active-link"]]:rounded-2xl bg-theme-DarkGray-800`
              )}
            >
              {children}
            </div>
          </motion.div>
        </ToolTip>
      </div>
    </>
  );
}

export default IconStyle;

function HoverBar({ text = "" }) {
  return (
    <div
      className={classNames(
        text !== "Add a Server" &&
          `absolute -left-4 top-6 bottom-6 transition-all duration-200 rounded-tr-xl rounded-br-xl  group-hover:top-4 group-hover:-left-3 opacity-0 group-hover:opacity-100 group-hover:bottom-4  w-1 bg-white group-[[id="active-link"]]:top-1 group-[[id="active-link"]]:bottom-1 group-[[id="active-link"]]:opacity-100 group-[[id="active-link"]]:-left-3`
      )}
    />
  );
}
