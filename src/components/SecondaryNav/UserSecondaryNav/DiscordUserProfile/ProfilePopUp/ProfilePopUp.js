"use client";
import React from "react";

import {
  GithubIcon,
  HollowStarIcon,
  FillStarIcon,
  TwitterIcon,
  LinkdinIcon,
} from "@/Icons";
import { myProfilePic } from "@/UserData";
import Image from "next/image";
import { motion } from "framer-motion";

import ToolTip from "@/components/ToolTip";
import { Dialog } from "@headlessui/react";
import Link from "next/link";

function ProfilePopUp({ isOpen, isCloseFn, ProfilePosition }) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [top, left] = ProfilePosition;
  const RepoRef = React.useRef();
  return (
    <>
      <Dialog
        static={true}
        as={motion.div}
        onClose={isCloseFn}
        open={isOpen}
        initialFocus={RepoRef}
        key="UserProfilePopUp"
        initial={{
          height: 450,
          width: 340,
          top: top - 470,
          left: left + 6,
          clipPath: `circle(2% at 26% 19%)`,
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          clipPath: `circle(116% at 26% 19%)`,

          transition: {
            clipPath: {
              delay: 0.8,
              type: "tween",
              ease: "circOut",
              duration: 0.8,
            },
            opacity: { delay: 0.5 },
          },
        }}
        exit={{
          clipPath: `circle(2% at 26% 19%)`,
          opacity: 0,
          transition: {
            opacity: { delay: 0.2 },
            type: "tween",
            ease: "circIn",
          },
        }}
        transition={{
          delay: 1,
        }}
        className={`fixed shadow-[0_0_4px_0px_black] z-20 rounded-lg overflow-hidden bg-theme-CharcoalGray-700 `}
      >
        <div className={` flex  h-full flex-col justify-between`}>
          <div className="h-[60px] bg-slate-200" />

          <Image
            src={myProfilePic}
            alt="Rajat singh"
            height={80}
            width={80}
            className="rounded-full absolute top-5 left-6 h-[80px] w-[80px] outline outline-8 outline-theme-CharcoalGray-700"
          ></Image>
          <div className="flex gap-4 ml-auto pr-4 -mb-4  ">
            <Link
              href={"https://www.linkedin.com/in/rajat-singh-23b6b72a4/"}
              target="_blank"
            >
              <ToolTip direction={"Up"} text={"Checkout LinkedIn Profile"}>
                <div className=" hover:scale-105  h-[30px] w-[30px] shadow-lg grid place-content-center p-1 bg-theme-LightGray-500  rounded-xl ">
                  <LinkdinIcon className="h-[18px] w-[18px]" />
                </div>
              </ToolTip>
            </Link>
            <Link href={"https://twitter.com/imgrootsingh"} target="_blank">
              <ToolTip direction={"Up"} text={"Follow Me On Twitter"}>
                <div className=" hover:scale-105 h-[30px] w-[30px] shadow-lg grid place-content-center p-1 bg-theme-LightGray-500  rounded-xl ">
                  <TwitterIcon className="h-[16px] w-[16px]" />
                </div>
              </ToolTip>
            </Link>
            <Link href={"https://github.com/Grootsingh"} target="_blank">
              <ToolTip direction={"Up"} text={"Checkout Github Profile"}>
                <div className=" hover:scale-105  h-[30px] w-[30px] shadow-lg grid place-content-center p-1 bg-theme-LightGray-500  rounded-xl ">
                  <GithubIcon className="h-[22px] w-[22px]" />
                </div>
              </ToolTip>
            </Link>
            <Link
              href={"https://github.com/Grootsingh/Rizzcord"}
              target="_blank"
            >
              <ToolTip direction={"Up"} text={"Give This Repo A Star"}>
                <div
                  ref={RepoRef}
                  onMouseEnter={() => setIsVisible(true)}
                  onMouseLeave={() => setIsVisible(false)}
                  className="hover:scale-105 h-[30px] w-[30px] shadow-lg grid place-content-center p-1 bg-theme-LightGray-500  rounded-xl "
                >
                  {isVisible ? (
                    <FillStarIcon className="h-[22px] w-[22px] text-theme-Slate-300" />
                  ) : (
                    <motion.div
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ scale: 0.5, opacity: 0.5 }}
                      transition={{
                        repeat: 15,
                        repeatType: "mirror",
                        duration: 1.5,
                      }}
                    >
                      <HollowStarIcon className="h-[22px] w-[22px]" />
                    </motion.div>
                  )}
                </div>
              </ToolTip>
            </Link>
          </div>

          <div className="p-4">
            <div className="flex flex-col gap-4 bg-theme-Slate-300 h-[316px] p-3   rounded border-theme-CharcoalGray-700">
              <div className="font-semibold text-theme-Slate-400">
                <p className="text-xl">Rajat Singh</p>
              </div>
              <div className="h-[1px] bg-theme-Graphite-700" />
              <div>
                <h2 className="text-xs text-theme-Slate-400 font-bold">
                  ABOUT ME
                </h2>
                <p className="text-sm font-medium text-theme-LightGray-300">
                  Self-taught frontend developer with a passion for design,
                  strong coding skills, and proficiency in diverse technologies.
                  Job-ready for creative web development projects.
                </p>
              </div>
              <div className="h-[1px] bg-theme-Graphite-700" />
              <div>
                <h2 className="text-xs text-theme-Slate-400 font-bold">
                  CORE SKILLS
                </h2>
                <div className="flex justify-between pr-2 ">
                  <div>
                    <p className="text-sm font-medium text-theme-LightGray-300">
                      Typescript
                    </p>
                    <p className="text-sm font-medium text-theme-LightGray-300">
                      Nextjs
                    </p>
                    <p className="text-sm font-medium text-theme-LightGray-300">
                      Framer motion
                    </p>
                    <p className="text-sm font-medium text-theme-LightGray-300">
                      Tailwind CSS
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-theme-LightGray-300">
                      React
                    </p>
                    <p className="text-sm font-medium text-theme-LightGray-300">
                      Javascript
                    </p>
                    <p className="text-sm font-medium text-theme-LightGray-300">
                      CSS
                    </p>
                    <p className="text-sm font-medium text-theme-LightGray-300">
                      HTML
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default ProfilePopUp;
