"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "./button";
import { Slider } from "./slider";

interface MusicPlayerProps {
  musicUrl: string;
  musicType: "shehnai" | "rabindra_sangeet";
}

export default function MusicPlayer({ musicUrl, musicType }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([0.5]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0];
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="flex items-center gap-4 rounded-lg bg-white p-2 shadow">
      <audio ref={audioRef} src={musicUrl} loop onEnded={() => setIsPlaying(false)} />

      <Button variant="ghost" size="icon" onClick={togglePlay}>
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>

      <Button variant="ghost" size="icon" onClick={toggleMute}>
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </Button>

      <Slider className="w-24" min={0} max={1} step={0.1} value={volume} onValueChange={setVolume} />

      <span className="text-sm text-gray-600">{musicType === "shehnai" ? "Shehnai" : "Rabindra Sangeet"}</span>
    </div>
  );
}
