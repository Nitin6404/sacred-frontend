"use client";

import { useEditorStore } from "@/lib/store/editor";
import { cn } from "@/lib/utils";
import { ElementType } from "@/types/editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextCustomization } from "./TextCustomization";
import { ImageCustomization } from "./ImageCustomization";
import { ShapeCustomization } from "./ShapeCustomization";
import { MusicCustomization } from "./MusicCustomization";
import { LanguageSwitch } from "./LanguageSwitch";
import { TextEffects } from "./TextEffects";
import { ImageFilters } from "./ImageFilters";
import { Animations } from "./Animations";

export function CustomizationPanel() {
  const { selectedElement, currentLanguage } = useEditorStore();

  if (!selectedElement) {
    return (
      <div className="flex h-full items-center justify-center p-4 text-center text-gray-500">
        Select an element to customize
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Customize {selectedElement.type} ({currentLanguage.toUpperCase()})
        </h3>
        <LanguageSwitch />
      </div>

      <Tabs defaultValue={selectedElement.type} className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="text" className={cn(selectedElement.type !== "text" && "hidden")}>
            Text
          </TabsTrigger>
          <TabsTrigger value="image" className={cn(selectedElement.type !== "image" && "hidden")}>
            Image
          </TabsTrigger>
          <TabsTrigger value="shape" className={cn(selectedElement.type !== "shape" && "hidden")}>
            Shape
          </TabsTrigger>
          <TabsTrigger value="music">Music</TabsTrigger>
        </TabsList>

        <TabsContent value="text">
          <div className="space-y-6">
            <TextCustomization />
            <TextEffects />
            <Animations />
          </div>
        </TabsContent>

        <TabsContent value="image">
          <div className="space-y-6">
            <ImageCustomization />
            <ImageFilters />
            <Animations />
          </div>
        </TabsContent>

        <TabsContent value="shape">
          <div className="space-y-6">
            <ShapeCustomization />
            <Animations />
          </div>
        </TabsContent>

        <TabsContent value="music">
          <MusicCustomization />
        </TabsContent>
      </Tabs>
    </div>
  );
}
