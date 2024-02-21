"use clinet";
import { users } from "@/UserData";
import Image from "next/image";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { selectedBtn } from "@/components/RootRecoilProvider/RecoilStates";
import { useSetRecoilState } from "recoil";

export default function SecondaryCardPopUp({
  isCardPopUpOpen,
  CloseCardPopUpState,
}) {
  const { image, username, status: StatusIcon } = users[2];
  const selectButton = useSetRecoilState(selectedBtn);

  function VisibleUserChat(username) {
    selectButton(username);
    const element = document.getElementById(username);
    element.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  }
  return (
    <>
      <Dialog
        static={true}
        as={motion.div}
        open={isCardPopUpOpen}
        onClose={() => CloseCardPopUpState()}
        initial={{
          top: "17rem",
          right: "9rem",
          borderRadius: 8,
        }}
        animate={{
          right: "22rem",

          pointerEvents: "none",
          transition: {
            right: {
              type: "spring",
              stiffness: 60,
              damping: 12,
            },
          },
          transitionEnd: { pointerEvents: "auto" },
        }}
        exit={{
          right: "9rem",

          pointerEvents: "none",
          transition: {
            right: {
              type: "spring",
              stiffness: 60,
              damping: 12,
            },
          },
          transitionEnd: { pointerEvents: "auto" },
        }}
        className="fixed flex flex-col shadow-xl  w-[188px]  bg-theme-Slate-300 rounded-lg"
      >
        <Dialog.Panel className={"p-2"}>
          <div className="h-8 font-medium text-theme-SteelGray-light text-sm px-2 py-[6px] my-[2px] rounded hover:text-theme-White hover:bg-theme-Brand">
            <span>Message</span>
          </div>
          <div className="h-[1px] bg-theme-Graphite-800" />
          <div
            id="user"
            className="flex h-9  mt-1 items-center  text-theme-SteelGray-light text-sm px-2 py-[6px]  rounded hover:text-theme-White hover:bg-theme-Brand"
          >
            <div
              onClick={() => VisibleUserChat(username)}
              className="flex min-w-0 items-center gap-3"
            >
              <div className="relative shrink-0">
                <div className="h-[10px] w-[10px] absolute bottom-[-1px] right-[-1px] rounded-full bg-theme-CharcoalGray-800 grid place-content-center">
                  <StatusIcon className=" h-[8px] w-[8px]   rounded-full" />
                </div>
                <Image
                  src={image}
                  alt={username}
                  height={24}
                  width={24}
                  className="w-6 h-6 rounded-full "
                />
              </div>
              <div className="min-w-0  shrink-[1000]">
                <p className="text-ellipsis whitespace-nowrap leading-4 font-medium overflow-hidden max-w-max">
                  {username}
                </p>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
