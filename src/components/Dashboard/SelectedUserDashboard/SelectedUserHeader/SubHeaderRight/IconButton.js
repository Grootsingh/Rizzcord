"use clinet";
import React from "react";
import { showUserProfieState } from "@/components/RootRecoilProvider/RecoilStates";
import { useRecoilState } from "recoil";
import { classNames } from "@/utils";
import ToolTip from "@/components/ToolTip";

function IconButton({
  text,
  icon: Icon,
  FlipInBoxFn = "",
  isInboxOpen = false,
  isDMDialogOpen = false,
  isPinOpen = false,
}) {
  const [isOpen, setOpen] = React.useState(false);
  const [isSelected, setSelected] = useRecoilState(showUserProfieState);

  React.useEffect(() => {
    if (text === "Show User Profile" && window.innerWidth > 1280) {
      setSelected((curr) => !curr);
    } else if (window.innerWidth <= 1280) {
      setSelected(false);
    }
  }, [isOpen, text, setSelected]);

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 1280) {
        setSelected(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSelected]);

  React.useEffect(() => {
    if (isInboxOpen === false) {
      setOpen(false);
    }
  }, [isInboxOpen]);

  React.useEffect(() => {
    if (isDMDialogOpen === false) {
      setOpen(false);
    }
  }, [isDMDialogOpen]);

  React.useEffect(() => {
    if (isPinOpen === false) {
      setOpen(false);
    }
  }, [isPinOpen]);

  return (
    <ToolTip direction={"Down"} text={text}>
      <Icon
        onClick={() => {
          setOpen((curr) => !curr);
          if (text === "Inbox") {
            FlipInBoxFn();
          }
        }}
        className={classNames(
          isOpen && text !== "Show User Profile" && `text-theme-LightGray-500`,
          isSelected &&
            text === "Show User Profile" &&
            `text-theme-LightGray-500`,
          `h-6 w-6 hover:text-theme-LightGray-300`
        )}
      />
    </ToolTip>
  );
}

export default IconButton;
