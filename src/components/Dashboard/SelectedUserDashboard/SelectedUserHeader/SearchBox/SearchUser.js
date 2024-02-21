"use client";
import { PlusIcon } from "@/Icons";

import Image from "next/image";
import { motion } from "framer-motion";
import { GenerateSeachUserData } from "@/Helper/HelperFunctions";

export default function SearchUser({
  type,
  AddNewSelectedOption,
  searchBoxRef,
}) {
  const searchUserData = GenerateSeachUserData();

  return (
    <motion.div
      layout={"position"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="px-[20px] py-[10px]"
    >
      <div className="h-[27px] flex justify-between items-center text-theme-SteelGray-light">
        <p className="text-xs font-bold">{type} USER</p>
      </div>
      <div datatype="select-option">
        {searchUserData.map(({ image: img, name }, index) => (
          <div
            key={index}
            data-label={name}
            onClick={() => {
              AddNewSelectedOption(name);
              searchBoxRef.current.focus();
            }}
            onBlur={() => setIsClicked(false)}
            className="group  data-[active=true]:bg-gradient-to-r hover:bg-gradient-to-r from-theme-CharcoalGray-800 from-80% to-theme-Graphite-700 h-[34px] rounded flex items-center justify-between px-[10px] -mx-[10px] -mr-[11px]"
          >
            <div className="flex items-center gap-1">
              <Image
                src={img}
                height={20}
                width={20}
                alt={name}
                className="h-[20px] w-[20px] rounded-full"
              />
              <p className="text-sm font-semibold text-theme-LightGray-300">
                {name}
              </p>
            </div>
            <PlusIcon className="hidden group-data-[active=true]:block group-hover:block h-[18p] w-[18px]" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
