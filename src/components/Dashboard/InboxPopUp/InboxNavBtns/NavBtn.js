"use client";
import { motion } from "framer-motion";
import { InboxPopupBtn } from "@/Constant";

function NavButton({ isActive, updateActive }) {
  return (
    <>
      {InboxPopupBtn.map(({ status, id }) => (
        <>
          <div key={id} className="relative">
            {isActive === status ? (
              <motion.div
                layoutId="InboxNavLink"
                initial={{ borderRadius: 4 }}
                className={` absolute inset-0 bg-theme-Driftwood-grey-400`}
              />
            ) : undefined}
            <button
              onClick={() => updateActive(status)}
              className={` ${
                isActive === status ? "text-white" : undefined
              } px-2 py-[1px] z-[1] hover:text-white relative outline-none focus-visible:ring-2 focus-visible:ring-theme-Forest-900 font-medium  rounded text-theme-SteelGray-light`}
            >
              {status}
            </button>
          </div>
        </>
      ))}
    </>
  );
}

export default NavButton;
