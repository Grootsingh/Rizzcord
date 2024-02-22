"use client";
import React from "react";
import { HashIcon } from "@/Icons";
import {
  selectedBtn,
  showUserProfieState,
} from "@/components/RootRecoilProvider/RecoilStates";
import { useRecoilValue } from "recoil";
import { filterUser, randomDigit } from "@/utils";
import { users } from "@/UserData";
import { extractColors } from "extract-colors";
import Image from "next/image";
import { addDays, format } from "date-fns";
import { isVibrant } from "@/utils";
import ToolTip from "@/components/ToolTip";
import { motion, useMotionValue } from "framer-motion";
function SelectedUserAside() {
  const selectedUserName = useRecoilValue(selectedBtn);
  const userProfileisOpen = useRecoilValue(showUserProfieState);
  const [isColor, setColor] = React.useState(null);
  const [isDate, setDate] = React.useState(null);
  const defaultWidthValue = useMotionValue(340);

  React.useEffect(() => {
    defaultWidthValue.set(0);
  }, []);

  const {
    username,
    image,
    status: Icon,
  } = selectedUserName !== "Friends"
    ? filterUser(users, "username", selectedUserName)
    : {};

  React.useEffect(() => {
    setDate(format(addDays(Date.now(), -randomDigit(1, 31)), "LLL d, yyyy"));
  }, [username]);

  if (selectedUserName === "Friends") return <div></div>;

  extractColors(image.src, {
    colorValidator: (red, green, blue) => {
      return isVibrant(red, green, blue);
    },
  })
    .then((color) => {
      setColor(color[0].hex);
    })
    .catch(console.error);

  return (
    <motion.div
      layout={true}
      initial={{ width: 340 }}
      animate={{
        width: userProfileisOpen ? 340 : defaultWidthValue.get(),
      }}
      transition={{
        delay: 0.2,
        type: userProfileisOpen ? "spring" : "tween",
        bounce: 0.2,
        ease: "easeOut",
      }}
      className={` shrink-0 bg-theme-CharcoalGray-700 border-l border-theme-Smoke-700`}
    >
      <div style={{ backgroundColor: isColor }} className="h-[7.5rem] " />
      <motion.div
        initial={false}
        animate={{ opacity: userProfileisOpen ? [0, 1] : 0 }}
        transition={{ delay: userProfileisOpen ? 0.6 : 0 }}
        className="relative"
      >
        <div className="relative w-fit translate-x-4 -translate-y-12">
          <div className="h-4 w-4 scale-[1.6] absolute bottom-1 right-1 rounded-full bg-theme-CharcoalGray-800 grid place-content-center">
            <Icon className="h-[10px] w-[10px] rounded-full" />
          </div>
          <Image
            src={image}
            alt="profile-photo"
            height={80}
            width={80}
            priority={true}
            className="rounded-full  h-[80px] w-[80px] outline outline-[6px] outline-theme-CharcoalGray-700"
          />
        </div>
        <ToolTip
          direction={"Top-Right"}
          text={
            <pre>
              Originally Known as <br />
              {username.toLowerCase()}
            </pre>
          }
        >
          <div className="h-7 w-7 absolute right-4 top-3 rounded bg-theme-Slate-300 grid place-content-center">
            <HashIcon className="h-4 w-4" />
          </div>
        </ToolTip>
      </motion.div>

      <motion.div
        initial={false}
        animate={{ opacity: userProfileisOpen ? [0, 1] : 0 }}
        transition={{ delay: userProfileisOpen ? 0.6 : 0 }}
        className="p-4 -mt-10"
      >
        <div className="flex flex-col gap-3 bg-theme-Slate-300  p-3 rounded-lg border-theme-CharcoalGray-700">
          <div className="font-semibold text-theme-Slate-400">
            <p className="text-xl">{username}</p>
            <p className="text-sm font-medium">{username.toLowerCase()}</p>
          </div>
          <div className="h-[1px] bg-theme-Graphite-800" />
          <div>
            <h2 className="text-xs mb-1 text-theme-Slate-400 font-bold">
              DISCORD MEMBER SINCE
            </h2>

            <p className="text-sm font-medium text-theme-LightGray-300">
              {isDate !== null ? isDate : undefined}
            </p>
          </div>
          <div className="h-[1px] bg-theme-Graphite-800" />

          <h2 className="text-xs text-theme-Slate-400 font-bold">NOTE</h2>
          <TextAreaBox username={username} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default SelectedUserAside;

function TextAreaBox({ username }) {
  const [note, setNote] = React.useState("");
  function handleKeyboard(event) {
    if (event.code === "Delete") {
      setNote("");
    }
  }

  React.useEffect(() => {
    setNote("");
  }, [username]);

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label htmlFor="note-field" className="sr-only">
          take a note here:
        </label>
        <textarea
          id="note-field"
          placeholder="Click to add note"
          onKeyDown={handleKeyboard}
          className="w-full overflow-hidden outline-none text-xs text-theme-LightGray-300 placeholder:text-theme-LightGray-300 resize-none min-h-9 bg-theme-Slate-300"
          value={note}
          onChange={(event) => {
            setNote(event.target.value);
          }}
        />
      </form>
    </>
  );
}
