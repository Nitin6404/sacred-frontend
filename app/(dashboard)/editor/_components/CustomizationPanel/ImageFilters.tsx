"use client";

import { useCallback } from "react";
import Jimp from "jimp";
import { useEditorStore } from "@/lib/store/editor";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EditorElement, ElementStyle } from "@/types/editor";

type FilterType = NonNullable<ElementStyle["filter"]>;

const filters: { id: FilterType; name: string }[] = [
  { id: "grayscale", name: "Grayscale" },
  { id: "sepia", name: "Sepia" },
  { id: "blur", name: "Blur" },
  { id: "sharpen", name: "Sharpen" }
];

export function ImageFilters() {
  const { selectedElement, updateElement, pages, currentPage } = useEditorStore();

  const applyFilter = useCallback(
    async (filterId: FilterType) => {
      if (!selectedElement) return;

      const element = pages[currentPage].elements.find((el) => el.id === selectedElement);
      if (!element || element.type !== "image") return;

      try {
        const image = await Jimp.read(element.content);

        switch (filterId) {
          case "grayscale":
            image.greyscale();
            break;
          case "sepia":
            // Simulate sepia using color manipulation
            image.sepia();
            break;
          case "blur":
            image.blur(5);
            break;
          case "sharpen":
            image.convolute([
              [-1, -1, -1],
              [-1, 9, -1],
              [-1, -1, -1]
            ]);
            break;
        }

        const newContent = await image.getBase64Async(Jimp.MIME_PNG);
        updateElement(element.id, {
          ...element,
          content: newContent,
          style: {
            ...element.style,
            filter: filterId
          }
        });
      } catch (error) {
        console.error("Error applying filter:", error);
      }
    },
    [selectedElement, pages, currentPage, updateElement]
  );

  const handleFilterIntensity = useCallback(
    async (value: number) => {
      if (!selectedElement) return;

      const element = pages[currentPage].elements.find((el) => el.id === selectedElement);
      if (!element || element.type !== "image") return;

      try {
        const image = await Jimp.read(element.content);

        switch (element.style.filter) {
          case "blur":
            image.blur(value / 10);
            break;
          case "sharpen":
            const intensity = value / 50;
            image.convolute([
              [-intensity, -intensity, -intensity],
              [-intensity, 1 + 8 * intensity, -intensity],
              [-intensity, -intensity, -intensity]
            ]);
            break;
        }

        const newContent = await image.getBase64Async(Jimp.MIME_PNG);
        updateElement(element.id, {
          ...element,
          content: newContent,
          style: {
            ...element.style,
            filterIntensity: value
          }
        });
      } catch (error) {
        console.error("Error applying filter intensity:", error);
      }
    },
    [selectedElement, pages, currentPage, updateElement]
  );

  if (!selectedElement) return null;

  const element = pages[currentPage].elements.find((el) => el.id === selectedElement);
  if (!element || element.type !== "image") return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Image Filters</h3>
      <div className="grid grid-cols-2 gap-2">
        {filters.map((filter) => (
          <Button key={filter.id} variant="outline" onClick={() => applyFilter(filter.id)}>
            {filter.name}
          </Button>
        ))}
      </div>
      {(element.style.filter === "blur" || element.style.filter === "sharpen") && (
        <div className="space-y-2">
          <Label>Filter Intensity</Label>
          <Slider
            defaultValue={[element.style.filterIntensity || 50]}
            max={100}
            step={1}
            onValueChange={([value]) => handleFilterIntensity(value)}
          />
        </div>
      )}
      <div className="space-y-2">
        <Label>Image Filter</Label>
        <Select value={element.style.filter || "none"} onValueChange={(value) => applyFilter(value as FilterType)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            {filters.map((filter) => (
              <SelectItem key={filter.id} value={filter.id}>
                {filter.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
