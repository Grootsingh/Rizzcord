"use clinet";
import React from "react";
import { useAnimationControls } from "framer-motion";
function useMusicPopUpKeyframe(LineOneRef, LineTwoRef) {
  const LineOneControl = useAnimationControls();
  const LineTwoControl = useAnimationControls();
  const ContainerControl = useAnimationControls();

  const sequenceAnimation = async () => {
    try {
      await ContainerControl.start({
        y: 0,
        borderRadius: 8,
        width: "auto",
        transition: {
          width: {
            delay: 1,
            type: "spring",
            stiffness: 60,
            damping: 11.5,
          },

          borderRadius: { delay: 1.2 },
          type: "spring",
        },
      });
      await LineOneControl.start({
        opacity: 1,
        display: "block",
      });

      const LineOneWidth = LineOneRef.current?.scrollWidth;
      const LineTwoWidth = LineTwoRef.current?.scrollWidth;

      LineOneControl?.start({
        y: -50,
        transition: { delay: 4.2, duration: 0.5 },
      });
      await LineTwoControl.start({
        opacity: 1,
        y: -40,
        width: [LineOneWidth, LineTwoWidth + 8],
        transition: {
          y: {
            delay: 4.5,
            duration: 0.5,
            type: "spring",
            stiffness: 60,
            damping: 11.5,
          },
          width: {
            delay: 1,
            type: "spring",
            duration: 2.8,
            bounce: 0.26,
          },
        },
      });

      LineTwoControl.start({
        opacity: 0,
        transition: { delay: 4 },
      });
      await ContainerControl.start({
        borderRadius: 20,
        width: 40,
        y: [0, -10],

        transition: {
          width: {
            delay: 4.2,
            type: "spring",
            stiffness: 60,
            damping: 11.5,
          },
          y: { delay: 5, type: "spring", stiffness: 60, damping: 11.5 },

          borderRadius: { delay: 4.2 },
          type: "spring",
        },
      });
      ContainerControl.start({
        y: "175%",

        transition: {
          y: { type: "spring", stiffness: 60, damping: 10 },
        },
      });
    } catch (error) {
      // un-relevant Error
      // controls.start() should only be called after a component has mounted.
    }
  };

  React.useEffect(() => {
    sequenceAnimation();
    return () => {
      ContainerControl.stop();
      LineOneControl.stop();
      LineTwoControl.stop();
    };
  }, []);

  return [ContainerControl, LineOneControl, LineTwoControl];
}

export default useMusicPopUpKeyframe;
