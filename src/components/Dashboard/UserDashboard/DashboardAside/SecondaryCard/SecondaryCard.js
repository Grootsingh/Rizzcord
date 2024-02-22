"use client";
import React from "react";
import { users } from "@/UserData";
import Image from "next/image";
import SecondaryCardPopUp from "./SecondaryCardPopUp";
import { SpotifyIcon } from "@/Icons";
import { BananaShake } from "@/UserData";
import { AnimatePresence, motion } from "framer-motion";
import ToolTip from "@/components/ToolTip";
import { MediaPlayState } from "@/components/RootRecoilProvider/RecoilStates";
import { useRecoilState } from "recoil";
import useAnimationController from "@/Hooks/useAnimationController";
import {
  SpotifyPlayIcon,
  SpotifyPauseIcon,
  SpotifyLeftArrowIcon,
} from "@/Icons";
import MusicHelperPopUp from "./MusicHelperPopUp";
export default function SecondaryCard() {
  const [isCardPopUpOpen, setCardPopUpOpen] = React.useState(false);

  const [isPlay, setIsPlay] = useRecoilState(MediaPlayState);
  const { image, username, status: StatusIcon } = users[2];
  const [isMusicPopupOpen, setMusicPopUpOpen] = React.useState(false);
  const TitleHTMLElement = React.useRef();
  const controlRef = useAnimationController(TitleHTMLElement);
  function flipthePlayState() {
    setIsPlay((curr) => !curr);
  }
  function CloseCardPopUpState() {
    setCardPopUpOpen(false);
  }
  React.useEffect(() => {
    if (!isPlay) {
      setMusicPopUpOpen(false);
    }
  }, [isPlay]);

  return (
    <div
      id="big-card"
      className="w-full relative z-[2] flex flex-col justify-center  p-4 mt-2 border border-theme-Smoke-700 hover:bg-theme-Slate-300 rounded-lg bg-theme-CharcoalGray-800"
    >
      <div
        onClick={() => setCardPopUpOpen((curr) => !curr)}
        className="flex h-9 min-w-0 items-center justify-between gap-3"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="relative shrink-0">
            <div className="h-4 w-4 absolute bottom-[-3px] right-[-3px] rounded-full bg-theme-CharcoalGray-800 grid place-content-center">
              <StatusIcon className=" h-[10px] w-[10px]   rounded-full" />
            </div>
            <Image
              src={image}
              alt={username}
              className="w-8 h-8 rounded-full "
            />
          </div>
          <div className="min-w-0  shrink-[1000]">
            <p className="font-semibold text-ellipsis whitespace-nowrap leading-4 overflow-hidden max-w-max text-theme-LightGray-300">
              {username}
            </p>
            <p className="text-sm  text-ellipsis whitespace-nowrap leading-4 overflow-hidden max-w-max text-theme-SteelGray-light">
              Listening to Spotify
            </p>
          </div>
        </div>
        <SpotifyIcon className="h-8 w-8 " />
      </div>
      <div className="h-3" />
      <div
        id="sub-card"
        onMouseEnter={() => {
          controlRef.current?.pause();
        }}
        onMouseLeave={() => {
          controlRef.current?.play();
        }}
        className="relative overflow-hidden rounded-lg"
      >
        <div className="absolute inset-0 cardTwo-gradient rounded-lg" />
        <div className="p-4 flex items-center justify-between">
          <div className="flex  min-w-0 items-center gap-3">
            <div className="relative border-2 rounded border-theme-White-100 shrink-0">
              <Image
                src={BananaShake}
                alt={username}
                height={100}
                width={100}
                priority={true}
                className="w-[100px] h-[100px]"
              />
            </div>
            <div className="flex self-start flex-col min-w-0">
              <div className="flex flex-col">
                <div className="overflow-hidden cardTwo-mask">
                  <motion.div
                    ref={TitleHTMLElement}
                    initial={{ x: "-52%" }}
                    className="flex whitespace-nowrap  gap-4 min-w-max"
                  >
                    <p className="font-semibold peer hover:underline text-sm whitespace-nowrap leading-4  text-theme-LightGray-200">
                      {`BANANA SHAKE (SPED UP)`}
                    </p>
                    <p className="font-semibold peer hover:underline text-sm whitespace-nowrap leading-4  text-theme-LightGray-200">
                      {`BANANA SHAKE (SPED UP)`}
                    </p>
                  </motion.div>
                </div>
                <p className="text-xs peer-hover:underline text-ellipsis whitespace-nowrap leading-4 overflow-hidden max-w-max text-theme-LightGray-300">
                  HUS
                </p>
              </div>
              <div className="mt-[2.2rem]">
                <div className="flex gap-2  justify-center items-center">
                  <SpotifyLeftArrowIcon className=" scale-75" />
                  <button
                    onKeyDown={(event) => {
                      if (event.code === "Space") {
                        event.stopPropagation();
                      }
                    }}
                    onClick={() => {
                      flipthePlayState();
                      setMusicPopUpOpen(true);
                    }}
                  >
                    {isPlay ? (
                      <ToolTip direction={"Up"} text={"Pause"}>
                        <SpotifyPauseIcon />
                      </ToolTip>
                    ) : (
                      <ToolTip direction={"Up"} text={"Play"}>
                        <SpotifyPlayIcon />
                      </ToolTip>
                    )}
                  </button>
                  <SpotifyLeftArrowIcon className=" rotate-180 scale-75" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isCardPopUpOpen ? (
          <SecondaryCardPopUp
            key="secondaryCardPopUp"
            isCardPopUpOpen={isCardPopUpOpen}
            CloseCardPopUpState={CloseCardPopUpState}
          />
        ) : undefined}
      </AnimatePresence>

      <AnimatePresence>
        {isMusicPopupOpen ? <MusicHelperPopUp key="MusicPopUp" /> : undefined}
      </AnimatePresence>
    </div>
  );
}
