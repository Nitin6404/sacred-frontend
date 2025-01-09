import { Metadata } from "next";
import EditorCanvas from "./_components/EditorCanvas";
import EditorToolbar from "./_components/EditorToolbar";
import EditorSidebar from "./_components/EditorSidebar";
import PageNavigator from "./_components/PageNavigator";

export const metadata: Metadata = {
  title: "Template Editor - Sacred Shadi",
  description: "Customize your wedding invitation template"
};

export default function EditorPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar - Tools */}
      <EditorToolbar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        {/* Top Bar - Page Navigation */}
        <PageNavigator />

        {/* Canvas Area */}
        <div className="flex-1 overflow-hidden">
          <EditorCanvas />
        </div>
      </div>

      {/* Right Sidebar - Properties */}
      <EditorSidebar />
    </div>
  );
}
