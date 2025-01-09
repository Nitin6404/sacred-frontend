"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface Template {
  _id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  category: string[];
  languages: string[];
}

interface TemplateCardProps {
  template: Template;
  onClick: () => void;
}

export default function TemplateCard({ template, onClick }: TemplateCardProps) {
  return (
    <div
      className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl"
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={template.thumbnailUrl}
          alt={template.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold">{template.name}</h3>
        <p className="mb-3 line-clamp-2 text-sm text-gray-600">{template.description}</p>

        <div className="flex flex-wrap gap-2">
          {template.languages.map((lang) => (
            <Badge key={lang} variant="secondary">
              {lang}
            </Badge>
          ))}
          {template.category.map((cat) => (
            <Badge key={cat} variant="outline">
              {cat}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
