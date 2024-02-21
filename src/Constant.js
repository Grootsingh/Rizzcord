import {
  AnimeChat,
  MusicChat,
  LeanCodingChat,
  FrontendDevelopmentChat,
} from "@/UserChatData";

import {
  FriendIcon,
  HomeIcon,
  NitroIcon,
  ArrowDownIcon,
  PinIcon,
  ArrowLeftCurveIcon,
  CopyTextIcon,
  MarkAsUnReadIcon,
  CopyMsgLinkIcon,
  SpeakMsgIcon,
  RedFlagIcon,
} from "./Icons";

export const differentChatOption = [
  AnimeChat,
  MusicChat,
  FrontendDevelopmentChat,
  LeanCodingChat,
];

export const InboxPopupBtn = [
  { status: "For You", id: 1 },
  { status: "Unreads", id: 2 },
  { status: "Mentions", id: 3 },
];

export const MuteUser = [
  "For 15 Minutes",
  "For 1 Hour",
  "For 3 Hours",
  "For 8 Hours",
  "For 24 Hours",
  "Untill i turn it back on",
];

export const UserSubheaderLeftBtn = [
  { status: "Online", id: 1 },
  { status: "All", id: 2 },
  { status: "Panding", id: 3 },
  { status: "Blocked", id: 4 },
];

export const UserPanelArr = [
  { Icon: FriendIcon, Id: 1, Text: "Friends" },
  { Icon: NitroIcon, Id: 2, Text: "Nitro" },
  { Icon: HomeIcon, Id: 3, Text: "Shop" },
];

export const SearchOptions = [
  {
    label: "from:",
    value: "user",
  },
  {
    label: "mentions:",
    value: "user",
  },
  {
    label: "has:",
    value: "link, embed or file",
  },
  {
    label: "before:",
    value: "specific date",
  },
  {
    label: "during:",
    value: "specific range",
  },
  {
    label: "after:",
    value: "specific date",
  },
  {
    label: "pinned:",
    value: "true or false",
  },
];

export const hasData = [
  "link",
  "embed",
  "file",
  "video",
  "image",
  "sound",
  "sticker",
];

export const pinnedData = ["True", "False"];

export const subhasData = [
  {
    label: "has:",
    value: "sound",
  },
  {
    label: "has:",
    value: "sticker",
  },
];

export const DatesData = [
  {
    label: "before:",
    value: "august",
  },
  {
    label: "during:",
    value: "august",
  },
  {
    label: "after:",
    value: "august",
  },
];

export const MorePopUpArr = [
  {
    id: 1,
    text: "Add Reaction",
    icon: ArrowDownIcon,
  },
  {
    id: 2,
    text: "Pin Message",
    icon: PinIcon,
  },
  {
    id: 3,
    text: "Reply",
    icon: ArrowLeftCurveIcon,
  },
  {
    id: 4,
    text: "Copy Text",
    icon: CopyTextIcon,
  },
  {
    id: 5,
    text: "App",
    icon: ArrowDownIcon,
  },
  {
    id: 6,
    text: "Mark Unread",
    icon: MarkAsUnReadIcon,
  },
  {
    id: 8,
    text: "Copy Message Link",
    icon: CopyMsgLinkIcon,
  },
  {
    id: 9,
    text: "Speak Message",
    icon: SpeakMsgIcon,
  },
  {
    id: 10,
    text: "Report Message",
    icon: RedFlagIcon,
  },
];
