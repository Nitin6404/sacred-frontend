"use client";

import { useEditorStore } from "@/lib/store/editor";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const musicTypes = [
  { value: "shehnai", label: "Shehnai" },
  { value: "rabindra", label: "Rabindra Sangeet" }
];

export function MusicCustomization() {
  const { music, setMusic, currentLanguage, updateMusicTitle, updateMusicVolume } = useEditorStore();

  const handleMusicTypeChange = (type: "shehnai" | "rabindra") => {
    if (!music) return;
    setMusic({
      ...music,
      type
    });
  };

  const handleTitleChange = (title: string) => {
    updateMusicTitle(currentLanguage, title);
  };

  const handleVolumeChange = (value: number[]) => {
    updateMusicVolume(value[0]);
  };

  const currentTitle = music?.title?.[currentLanguage] || "";

  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <Label>Music Type</Label>
        <Select value={music?.type} onValueChange={(value: "shehnai" | "rabindra") => handleMusicTypeChange(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select music type" />
          </SelectTrigger>
          <SelectContent>
            {musicTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Title ({currentLanguage.toUpperCase()})</Label>
        <Input
          value={currentTitle}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder={`Enter title in ${currentLanguage === "en" ? "English" : "Bengali"}...`}
          className={currentLanguage === "bn" ? "font-bengali" : ""}
        />
      </div>

      <div className="space-y-2">
        <Label>Volume</Label>
        <Slider defaultValue={[music?.volume || 50]} max={100} step={1} onValueChange={handleVolumeChange} />
      </div>
    </div>
  );
}
