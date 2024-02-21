import React, { Suspense } from "react";
import IconStyle from "./IconStyle";
import { DiscordIcon, DiscoverIcon, PlusIcon, DownloadIcon } from "@/Icons";
import MediaPlayer from "../MediaPlayer";
import Link from "next/link";

function PrimaryNav() {
  return (
    <>
      <div className="z-10 shrink-0 w-[4.5rem] text-white flex gap-2 flex-col items-center pt-3 bg-theme-DarkGray-900">
        <Link href={""} id={"active-link"} className="group">
          <IconStyle text="Direct Message" varient="primary">
            <DiscordIcon className="w-[1.875rem] h-[1.875rem]" />
          </IconStyle>
        </Link>
        <div className="h-[2px] w-8 bg-theme-Driftwood-grey rounded-full"></div>
        <Link href={""} className="group">
          <IconStyle text="Add a Server" varient="secondary">
            <PlusIcon className="w-6 h-6" />
          </IconStyle>
        </Link>
        <Link href={""} className="group">
          <IconStyle text="Explore Discoverable Server" varient="secondary">
            <DiscoverIcon className="w-6 h-6" />
          </IconStyle>
        </Link>
        <div className="h-[2px] w-8 bg-theme-Driftwood-grey rounded-full"></div>
        <Link href={""} className="group">
          <IconStyle text="Download Apps" varient="secondary">
            <DownloadIcon className="w-6 h-6" />
          </IconStyle>
        </Link>
      </div>
      {/* MediaPlaer is Placed Here so Music can be Listened to Complete App */}
      <Suspense>
        <MediaPlayer />
      </Suspense>
    </>
  );
}

export default PrimaryNav;
