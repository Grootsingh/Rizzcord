"use client";
import { motion } from "framer-motion";

export default function UserNotFound({ icon: Icon, text }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", ease: "easeInOut" }}
        className={`flex flex-col h-full items-center text-theme-SteelGray-500 justify-center`}
      >
        <Icon className="h-64 w-[27rem]" />
        <p className="text-center">{text}</p>
      </motion.div>
    </>
  );
}
