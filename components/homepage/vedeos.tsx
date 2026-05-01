"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function Vedeos() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const handleToggleMute = async () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    if (video.paused) {
      try {
        await video.play();
      } catch {
        // Playback can still require a user gesture in some browsers.
      }
    }
  };

  return (
    <section aria-label="Liquid x Sacrament video" className="relative w-full">
      <video
        ref={videoRef}
        className="block max-h-[85svh] w-full bg-black object-cover"
        autoPlay
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
      >
        <source src="/Liquid x SaCraMent.mp4" type="video/mp4" />
      </video>

      <button
        type="button"
        onClick={handleToggleMute}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
        className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-black/65 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-black/80"
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        {isMuted ? "Unmute" : "Mute"}
      </button>
    </section>
  );
}
