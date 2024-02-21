"use client";
import { motion } from "framer-motion";

function NotFound({ icon: Icon, Primanrytext, Secondarytext }) {
  return (
    <>
      <motion.div
        layout="position"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.25 }}
        className={`flex flex-col h-[179px] items-center text-theme-SteelGray-500 justify-start`}
      >
        <Icon className="h-24 w-24" />
        <p className="text-center font-medium mt-4">{Primanrytext}</p>
        <p className="text-center font-medium text-sm brightness-75 hover:brightness-100 hover:underline text-theme-Forest-900">
          {Secondarytext}
        </p>
      </motion.div>
    </>
  );
}

export default NotFound;
