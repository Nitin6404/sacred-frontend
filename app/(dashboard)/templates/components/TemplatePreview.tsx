"use client";

import { Template } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTemplateQuery } from "@/app/_components/api/templates";
import { LoadingSpinner } from "@/components/loading-spinner";

interface Props {
  templateId: string;
}

export function TemplatePreview({ templateId }: Props) {
  const router = useRouter();
  const { data: template, isLoading } = useTemplateQuery(templateId);

  if (isLoading) {
    return <LoadingSpinner className="h-full w-full" />;
  }

  if (!template) {
    return <div>Template not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <Image
          src={template.thumbnailUrl}
          alt={template.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">{template.name}</h2>
          <p className="text-muted-foreground">{template.description}</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div>
            <h3 className="text-sm font-medium">Category</h3>
            <p className="text-sm text-muted-foreground">{template.category}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium">Languages</h3>
            <p className="text-sm text-muted-foreground">{template.languages.join(", ")}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium">Rating</h3>
            <p className="text-sm text-muted-foreground">
              {template.rating.toFixed(1)} ({template.views} views)
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Button onClick={() => router.push(`/templates/${template.id}/edit`)} className="flex-1">
            Customize Template
          </Button>
        </div>
      </div>
    </div>
  );
}
