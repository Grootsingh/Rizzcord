"use client";
import React from "react";
import { MediaPlayState } from "../RootRecoilProvider/RecoilStates";
import { useRecoilState } from "recoil";
function MediaPlayer() {
  const [isPlaying, setIsPlaying] = useRecoilState(MediaPlayState);

  const audioRef = React.useRef();

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (
        (event.ctrlKey ||
          event.code === "MetaLeft" ||
          event.code === "MetaRight") &&
        event.code === "KeyM"
      ) {
        setIsPlaying((currentIsPlaying) => {
          return !currentIsPlaying;
        });
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  React.useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  return (
    <audio
      ref={audioRef}
      onEnded={() => {
        setIsPlaying(false);
      }}
    >
      <source src="/assets/music/BananaMusic.mp3" type="audio/mp3" />
    </audio>
  );
}

export default MediaPlayer;
