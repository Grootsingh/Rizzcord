"use client";
import React from "react";
import { activeHeaderBtn } from "@/components/RootRecoilProvider/RecoilStates";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
import { UserSubheaderLeftBtn } from "@/Constant";
export default function SubHeaderLeft() {
  const [isActive, setIsActive] = useRecoilState(activeHeaderBtn);
  return (
    <>
      {UserSubheaderLeftBtn.map(({ status, id }) => (
        <div className="relative" key={id}>
          {isActive === status ? (
            <motion.div
              layoutId="userheaderleft"
              initial={{ borderRadius: 4 }}
              className={` absolute inset-0 bg-theme-Driftwood-grey-Extra-light`}
            />
          ) : undefined}
          <button
            onClick={() => setIsActive(status)}
            className={`${
              isActive === status ? "text-white " : undefined
            } px-2 py-[1px] relative z-[1] font-medium hover:text-white rounded text-theme-SteelGray-light`}
          >
            {status}
          </button>
        </div>
      ))}

      <button
        onClick={() => setIsActive("Add Friend")}
        className={`${
          isActive === "Add Friend"
            ? "text-theme-Teal-600 bg-transparent"
            : `text-white`
        } ml-[2px] px-2 py-[1px] font-medium bg-theme-Teal-400 rounded `}
      >
        Add Friend
      </button>
    </>
  );
}
