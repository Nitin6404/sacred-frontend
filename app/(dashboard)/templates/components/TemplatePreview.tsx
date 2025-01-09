"use client";

import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface Template {
  _id: string;
  name: string;
  description: string;
  previewImages: string[];
  category: string[];
  languages: string[];
  culturalElements: string[];
}

interface TemplatePreviewProps {
  template: Template;
  onClose: () => void;
}

export default function TemplatePreview({ template, onClose }: TemplatePreviewProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === template.previewImages.length - 1 ? 0 : prev + 1));
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? template.previewImages.length - 1 : prev - 1));
  };

  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="relative aspect-[3/4]">
            <Image
              src={template.previewImages[currentImageIndex]}
              alt={`Preview ${currentImageIndex + 1}`}
              fill
              className="object-contain"
            />

            {template.previewImages.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <Button variant="secondary" size="icon" onClick={previousImage} className="rounded-full">
                  ←
                </Button>
                <Button variant="secondary" size="icon" onClick={nextImage} className="rounded-full">
                  →
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{template.name}</h2>
            <p className="text-gray-600">{template.description}</p>

            <div className="space-y-2">
              <h3 className="font-semibold">Available Languages</h3>
              <div className="flex flex-wrap gap-2">
                {template.languages.map((lang) => (
                  <Badge key={lang} variant="secondary">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {template.category.map((cat) => (
                  <Badge key={cat} variant="outline">
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>

            {template.culturalElements.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold">Cultural Elements</h3>
                <div className="flex flex-wrap gap-2">
                  {template.culturalElements.map((element) => (
                    <Badge key={element} variant="outline">
                      {element}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Button
              className="w-full"
              onClick={() => {
                // TODO: Implement customize template functionality
                console.log("Customize template:", template._id);
              }}
            >
              Customize Template
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
