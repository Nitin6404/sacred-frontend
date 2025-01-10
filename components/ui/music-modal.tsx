"use client";

import { useEffect, useState } from "react";
import { X, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Dialog, DialogContent } from "./dialog";
import { Button } from "./button";
import { Slider } from "./slider";
import { useToast } from "./use-toast";
import type { Music } from "@/lib/store/editor";

interface MusicOption {
  id: string;
  type: Music["type"];
  name: string;
  url: string;
}

const MUSIC_OPTIONS: MusicOption[] = [
  {
    id: "shehnai-1",
    type: "shehnai",
    name: "Traditional Shehnai",
    url: "/music/shehnai-1.mp3"
  },
  {
    id: "shehnai-2",
    type: "shehnai",
    name: "Modern Shehnai",
    url: "/music/shehnai-2.mp3"
  },
  {
    id: "rabindra-1",
    type: "rabindra",
    name: "Rabindra Sangeet",
    url: "/music/rabindra-1.mp3"
  }
];

interface MusicModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (music: Music) => void;
  selectedMusic?: Music | null;
}

interface AudioState {
  url: string | null;
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
  volume: number;
}

export function MusicModal({ open, onOpenChange, onSelect, selectedMusic }: MusicModalProps) {
  const { toast } = useToast();
  const [audioState, setAudioState] = useState<AudioState>({
    url: null,
    isPlaying: false,
    isLoading: false,
    error: null,
    volume: selectedMusic?.volume ?? 1
  });
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.src = "";
      }
    };
  }, [audio]);

  const handlePlay = async (url: string) => {
    try {
      if (audioState.url === url && audioState.isPlaying) {
        audio?.pause();
        setAudioState((prev) => ({ ...prev, isPlaying: false }));
        return;
      }

      setAudioState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
        url
      }));

      const newAudio = new Audio(url);
      newAudio.volume = audioState.volume;

      await new Promise((resolve, reject) => {
        newAudio.oncanplaythrough = resolve;
        newAudio.onerror = reject;
        newAudio.load();
      });

      if (audio) {
        audio.pause();
        audio.src = "";
      }

      await newAudio.play();
      setAudio(newAudio);
      setAudioState((prev) => ({
        ...prev,
        isPlaying: true,
        isLoading: false
      }));
    } catch (error) {
      console.error("Error playing audio:", error);
      setAudioState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Failed to load audio file"
      }));
      toast({
        title: "Error",
        description: "Failed to play audio. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleVolumeChange = (value: number) => {
    if (audio) {
      audio.volume = value;
    }
    setAudioState((prev) => ({ ...prev, volume: value }));
  };

  const handleSelect = (option: MusicOption) => {
    onSelect({
      type: option.type,
      url: option.url,
      volume: audioState.volume
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Choose Music</h2>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => handleVolumeChange(audioState.volume === 0 ? 1 : 0)}>
              {audioState.volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Slider
              value={[audioState.volume * 100]}
              max={100}
              step={1}
              onValueChange={([value]) => handleVolumeChange(value / 100)}
              className="w-[120px]"
            />
          </div>

          <div className="space-y-2">
            {MUSIC_OPTIONS.map((option) => (
              <div
                key={option.id}
                className={`flex items-center justify-between rounded-lg border p-3 ${
                  selectedMusic?.url === option.url ? "border-blue-500 bg-blue-50" : ""
                }`}
              >
                <div>
                  <h3 className="font-medium">{option.name}</h3>
                  <p className="text-sm text-gray-500">{option.type.replace("_", " ")}</p>
                  {audioState.error && audioState.url === option.url && (
                    <p className="text-sm text-red-500">{audioState.error}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handlePlay(option.url)}
                    disabled={audioState.isLoading && audioState.url === option.url}
                  >
                    {audioState.isLoading && audioState.url === option.url ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                    ) : audioState.isPlaying && audioState.url === option.url ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant={selectedMusic?.url === option.url ? "default" : "outline"}
                    onClick={() => handleSelect(option)}
                  >
                    {selectedMusic?.url === option.url ? "Selected" : "Select"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
