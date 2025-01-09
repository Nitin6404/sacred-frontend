"use client";

import { useEditorStore } from "@/lib/store/editor";
import { Button } from "@/components/ui/button";
import { Type, Image, Square, Undo2, Redo2, Save, Music2 } from "lucide-react";
import { MusicModal } from "@/components/ui/music-modal";
import { useState } from "react";

export const EditorToolbar = () => {
  const { addElement, undo, redo, saveState, setMusic } = useEditorStore();

  const [showMusicModal, setShowMusicModal] = useState(false);

  const handleAddText = () => {
    addElement({
      type: "text",
      content: "New Text",
      style: {
        position: { x: 100, y: 100 },
        size: { width: 200, height: 50 },
        fontFamily: "Inter",
        fontSize: 16,
        color: "#000000"
      }
    });
  };

  const handleAddImage = () => {
    // Implement image upload logic
    addElement({
      type: "image",
      content: "/placeholder.png",
      style: {
        position: { x: 100, y: 100 },
        size: { width: 200, height: 200 }
      }
    });
  };

  const handleAddShape = () => {
    addElement({
      type: "shape",
      content: "rectangle",
      style: {
        position: { x: 100, y: 100 },
        size: { width: 100, height: 100 },
        backgroundColor: "#000000"
      }
    });
  };

  return (
    <>
      <div className="flex h-16 items-center justify-between border-b px-4">
        <div className="space-x-2">
          <Button onClick={handleAddText}>
            <Type className="mr-2 h-4 w-4" />
            Add Text
          </Button>
          <Button onClick={handleAddImage}>
            <Image className="mr-2 h-4 w-4" />
            Add Image
          </Button>
          <Button onClick={handleAddShape}>
            <Square className="mr-2 h-4 w-4" />
            Add Shape
          </Button>
          <Button onClick={() => setShowMusicModal(true)}>
            <Music2 className="mr-2 h-4 w-4" />
            Add Music
          </Button>
        </div>

        <div className="space-x-2">
          <Button variant="outline" onClick={undo}>
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={redo}>
            <Redo2 className="h-4 w-4" />
          </Button>
          <Button variant="default" onClick={saveState}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <MusicModal
        open={showMusicModal}
        onOpenChange={setShowMusicModal}
        onSelect={(music) => {
          setMusic(music);
          setShowMusicModal(false);
        }}
      />
    </>
  );
};
