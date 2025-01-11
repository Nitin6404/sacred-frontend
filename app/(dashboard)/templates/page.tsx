import { Metadata } from "next";
import { TemplateGrid } from "./components/TemplateGrid";
import { TemplateFiltersPage } from "./components/TemplateFilters";
// import DndUploader from '@/app/_components/dnd-uploader';
// import ImageUploader2 from '@/app/_components/image-uploader-2';

export const metadata: Metadata = {
  title: "Wedding Templates | Sacred Shadi",
  description: "Choose from our beautiful collection of wedding invitation templates"
};

export default function TemplatesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">Wedding Invitation Templates</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <TemplateFiltersPage />
        </div>

        <div className="md:col-span-3">
          <TemplateGrid />
        </div>
      </div>

      {/* <ImageUploader2
    onImageUpload={(url) => setFormData(prev => ({ ...prev, thumbnailUrl: url }))}
    updateParentState={(loading) => setIsLoading(loading)}
/>

// For preview images
<DndUploader
    onUpload={(urls) => setFormData(prev => ({ ...prev, previewImages: [...prev.previewImages, ...urls] }))}
    maxFiles={5}
/> */}
    </div>
  );
}
