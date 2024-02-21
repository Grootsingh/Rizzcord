"use client";
import { atom } from "recoil";

export const selectedBtn = atom({
  key: `
  src\components\Dashboard\SelectedUserDashboard\SelectedUserHeader\SubHeaderLeft.js,
  src\components\Dashboard\Dashboard.js,
  src\components\SecondaryNav\UserSecondaryNav\DirectMessage\UsersList.js,
  src\components\SecondaryNav\UserSecondaryNav\UserPanel.js,
  
  `,
  default: "Friends",
});

export const activeHeaderBtn = atom({
  key: `
  src\components\Dashboard\UserDashboard\DashboardHeader\SubHeaderLeft.js,
  src\components\Dashboard\UserDashboard\DashboardMain\DashboardMain.js,

  `,
  default: "Online",
});

export const isReplyToMessage = atom({
  key: `
  src\components\Dashboard\SelectedUserDashboard\SelectedUserMain\SelectedUserMain.js
  `,
  default: {},
});

export const showUserProfieState = atom({
  key: `
  src\components\Dashboard\SelectedUserDashboard\SelectedUserHeader\SubHeaderRight\IconButton.js
  src\components\Dashboard\SelectedUserDashboard\SelectedUserAside\SelectedUserAside.js
  `,
  default: true,
});

export const MediaPlayState = atom({
  key: `
  src\components\Dashboard\UserDashboard\DashboardAside\SmallCard\SmallCard.js
  src\components\PrimaryNav\PrimaryNav.js
  `,
  default: false,
});
