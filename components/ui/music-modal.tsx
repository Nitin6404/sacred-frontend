"use client";

import { useState } from "react";
import { X, Play, Pause } from "lucide-react";
import { Dialog, DialogContent } from "./dialog";
import { Button } from "./button";

interface MusicOption {
  id: string;
  type: "shehnai" | "rabindra_sangeet";
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
    name: "Wedding Shehnai",
    url: "/music/shehnai-2.mp3"
  },
  {
    id: "rabindra-1",
    type: "rabindra_sangeet",
    name: "Tumi Robe Nirobe",
    url: "/music/rabindra-1.mp3"
  },
  {
    id: "rabindra-2",
    type: "rabindra_sangeet",
    name: "Aguner Poroshmoni",
    url: "/music/rabindra-2.mp3"
  }
];

interface MusicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (music: { type: "shehnai" | "rabindra_sangeet"; url: string }) => void;
  selectedMusic?: { type: "shehnai" | "rabindra_sangeet"; url: string } | null;
}

export default function MusicModal({ isOpen, onClose, onSelect, selectedMusic }: MusicModalProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const handlePlay = (music: MusicOption) => {
    if (playingId === music.id) {
      currentAudio?.pause();
      setPlayingId(null);
      setCurrentAudio(null);
    } else {
      currentAudio?.pause();
      const audio = new Audio(music.url);
      audio.play();
      setPlayingId(music.id);
      setCurrentAudio(audio);
    }
  };

  const handleSelect = (music: MusicOption) => {
    currentAudio?.pause();
    onSelect({
      type: music.type,
      url: music.url
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="text-lg font-semibold">Select Background Music</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4">
          <div className="space-y-4">
            <h4 className="font-medium">Shehnai</h4>
            {MUSIC_OPTIONS.filter((m) => m.type === "shehnai").map((music) => (
              <div key={music.id} className="flex items-center justify-between rounded-lg border p-3 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" onClick={() => handlePlay(music)}>
                    {playingId === music.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <span>{music.name}</span>
                </div>
                <Button
                  variant={selectedMusic?.url === music.url ? "secondary" : "ghost"}
                  onClick={() => handleSelect(music)}
                >
                  {selectedMusic?.url === music.url ? "Selected" : "Select"}
                </Button>
              </div>
            ))}

            <h4 className="mt-6 font-medium">Rabindra Sangeet</h4>
            {MUSIC_OPTIONS.filter((m) => m.type === "rabindra_sangeet").map((music) => (
              <div key={music.id} className="flex items-center justify-between rounded-lg border p-3 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" onClick={() => handlePlay(music)}>
                    {playingId === music.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <span>{music.name}</span>
                </div>
                <Button
                  variant={selectedMusic?.url === music.url ? "secondary" : "ghost"}
                  onClick={() => handleSelect(music)}
                >
                  {selectedMusic?.url === music.url ? "Selected" : "Select"}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t p-4">
          <Button variant="secondary" className="w-full" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
