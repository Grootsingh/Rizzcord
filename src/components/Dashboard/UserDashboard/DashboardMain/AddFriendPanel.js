"use client";
import React from "react";
import { AddAFriendNotFoundIcon } from "@/Icons";
import { AnimatePresence, motion } from "framer-motion";
function AddFriendPanel() {
  const [isInput, setIsInput] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  React.useEffect(() => {
    if (isSubmitted) {
      const timerID = window.setTimeout(() => {
        setIsSubmitted(false);
        setIsInput("");
      }, 5 * 1000);
      return () => clearTimeout(timerID);
    }
  }, [isSubmitted]);

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitted(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween", ease: "easeInOut" }}
      className="flex flex-col h-full"
    >
      <div className="h-[155px] w-full py-[20px] px-[30px] min-w-[360px]">
        <h2 className="mb-1 text-theme-Slate-400 font-semibold">ADD FRIEND</h2>
        <form className="flex flex-col gap-4 relative" onSubmit={handleSubmit}>
          <label className="text-sm text-theme-SteelGray-light">
            You can add friends with their Discord username
          </label>
          <input
            type="text"
            name="add-friends"
            id="add-friends"
            size={1}
            autoComplete="off"
            value={isInput}
            onChange={(event) => setIsInput(event.target.value)}
            placeholder="You can add friends with their Discord username"
            className={`${
              isSubmitted
                ? "ring-theme-Teal-600 ring-2"
                : "focus-visible:ring-theme-Forest-900"
            } bg-theme-DarkGray-900  text-theme-SteelGray-500 focus-visible:ring-2  tracking-wide outline-none  placeholder:font-medium placeholder:text-theme-Gray-500 rounded-lg h-[50px] px-3`}
          />
          <button
            disabled={isInput.length < 1}
            className={`${
              isInput.length > 0 ? "" : "brightness-75"
            } absolute right-3 top-11  h-7 w-fit py-4  rounded px-4 grid place-content-center font-medium bg-theme-Brand  text-white text-sm`}
          >
            Send Friend Request
          </button>
          <AnimatePresence>
            {isSubmitted ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-[5.75rem] left-3 text-theme-Teal-600 text-sm"
              >
                Success! Your friend request to <strong>{isInput}</strong> was
                sent
              </motion.p>
            ) : undefined}
          </AnimatePresence>
        </form>
      </div>
      <div className="h-[1px] bg-theme-Smoke-700" />
      <div className="h-1/2 flex flex-col justify-center items-center">
        <AddAFriendNotFoundIcon className="h-[162px] w-[376px]" />
        <p className="text-center text-theme-SteelGray-500">
          Wumpus is waiting on friends. You don’t have to though!
        </p>
      </div>
    </motion.div>
  );
}

export default AddFriendPanel;
