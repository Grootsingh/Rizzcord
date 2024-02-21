"use client";
import { users } from "@/UserData";
import { selectedBtn } from "@/components/RootRecoilProvider/RecoilStates";
import { useRecoilValue } from "recoil";
import { myProfilePic } from "@/UserData";

function getUserData(selectedUser) {
  const data = users.filter((eachUser) => eachUser.username === selectedUser);
  return data[0];
}

function GenerateSeachUserData() {
  const isSelected = useRecoilValue(selectedBtn);
  const selectedUser = isSelected !== "Friends" ? isSelected : undefined;

  const userData = getUserData(selectedUser);
  const { username, image } = userData;
  return [
    {
      image: image,
      name: username,
    },
    {
      image: myProfilePic,
      name: "RajatSingh",
    },
  ];
}
function GenerateSeachHelperUserData() {
  const isSelected = useRecoilValue(selectedBtn);
  const selectedUser = isSelected !== "Friends" ? isSelected : undefined;

  const userData = getUserData(selectedUser);
  const { username, image } = userData;
  return [
    {
      label: "from:",
      image: image,
      name: username,
    },
    {
      label: "from:",
      image: myProfilePic,
      name: "RajatSingh",
    },
  ];
}

export { getUserData, GenerateSeachUserData, GenerateSeachHelperUserData };
