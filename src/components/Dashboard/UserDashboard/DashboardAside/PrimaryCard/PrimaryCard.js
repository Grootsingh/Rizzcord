"use client";
import React from "react";
import { users } from "@/UserData";
import Image from "next/image";
import PrimaryCardPopUp from "./PrimaryCardpopUp";
import { BuriBuriZimon } from "@/UserData";
import { VolumeIcon } from "@/Icons";
import { AnimatePresence } from "framer-motion";
export default function PrimaryCard() {
  const [isCardPopUpOpen, setCardPopUpOpen] = React.useState(false);
  const { image: mainImg, username: mainUser, status: StatusIcon } = users[0];
  const { image: secondaryImgOne, username: secondaryUserOne } = users[1];
  const { image: secondaryImgTwo, username: secondaryUserTwo } = users[2];

  function CloseCardPopUpState() {
    setCardPopUpOpen(false);
  }

  return (
    <>
      <div
        onClick={() => setCardPopUpOpen((curr) => !curr)}
        id="big-card"
        className="w-full relative z-[2] p-4 mt-2 border border-theme-Smoke-700 hover:bg-theme-Slate-300 rounded-lg bg-theme-CharcoalGray-800"
      >
        <div className="flex h-9 min-w-0 items-center gap-3">
          <div className="relative shrink-0">
            <div className="h-4 w-4 absolute bottom-[-3px] right-[-3px] rounded-full bg-theme-CharcoalGray-800 grid place-content-center">
              <StatusIcon className=" h-[10px] w-[10px]   rounded-full" />
            </div>
            <Image
              src={mainImg}
              alt={mainUser}
              height={32}
              width={32}
              className="w-8 h-8 rounded-full "
            />
          </div>
          <div className="min-w-0  shrink-[1000]">
            <p className="font-semibold text-ellipsis whitespace-nowrap leading-4 overflow-hidden max-w-max text-theme-LightGray-300">
              {`${mainUser},${secondaryUserOne} and 3 others`}
            </p>
            <p className="text-sm  text-ellipsis whitespace-nowrap leading-4 overflow-hidden max-w-max text-theme-SteelGray-light">
              In a Voice Channel
            </p>
          </div>
        </div>
        <div className="h-3" />
        <div id="sub-card" className=" relative overflow-hidden  rounded-lg   ">
          <div className="absolute inset-0 rounded-lg cardOne-gradient" />
          <div className="p-4 h-[58px] flex items-center justify-between">
            <div className="flex  min-w-0 items-center gap-3">
              <div className="relative shrink-0">
                <div className="h-4 w-4 absolute right-[-2px] bottom-0 rounded-full bg-theme-Slate-300 grid place-content-center">
                  <VolumeIcon className=" h-[10px] w-[10px] text-theme-Smoke-800  rounded-full" />
                </div>
                <Image
                  src={BuriBuriZimon}
                  alt={"Group BuriBuri Zimon Gang Picture"}
                  height={32}
                  width={32}
                  className="w-8 h-8 rounded-full "
                />
              </div>
              <div className="min-w-0  shrink-[1000]">
                <p className="font-semibold peer hover:underline text-sm text-ellipsis whitespace-nowrap leading-4 overflow-hidden max-w-max text-theme-LightGray-200">
                  BuriBuri Zimon Gang
                </p>
                <p className="text-xs peer-hover:underline text-ellipsis whitespace-nowrap leading-4 overflow-hidden max-w-max text-theme-LightGray-300">
                  We aid the strongest
                </p>
              </div>
            </div>
            <div className="flex  items-center">
              <Image
                src={secondaryImgOne}
                height={24}
                alt={secondaryUserOne}
                width={24}
                className="w-6 h-6  rounded-full border  translate-x-2 border-theme-Smoke-700 "
              />
              <Image
                src={secondaryImgTwo}
                alt={secondaryUserTwo}
                height={24}
                width={24}
                className="w-6 h-6  rounded-full border  translate-x-1 border-theme-Smoke-700 "
              />
              <div className="w-8 h-6 bg-theme-CharcoalGray-800 rounded-full  z-10 text-theme-LightGray-300 grid place-content-center text-sm ">
                +3
              </div>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isCardPopUpOpen ? (
            <PrimaryCardPopUp
              key="primaryCardPopUp"
              isCardPopUpOpen={isCardPopUpOpen}
              CloseCardPopUpState={CloseCardPopUpState}
            />
          ) : undefined}
        </AnimatePresence>
      </div>
    </>
  );
}
