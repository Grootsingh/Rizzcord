"use client";
import React from "react";
import Image from "next/image";
import ToolTip from "@/components/ToolTip";
import { selectedBtn } from "@/components/RootRecoilProvider/RecoilStates";
import { useRecoilValue } from "recoil";
import { getUserData } from "@/Helper/HelperFunctions";

export default function SubHeaderLeft() {
  const isSelected = useRecoilValue(selectedBtn);
  const selectedUser = isSelected !== "Friends" ? isSelected : undefined;

  const userData = getUserData(selectedUser);
  if (!userData) return <div></div>;
  const { username, image, status: StatusIcon } = userData;

  return (
    <div className="shrink-0 flex items-center gap-3">
      <div className=" relative">
        <div className="h-3 w-3 absolute bottom-[-2px] right-[-2px] rounded-full bg-theme-CharcoalGray-800 grid place-content-center">
          <StatusIcon className=" h-[8px] w-[8px]   rounded-full" />
        </div>
        <Image
          src={image}
          alt={username}
          height={24}
          width={24}
          className="rounded-full h-6 w-6"
        />
      </div>

      <ToolTip direction={"Down"} text={username}>
        <span className="font-semibold  cursor-pointer text-base text-theme-Slate-400">
          {username}
        </span>
      </ToolTip>
    </div>
  );
}
