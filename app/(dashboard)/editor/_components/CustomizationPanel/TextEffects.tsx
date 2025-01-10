"use client";

import { useCallback } from "react";
import Jimp from "jimp";
import { useEditorStore } from "@/lib/store/editor";
import { Button } from "@/components/ui/button";
import { EditorElement, ElementStyle } from "@/types/editor";

type EffectType = ElementStyle["effect"];

const effects: { id: EffectType; name: string }[] = [
  { id: "shadow", name: "Shadow" },
  { id: "outline", name: "Outline" },
  { id: "glow", name: "Glow" }
];

export function TextEffects() {
  const { selectedElement, updateElement, pages, currentPage } = useEditorStore();

  const applyEffect = useCallback(
    async (effectId: EffectType) => {
      if (!selectedElement) return;

      const element = pages[currentPage].elements.find((el: EditorElement) => el.id === selectedElement);
      if (!element || element.type !== "text") return;

      try {
        // Create a new Jimp image for the text
        const image = new Jimp(500, 200, 0x00000000);
        const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);

        switch (effectId) {
          case "shadow": {
            // Draw shadow
            const shadowImage = new Jimp(500, 200, 0x00000000);
            await shadowImage.print(font, 2, 2, element.content);
            shadowImage.opacity(0.5);

            // Draw main text
            await image.composite(shadowImage, 0, 0);
            await image.print(font, 0, 0, element.content);
            break;
          }
          case "outline": {
            // Draw outline
            const positions = [
              [-1, -1],
              [0, -1],
              [1, -1],
              [-1, 0],
              [1, 0],
              [-1, 1],
              [0, 1],
              [1, 1]
            ];

            for (const [x, y] of positions) {
              const outlineImage = new Jimp(500, 200, 0x00000000);
              await outlineImage.print(font, x, y, element.content);
              outlineImage.opacity(0.5);
              await image.composite(outlineImage, 0, 0);
            }

            // Draw main text
            await image.print(font, 0, 0, element.content);
            break;
          }
          case "glow": {
            // Draw glow effect
            const glowImage = new Jimp(500, 200, 0x00000000);
            await glowImage.print(font, 0, 0, element.content);
            glowImage.blur(5);
            glowImage.opacity(0.3);

            // Draw main text
            await image.composite(glowImage, 0, 0);
            await image.print(font, 0, 0, element.content);
            break;
          }
        }

        const newContent = await image.getBase64Async(Jimp.MIME_PNG);
        updateElement(element.id, {
          ...element,
          content: newContent,
          type: "image", // Convert to image since we're now using Jimp
          style: {
            ...element.style,
            effect: effectId
          }
        });
      } catch (error) {
        console.error("Error applying text effect:", error);
      }
    },
    [selectedElement, pages, currentPage, updateElement]
  );

  if (!selectedElement) return null;

  const element = pages[currentPage].elements.find((el: EditorElement) => el.id === selectedElement);
  if (!element || element.type !== "text") return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Text Effects</h3>
      <div className="grid grid-cols-2 gap-2">
        {effects.map((effect) => (
          <Button key={effect.id} variant="outline" onClick={() => applyEffect(effect.id)}>
            {effect.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
