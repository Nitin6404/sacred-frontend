"use client";

import { useEditorStore } from "@/lib/store/editor";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlayIcon, StopIcon } from "lucide-react";
import { useState } from "react";

const animations = [
  { value: "none", label: "None" },
  { value: "fade", label: "Fade In" },
  { value: "slide", label: "Slide In" },
  { value: "bounce", label: "Bounce" },
  { value: "rotate", label: "Rotate" },
  { value: "scale", label: "Scale" }
];

export function Animations() {
  const { selectedElement, updateElement } = useEditorStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationInstance, setAnimationInstance] = useState<number | null>(null);

  if (!selectedElement) return null;

  const handleAnimationChange = (animation: string) => {
    updateElement(selectedElement.id, {
      style: {
        ...selectedElement.style,
        animation
      }
    });
  };

  const playAnimation = () => {
    const fabricObject = window.canvas?.getActiveObject();
    if (!fabricObject) return;

    setIsPlaying(true);
    let frame = 0;

    const animate = () => {
      switch (selectedElement.style.animation) {
        case "fade":
          fabricObject.set("opacity", Math.sin(frame / 30));
          break;
        case "slide":
          fabricObject.set("left", fabricObject.left! + Math.sin(frame / 30) * 5);
          break;
        case "bounce":
          fabricObject.set("top", fabricObject.top! + Math.sin(frame / 15) * 10);
          break;
        case "rotate":
          fabricObject.rotate((frame * 2) % 360);
          break;
        case "scale":
          const scale = 1 + Math.sin(frame / 30) * 0.2;
          fabricObject.scale(scale);
          break;
      }

      window.canvas?.renderAll();
      frame++;

      if (isPlaying) {
        setAnimationInstance(requestAnimationFrame(animate));
      }
    };

    animate();
  };

  const stopAnimation = () => {
    setIsPlaying(false);
    if (animationInstance) {
      cancelAnimationFrame(animationInstance);
    }

    const fabricObject = window.canvas?.getActiveObject();
    if (!fabricObject) return;

    // Reset object properties
    fabricObject.set({
      opacity: 1,
      left: selectedElement.style.position.x,
      top: selectedElement.style.position.y,
      angle: selectedElement.style.rotation || 0,
      scaleX: 1,
      scaleY: 1
    });

    window.canvas?.renderAll();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Animation</Label>
        <Select value={selectedElement.style.animation || "none"} onValueChange={handleAnimationChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select animation" />
          </SelectTrigger>
          <SelectContent>
            {animations.map((animation) => (
              <SelectItem key={animation.value} value={animation.value}>
                {animation.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedElement.style.animation !== "none" && (
        <>
          <div className="space-y-2">
            <Label>Animation Speed</Label>
            <Slider
              defaultValue={[selectedElement.style.animationSpeed || 50]}
              max={100}
              step={1}
              onValueChange={([value]) => {
                updateElement(selectedElement.id, {
                  style: {
                    ...selectedElement.style,
                    animationSpeed: value
                  }
                });
              }}
            />
          </div>

          <div className="flex space-x-2">
            {!isPlaying ? (
              <Button variant="outline" size="sm" onClick={playAnimation} className="w-full">
                <PlayIcon className="mr-2 h-4 w-4" />
                Preview
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={stopAnimation} className="w-full">
                <StopIcon className="mr-2 h-4 w-4" />
                Stop
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
