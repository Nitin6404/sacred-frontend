import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { v4 as uuidv4 } from "uuid";

export interface EditorElement {
  id: string;
  type: "text" | "image";
  content: string;
  language?: "en" | "bn";
  style: {
    position: { x: number; y: number };
    size: { width: number; height: number };
    rotation?: number;
    fontFamily?: string;
    fontSize?: number;
    color?: string;
    backgroundColor?: string;
    fontWeight?: string;
    fontStyle?: string;
    textDecoration?: string;
    textAlign?: string;
  };
}

interface EditorPage {
  id: string;
  elements: EditorElement[];
  background?: string;
}

interface EditorState {
  pages: EditorPage[];
  currentPage: number;
  selectedElement: EditorElement | null;
  history: {
    past: EditorPage[][];
    future: EditorPage[][];
  };
  addElement: (element: Partial<EditorElement>) => void;
  updateElement: (updates: Partial<EditorElement>) => void;
  deleteElement: (id: string) => void;
  setSelectedElement: (element: EditorElement | null) => void;
  setCurrentPage: (pageIndex: number) => void;
  addPage: () => void;
  deletePage: (pageIndex: number) => void;
  undo: () => void;
  redo: () => void;
}

export const useEditorStore = create<EditorState>()(
  immer((set) => ({
    pages: [{ id: uuidv4(), elements: [], background: "#ffffff" }],
    currentPage: 0,
    selectedElement: null,
    history: {
      past: [],
      future: []
    },

    addElement: (element: Partial<EditorElement>) =>
      set((state) => {
        const newElement = {
          id: uuidv4(),
          type: "text",
          content: "",
          style: {
            position: { x: 0, y: 0 },
            size: { width: 200, height: 50 }
          },
          ...element
        };
        state.pages[state.currentPage].elements.push(newElement);
        state.selectedElement = newElement;
      }),

    updateElement: (updates: Partial<EditorElement>) =>
      set((state) => {
        if (!state.selectedElement) return;
        const element = state.pages[state.currentPage].elements.find(
          (element: EditorElement) => element.id === state.selectedElement?.id
        );
        if (element) {
          Object.assign(element, {
            ...element,
            ...updates,
            style: { ...element.style, ...updates.style }
          });
        }
      }),

    deleteElement: (id: string) =>
      set((state) => {
        const page = state.pages[state.currentPage];
        page.elements = page.elements.filter((element: EditorElement) => element.id !== id);
        if (state.selectedElement?.id === id) {
          state.selectedElement = null;
        }
      }),

    setSelectedElement: (element: EditorElement | null) =>
      set((state) => {
        state.selectedElement = element;
      }),

    setCurrentPage: (pageIndex: number) =>
      set((state) => {
        state.currentPage = pageIndex;
        state.selectedElement = null;
      }),

    addPage: () =>
      set((state) => {
        state.pages.push({ id: uuidv4(), elements: [], background: "#ffffff" });
      }),

    deletePage: (pageIndex: number) =>
      set((state) => {
        if (state.pages.length > 1) {
          state.pages.splice(pageIndex, 1);
          if (state.currentPage >= pageIndex) {
            state.currentPage = Math.max(0, state.currentPage - 1);
          }
          state.selectedElement = null;
        }
      }),

    undo: () =>
      set((state) => {
        const lastState = state.history.past.pop();
        if (lastState) {
          state.history.future.push([...state.pages]);
          state.pages = lastState;
        }
      }),

    redo: () =>
      set((state) => {
        const nextState = state.history.future.pop();
        if (nextState) {
          state.history.past.push([...state.pages]);
          state.pages = nextState;
        }
      })
  }))
);
