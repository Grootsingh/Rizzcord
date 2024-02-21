import "./globals.css";
import PrimaryNav from "@/components/PrimaryNav";
import { ggSans, ConsolaFont, AndalemoFont } from "@/CustomFonts";
import React from "react";
import RootRecoilProvider from "@/components/RootRecoilProvider";
export const metadata = {
  title: "Rizzcord",
  description: "We Don't Diss We Rizz",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${ggSans.className} ${ggSans.variable} ${ConsolaFont.variable} ${AndalemoFont.variable}`}
      >
        <RootRecoilProvider>
          <div className="flex h-full overflow-hidden">
            <PrimaryNav />

            {children}
          </div>
        </RootRecoilProvider>
      </body>
    </html>
  );
}
