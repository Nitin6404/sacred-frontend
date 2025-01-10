"use client";

import { useCallback } from "react";
import Jimp from "jimp";
import { useEditorStore } from "@/lib/store/editor";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Shape {
  id: string;
  name: string;
  path: string;
}

interface EditorElement {
  id: string;
  type: "text" | "image" | "shape";
  content: string;
  style: {
    position: { x: number; y: number };
    size: { width: number; height: number };
    backgroundColor?: string;
  };
}

const shapes: Shape[] = [
  {
    id: "rect",
    name: "Rectangle",
    path: "M 0 0 L 100 0 L 100 100 L 0 100 Z"
  },
  {
    id: "circle",
    name: "Circle",
    path: "M 50 0 A 50 50 0 1 0 50 100 A 50 50 0 1 0 50 0"
  },
  {
    id: "heart",
    name: "Heart",
    path: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
  },
  {
    id: "flower",
    name: "Flower",
    path: "M12 22c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9zm0-16c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.14-7-7 3.14-7 7-7zm0 5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
  },
  {
    id: "ring",
    name: "Ring",
    path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
  },
  {
    id: "dove",
    name: "Dove",
    path: "M23 11.5l-3.5-3.5V5c0-1.1-.9-2-2-2h-3L12 0 9.5 3h-3c-1.1 0-2 .9-2 2v3L1 11.5V15h3.5l3-3h2l2 2h2l2-2h2l3 3H23v-3.5z"
  }
];

export function ShapeLibrary() {
  const { addElement } = useEditorStore();

  const handleShapeClick = useCallback(
    async (shape: Shape) => {
      // Create a new Jimp image for the shape
      const image = new Jimp(100, 100, 0x00000000);

      // Draw the shape (basic shapes for now)
      if (shape.id === "rect") {
        image.scan(0, 0, 100, 100, (x, y) => {
          image.setPixelColor(Jimp.rgbaToInt(0, 0, 0, 255), x, y);
        });
      } else if (shape.id === "circle") {
        image.scan(0, 0, 100, 100, (x, y) => {
          const centerX = 50;
          const centerY = 50;
          const radius = 50;
          const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
          if (distance <= radius) {
            image.setPixelColor(Jimp.rgbaToInt(0, 0, 0, 255), x, y);
          }
        });
      }

      const newElement: Omit<EditorElement, "id"> = {
        type: "shape",
        content: await image.getBase64Async(Jimp.MIME_PNG),
        style: {
          position: { x: 100, y: 100 },
          size: { width: 100, height: 100 },
          backgroundColor: "#000000"
        }
      };

      addElement(newElement);
    },
    [addElement]
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Shape</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a Shape</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 p-4">
          {shapes.map((shape) => (
            <button
              key={shape.id}
              onClick={() => handleShapeClick(shape)}
              className="aspect-square rounded-lg border p-4 hover:border-primary"
            >
              <svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor">
                <path d={shape.path} />
              </svg>
              <span className="mt-2 block text-center text-sm">{shape.name}</span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
