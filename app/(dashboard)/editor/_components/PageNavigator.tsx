"use client";

import { useEditorStore } from "@/lib/store/editor";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortablePageItemProps {
  id: string;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  background?: string;
}

const SortablePageItem = ({ id, index, isSelected, onSelect, onDelete, background }: SortablePageItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-pointer rounded border p-2 ${isSelected ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"}`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <span>Page {index + 1}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          Delete
        </Button>
      </div>
      <div
        className="mt-2 aspect-[1/1.414] border bg-white"
        style={{
          backgroundImage: background ? `url(${background})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
    </div>
  );
};

export const PageNavigator = () => {
  const { pages, currentPage, addPage, deletePage, reorderPage, setCurrentPage } = useEditorStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = pages.findIndex((page) => page.id === active.id);
      const newIndex = pages.findIndex((page) => page.id === over.id);
      reorderPage(oldIndex, newIndex);
    }
  };

  return (
    <div className="w-64 border-l p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Pages</h3>
        <Button onClick={addPage}>Add Page</Button>
      </div>

      <ScrollArea className="h-[calc(100vh-8rem)]">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={pages.map((page) => page.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {pages.map((page, index) => (
                <SortablePageItem
                  key={page.id}
                  id={page.id}
                  index={index}
                  isSelected={currentPage === index}
                  onSelect={() => setCurrentPage(index)}
                  onDelete={() => deletePage(index)}
                  background={page.background}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </ScrollArea>
    </div>
  );
};
