"use client";
import React from "react";
import { classNames } from "@/utils";
import { selectedBtn } from "@/components/RootRecoilProvider/RecoilStates";
import { useRecoilState } from "recoil";
import { UserPanelArr } from "@/Constant";

function UserPanel() {
  const [isSelected, setIsSelected] = useRecoilState(selectedBtn);

  function FriendIsSelected() {
    setIsSelected("Friends");
  }

  return (
    <>
      {UserPanelArr.map(({ Icon, Id, Text }) => (
        <UserPanelIcon
          key={Id}
          icon={Icon}
          isSelected={isSelected}
          FriendIsSelected={FriendIsSelected}
        >
          {Text}
        </UserPanelIcon>
      ))}
    </>
  );
}

export default UserPanel;

function UserPanelIcon({ icon: Icon, children, isSelected, FriendIsSelected }) {
  return (
    <div
      onClick={() => {
        if (children === "Friends") {
          FriendIsSelected();
        }
      }}
      className={classNames(
        isSelected === children && `text-white bg-theme-Graphite-700`,
        ` flex items-center h-10 cursor-pointer rounded-sm hover:bg-theme-Driftwood-grey hover:text-theme-LightGray-400 p-2 gap-3 text-theme-SteelGray-500 `
      )}
    >
      <div className="h-8 w-8 grid place-content-center">
        <Icon className="h-6 w-6" />
      </div>
      <span className="font-medium text-base">{children}</span>
    </div>
  );
}
