"use client";
import { PlusIcon } from "@/Icons";
import { motion } from "framer-motion";
import { hasData } from "@/Constant";
export default function SearchHas({ AddNewSelectedOption, searchBoxRef }) {
  return (
    <motion.div
      layout={"position"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="px-[20px] py-[10px]"
    >
      <div className="h-[27px] flex justify-between items-center text-theme-SteelGray-light">
        <p className="text-xs font-bold">MESSAGE CONTAINS</p>
      </div>
      <div datatype="select-option">
        {hasData.map((type, index) => (
          <div
            key={index}
            data-label={type}
            onClick={() => {
              AddNewSelectedOption(type);
              searchBoxRef.current.focus();
            }}
            className="group data-[active=true]:bg-gradient-to-r hover:bg-gradient-to-r from-theme-CharcoalGray-800 from-80% to-theme-Graphite-700 h-[34px] rounded flex items-center justify-between px-[10px] -mx-[10px] -mr-[11px]"
          >
            <p className="text-sm font-semibold text-theme-LightGray-300">
              {type}
            </p>

            <PlusIcon className="hidden group-data-[active=true]:block group-hover:block h-[18p] w-[18px]" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
