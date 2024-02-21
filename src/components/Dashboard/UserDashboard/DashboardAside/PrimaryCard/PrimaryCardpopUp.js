import Image from "next/image";
import { users } from "@/UserData";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { selectedBtn } from "@/components/RootRecoilProvider/RecoilStates";
import { useSetRecoilState } from "recoil";

export default function PrimaryCardPopUp({
  isCardPopUpOpen,
  CloseCardPopUpState,
}) {
  const { image: secondaryImgOne, username: secondaryUserOne } = users[1];
  const { image: secondaryImgTwo, username: secondaryUserTwo } = users[2];
  const { image: secondaryImgThree, username: secondaryUserThree } = users[3];
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
    <Dialog
      static={true}
      as={motion.div}
      open={isCardPopUpOpen}
      onClose={() => CloseCardPopUpState()}
      initial={{
        top: "8rem",
        right: "9rem",
        borderRadius: 8,
        height: 84,
      }}
      animate={{
        right: "22rem",
        height: "auto",
        pointerEvents: "none",
        transition: {
          right: {
            type: "spring",
            stiffness: 65,
            damping: 12,

            restDelta: 0.01,
          },
          height: {
            delay: 1,
            type: "spring",
            stiffness: 60,
            damping: 11.5,

            restDelta: 0.01,
          },
        },
        transitionEnd: { pointerEvents: "auto" },
      }}
      exit={{
        right: "3rem",
        height: 84,
        pointerEvents: "none",
        transition: {
          right: {
            type: "spring",
            stiffness: 60,
            damping: 13,
            delay: 0.8,
            restDelta: 0.01,
          },
          height: {
            type: "spring",
            stiffness: 60,
            damping: 13,

            restDelta: 0.01,
          },
        },
        transitionEnd: { pointerEvents: "auto" },
      }}
      className="fixed flex flex-col shadow-xl overflow-hidden w-[250px]  bg-theme-Slate-300"
    >
      <Dialog.Panel className={"p-2"}>
        <h2 className="h-8 font-medium text-theme-Gray-1000 text-sm px-2 py-[6px] my-[2px]">
          Join Channel
        </h2>
        <div className="h-8 font-medium text-theme-SteelGray-light text-sm px-2 py-[6px] my-[2px] rounded hover:text-theme-White hover:bg-theme-Brand">
          <span>Go to Server</span>
        </div>
        <motion.div
          animate={{
            backgroundColor: "hsl(230 6.12% 19.22%)",
            transition: { backgroundColor: { delay: 1.5 } },
          }}
          exit={{ backgroundColor: "unset" }}
          className="h-[1px]"
        />
        <div className="h-8 font-bold flex items-end text-theme-SteelGray-light text-xs px-2 py-[6px] my-[2px]">
          <span>OTHER MEMBERS - 3</span>
        </div>
        <div className="flex flex-col gap-[2px]">
          <div
            id="user"
            className="flex h-9 items-center  text-theme-SteelGray-light text-sm px-2 py-[6px]  rounded hover:text-theme-White hover:bg-theme-Brand"
          >
            <div
              onClick={() => {
                VisibleUserChat(secondaryUserOne);
              }}
              className="flex min-w-0 items-center gap-3"
            >
              <div className="relative shrink-0">
                <Image
                  src={secondaryImgOne}
                  alt={secondaryUserOne}
                  height={24}
                  width={24}
                  className="w-6 h-6 rounded-full "
                />
              </div>
              <div className="min-w-0  shrink-[1000]">
                <p className="text-ellipsis whitespace-nowrap font-medium leading-4 overflow-hidden max-w-max">
                  {secondaryUserOne}
                </p>
              </div>
            </div>
          </div>
          <div
            id="user"
            className="flex h-9 items-center  text-theme-SteelGray-light text-sm px-2 py-[6px]  rounded hover:text-theme-White hover:bg-theme-Brand"
          >
            <div
              onClick={() => VisibleUserChat(secondaryUserTwo)}
              className="flex min-w-0 items-center gap-3"
            >
              <div className="relative shrink-0">
                <Image
                  src={secondaryImgTwo}
                  alt={secondaryUserTwo}
                  height={24}
                  width={24}
                  className="w-6 h-6 rounded-full "
                />
              </div>
              <div className="min-w-0  shrink-[1000]">
                <p className="text-ellipsis whitespace-nowrap font-medium leading-4 overflow-hidden max-w-max">
                  {secondaryUserTwo}
                </p>
              </div>
            </div>
          </div>
          <div
            id="user"
            className="flex h-9 items-center  text-theme-SteelGray-light text-sm px-2 py-[6px]  rounded hover:text-theme-White hover:bg-theme-Brand"
          >
            <div
              onClick={() => VisibleUserChat(secondaryUserThree)}
              className="flex min-w-0 items-center gap-3"
            >
              <div className="relative shrink-0">
                <Image
                  src={secondaryImgThree}
                  alt={secondaryUserThree}
                  height={24}
                  width={24}
                  className="w-6 h-6 rounded-full "
                />
              </div>
              <div className="min-w-0  shrink-[1000]">
                <p className="text-ellipsis whitespace-nowrap font-medium leading-4 overflow-hidden max-w-max">
                  {secondaryUserThree}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
