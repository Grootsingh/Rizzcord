"use clinet";
import React from "react";
import { TickIcon } from "@/Icons";
function FilterOption({ mainText }) {
  const [isSelected, setIsSelected] = React.useState(false);
  return (
    <>
      <div
        onClick={() => setIsSelected((curr) => !curr)}
        className={`h-[32px] group  w-full my-[2px] hover:text-white px-2  hover:bg-theme-Brand flex rounded items-center justify-between text-sm font-medium text-theme-SteelGray-light `}
      >
        <div>
          <label htmlFor={mainText}>{mainText}</label>
        </div>
        <div
          className={`${
            isSelected ? "group-hover:bg-white" : undefined
          } grid place-content-center h-[16px] w-[16px] border-theme-SteelGray-light group-hover:border-white rounded border border-2 `}
        >
          {isSelected ? (
            <TickIcon
              className={`h-[13px] w-[13px] mt-[1px] group-hover:text-theme-Brand text-white stroke-current stroke-1 `}
            />
          ) : undefined}

          <input
            type="checkbox"
            name="Select Mute FilterOption"
            id={mainText}
            value={mainText}
            className={`appearance-none`}
            checked={isSelected === true}
            onChange={() => {
              setIsSelected((curr) => !curr);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default FilterOption;
