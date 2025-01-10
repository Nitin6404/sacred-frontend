"use client";

import { useEditorStore } from "@/lib/store/editor";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import { useState } from "react";

export function ImageCustomization() {
  const { selectedElement, updateElement } = useEditorStore();
  const [uploading, setUploading] = useState(false);

  if (!selectedElement || selectedElement.type !== "image") {
    return null;
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      // TODO: Implement image upload logic
      const imageUrl = URL.createObjectURL(file);
      updateElement(selectedElement.id, {
        content: imageUrl
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <Label>Upload Image</Label>
        <div className="flex items-center gap-2">
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="hidden"
            id="image-upload"
          />
          <Label
            htmlFor="image-upload"
            className="flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium ring-offset-background hover:bg-accent hover:text-accent-foreground"
          >
            <ImageIcon className="h-4 w-4" />
            Choose Image
          </Label>
          {uploading && <span className="text-sm">Uploading...</span>}
        </div>
      </div>

      {selectedElement.content && (
        <div className="space-y-2">
          <Label>Preview</Label>
          <div className="relative aspect-video w-full overflow-hidden rounded-md border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={selectedElement.content} alt="Preview" className="h-full w-full object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
