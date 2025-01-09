import { Metadata } from "next";
import TemplateGrid from "./components/TemplateGrid";
import TemplateFilters from "./components/TemplateFilters";

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
          <TemplateFilters />
        </div>

        <div className="md:col-span-3">
          <TemplateGrid />
        </div>
      </div>
    </div>
  );
}
