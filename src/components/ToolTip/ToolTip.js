"use client";
import React from "react";
import PopUp from "./PopUp";
import usePosition from "@/Hooks/usePosition";

function ToolTip({ children, text, direction, size = "small" }) {
  const [isPopUpOpen, setIsPopUpOpen] = React.useState(false);
  const elementRef = React.useRef();
  const elementCenterPosition = usePosition(elementRef, isPopUpOpen);

  return (
    <>
      <div
        onMouseEnter={() => setIsPopUpOpen(true)}
        onMouseLeave={() => setIsPopUpOpen(false)}
        ref={elementRef}
        className="isolate"
      >
        {children}

        {isPopUpOpen ? (
          <PopUp
            text={text}
            position={elementCenterPosition}
            direction={direction}
            size={size}
          />
        ) : undefined}
      </div>
    </>
  );
}

export default ToolTip;
