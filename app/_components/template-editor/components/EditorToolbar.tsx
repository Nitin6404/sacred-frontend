"use client";

import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Undo2, Redo2, Save } from "lucide-react";
import { useEditorStore } from "@/lib/store/editor";

interface EditorToolbarProps {
  onSave: () => void;
  onPublish: () => void;
  isSaving: boolean;
  isPublishing: boolean;
}

export function EditorToolbar({ onSave, onPublish, isSaving, isPublishing }: EditorToolbarProps) {
  const { undo, redo, history, currentHistoryIndex } = useEditorStore();
  const canUndo = currentHistoryIndex > 0;
  const canRedo = currentHistoryIndex < history.length - 1;

  return (
    <div className="flex items-center justify-between">
      <div className="flex space-x-2">
        <Button variant="outline" size="icon" onClick={undo} disabled={!canUndo}>
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={redo} disabled={!canRedo}>
          <Redo2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" onClick={onSave} disabled={isSaving}>
          {isSaving ? <LoadingSpinner className="h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
          Save
        </Button>
        <Button variant="default" onClick={onPublish} disabled={isPublishing}>
          {isPublishing ? <LoadingSpinner className="h-4 w-4" /> : "Publish"}
        </Button>
      </div>
    </div>
  );
}
