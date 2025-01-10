"use client";

import { useEffect, useRef, useState } from "react";
import { useEditorStore } from "@/lib/store/editor";
import { ElementStyle } from "@/types/editor";
import Jimp from "jimp";

interface EditorElement {
  id: string;
  type: "text" | "image" | "shape";
  content: string;
  style: ElementStyle;
}

export function EditorCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [jimpImage, setJimpImage] = useState<Jimp | null>(null);
  const { selectedElement, setSelectedElement, pages, currentPage } = useEditorStore();

  // Initialize canvas and Jimp image
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 800;
    canvas.height = 600;

    const initCanvas = async () => {
      try {
        const image = await new Jimp(800, 600, 0xffffffff);
        setJimpImage(image);
        await renderToCanvas(image, canvas);
      } catch (err) {
        console.error("Error creating Jimp image:", err);
      }
    };

    initCanvas();
  }, []);

  // Render Jimp image to canvas
  const renderToCanvas = async (image: Jimp, canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
      const blob = new Blob([buffer], { type: "image/png" });
      const url = URL.createObjectURL(blob);

      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
      };
      img.src = url;
    } catch (err) {
      console.error("Error rendering to canvas:", err);
    }
  };

  // Update canvas when elements change
  useEffect(() => {
    if (!jimpImage || !canvasRef.current) return;

    const updateCanvas = async () => {
      try {
        const image = jimpImage.clone();
        image.background(0xffffffff);

        // Render all elements
        for (const element of pages[currentPage].elements) {
          const { x, y } = element.style.position;
          const { width, height } = element.style.size;

          if (element.type === "image" || element.type === "shape") {
            const elementImage = await Jimp.read(element.content);
            elementImage.resize(width, height);
            image.composite(elementImage, x, y);
          } else if (element.type === "text") {
            const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
            image.print(font, x, y, element.content);
          }
        }

        await renderToCanvas(image, canvasRef.current);
      } catch (err) {
        console.error("Error updating canvas:", err);
      }
    };

    updateCanvas();
  }, [pages, currentPage, jimpImage]);

  // Handle element selection
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Find clicked element
    const elements = pages[currentPage].elements;
    for (let i = elements.length - 1; i >= 0; i--) {
      const element = elements[i];
      const { position, size } = element.style;

      if (x >= position.x && x <= position.x + size.width && y >= position.y && y <= position.y + size.height) {
        setSelectedElement(element.id);
        return;
      }
    }

    setSelectedElement(null);
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-gray-100 p-4">
      <canvas ref={canvasRef} onClick={handleCanvasClick} className="border bg-white shadow-lg" />
    </div>
  );
}
