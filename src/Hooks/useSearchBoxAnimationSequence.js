"use client";
import React from "react";
import { useMotionValue, useAnimationControls } from "framer-motion";

function useSearchBoxAnimationSequence(
  isSelected,
  isInput,
  searchBoxIsInFocus,
  growSearchBar
) {
  const SearchBoxControl = useAnimationControls();
  const SearchOptionControl = useAnimationControls();
  const SearchOptionExitValue = useMotionValue();
  const delayExitValue = useMotionValue();
  const isDeleteHistory = React.useRef(false);
  const OptionInitalState = useMotionValue(false);
  const flow = React.useRef("from searchBox to searchOption");

  const SelectedUserSearchBoxKeyframe = async () => {
    if (growSearchBar) {
      // Grow SearchBox
      SearchBoxControl.start(
        { width: 290 },
        {
          type: "spring",
          stiffness: 60,
          damping: 15,
        }
      );
      if (
        isSelected.length === 0 &&
        isInput.length === 0 &&
        flow.current === "from searchBox to searchOption" &&
        isDeleteHistory.current === false
      ) {
        // Expand SearchOption
        SearchOptionControl.start(
          {
            clipPath: [
              "polygon(0 0, 100% 0, 100% 0, 0 0)",
              "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            ],
          },
          {
            delay: 0.6,
            type: "tween",
            duration: 0.6,
            ease: "easeOut",
          }
        );
        OptionInitalState.set(false);
        delayExitValue.set({
          height: 0,
          transition: { type: "tween", ease: "easeOut" },
        });
      } else if (
        flow.current === "from Other options to searchOption" ||
        isDeleteHistory.current === true ||
        (isSelected.length === 0 && isInput.length > 0)
      ) {
        SearchOptionControl.start(false);
        flow.current = "from searchBox to searchOption";
        OptionInitalState.set(false);
        // delayExitValue.set({
        //   height: 0,
        //   transition: {
        //     type: "spring",
        //     duration: 0.8,
        //     bounce: 0.2,
        //     delay: 0.3,
        //   },
        // });
        delayExitValue.set({
          height: 0,
          transition: { type: "tween", ease: "easeOut", delay: 0.3 },
        });
        isDeleteHistory.current = false;
      }
    } else if (!growSearchBar) {
      //shrink SearchOption
      SearchOptionExitValue.set({
        clipPath: [
          "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          "polygon(0 0, 100% 0, 100% 0, 0 0)",
        ],
        transition: {
          clipPath: {
            type: "tween",
            ease: "easeIn",
            duration: 0.4,
          },
        },
      });

      // Shrink SearchBox
      SearchBoxControl.start(
        { width: 144 },
        {
          width: {
            type: "spring",
            stiffness: 60,
            damping: 15,
            delay: 0.5,
          },
        }
      );
    }

    if (
      (isSelected[0] === "from:" ||
        isSelected[0] === "mentions:" ||
        isSelected[0] === "has:" ||
        isSelected[0] === "pinned:" ||
        isSelected[0] === "before:" ||
        isSelected[0] === "before:" ||
        isSelected[0] === "after:" ||
        isSelected[0] === "during:") &&
      isInput.length === 0 &&
      searchBoxIsInFocus &&
      isSelected.length < 2
    ) {
      flow.current = "from Other options to searchOption";
    } else if (isSelected.length >= 2 || isInput.length > 0) {
      OptionInitalState.set({ height: 0 });
    }

    if (isSelected.length === 0 && isInput.length > 0) {
      flow.current = "from Other options to searchOption";
    }
    if (!searchBoxIsInFocus) {
      OptionInitalState.set({ height: 0 });
    }
  };

  React.useEffect(() => {
    SelectedUserSearchBoxKeyframe();
  });

  return [
    SearchBoxControl,
    SearchOptionControl,
    OptionInitalState,
    SearchOptionExitValue,
    delayExitValue,
    isDeleteHistory,
  ];
}

export default useSearchBoxAnimationSequence;
