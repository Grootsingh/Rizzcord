"use client";
import { motion } from "framer-motion";
function UserNotFound({ icon: Icon, text }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.25 }}
        className={`flex flex-col h-full items-center text-theme-SteelGray-500 justify-center`}
      >
        <Icon className="h-24 w-24" />
        <p className="text-center font-medium">{text}</p>
      </motion.div>
    </>
  );
}

export default UserNotFound;
