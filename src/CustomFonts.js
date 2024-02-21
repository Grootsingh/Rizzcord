import localFont from "next/font/local";

const ggSans = localFont({
  src: [
    {
      path: "./../public/assets/fonts/gg-sans-light.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./../public/assets/fonts/gg-sans-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./../public/assets/fonts/gg-sans-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./../public/assets/fonts/gg-sans-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./../public/assets/fonts/gg-sans-extrabold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--gg-sans",
});

const ConsolaFont = localFont({
  src: "./../public/assets/fonts/Consolas.woff2",
  variable: "--ConsalasFont",
});
const AndalemoFont = localFont({
  src: "./../public/assets/fonts/ANDALEMO.woff2",
  variable: "--AndalemoFont",
});

export { ggSans, ConsolaFont, AndalemoFont };
