"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/ui/multi-select";
import { FileUpload } from "@/components/ui/file-upload";

interface TemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  template?: any;
}

interface FormValues {
  name: string;
  description: string;
  category: string[];
  thumbnailUrl: string;
  previewImages: string[];
  isActive: boolean;
}

export function TemplateDialog({ open, onOpenChange, onSuccess, template }: TemplateDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<FormValues>({
    defaultValues: template || {
      name: "",
      description: "",
      category: [],
      thumbnailUrl: "",
      previewImages: [],
      isActive: true
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      const url = template ? `/api/templates/${template.id}` : "/api/templates";
      const method = template ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error("Failed to save template");

      toast({
        title: "Success",
        description: `Template ${template ? "updated" : "created"} successfully`
      });

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{template ? "Edit Template" : "Create Template"}</DialogTitle>
            <DialogDescription>
              Fill in the details below to {template ? "update" : "create"} a template.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...form.register("name", { required: true })} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...form.register("description", { required: true })} />
            </div>

            <div className="grid gap-2">
              <Label>Categories</Label>
              <MultiSelect
                value={form.watch("category")}
                onChange={(value: string[]) => form.setValue("category", value)}
                options={[
                  { label: "Wedding", value: "wedding" },
                  { label: "Birthday", value: "birthday" },
                  { label: "Anniversary", value: "anniversary" }
                ]}
              />
            </div>

            <div className="grid gap-2">
              <Label>Thumbnail</Label>
              <FileUpload
                value={form.watch("thumbnailUrl")}
                onChange={(value: string | string[]) => {
                  if (typeof value === "string") {
                    form.setValue("thumbnailUrl", value);
                  }
                }}
                accept="image/*"
              />
            </div>

            <div className="grid gap-2">
              <Label>Preview Images</Label>
              <FileUpload
                value={form.watch("previewImages")}
                onChange={(value: string | string[]) => {
                  if (Array.isArray(value)) {
                    form.setValue("previewImages", value);
                  }
                }}
                accept="image/*"
                multiple
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
