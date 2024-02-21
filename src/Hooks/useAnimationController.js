"use clinet";
import React from "react";
import { animate } from "framer-motion";

function useAnimationController(ElementRef) {
  const controlAnimation = React.useRef();
  React.useEffect(() => {
    const control = animate(
      ElementRef.current,
      { x: "0%" },
      {
        repeat: Infinity,
        duration: 10,
        type: "tween",
        ease: "linear",
      }
    );
    controlAnimation.current = control;
  }, []);

  return controlAnimation;
}

export default useAnimationController;
