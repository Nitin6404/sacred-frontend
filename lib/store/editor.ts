import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

export type ElementStyle = {
  position: { x: number; y: number };
  size: { width: number; height: number };
  fontFamily: string;
  fontSize: number;
  color: string;
  textAlign: "left" | "center" | "right";
  fontWeight?: "normal" | "bold";
  fontStyle?: "normal" | "italic";
  lineHeight?: number;
  rotation?: number;
  backgroundColor?: string;
  zIndex?: number;
  textDecoration?: string;
};

export type TextElement = {
  id: string;
  type: "text";
  content: string;
  style: ElementStyle;
  translations?: {
    [key: string]: string;
  };
};

export type EditorPage = {
  id: string;
  elements: TextElement[];
  background: string;
  order: number;
};

interface HistoryState {
  pages: EditorPage[];
  currentPage: number;
}

type EditorStore = {
  pages: EditorPage[];
  currentPage: number;
  selectedElement: string | null;
  history: HistoryState[];
  currentHistoryIndex: number;
  setPages: (pages: EditorPage[]) => void;
  setCurrentPage: (index: number) => void;
  setSelectedElement: (id: string | null) => void;
  updateElement: (pageIndex: number, elementId: string, updates: Partial<TextElement>) => void;
  updateElementStyle: (pageIndex: number, elementId: string, style: Partial<ElementStyle>) => void;
  updateElementContent: (pageIndex: number, elementId: string, content: string) => void;
  undo: () => void;
  redo: () => void;
};

export const useEditorStore = create<EditorStore>((set, get) => ({
  pages: [
    {
      id: uuidv4(),
      elements: [],
      background: "",
      order: 0
    }
  ],
  currentPage: 0,
  selectedElement: null,
  history: [],
  currentHistoryIndex: -1,

  setPages: (pages) => {
    const currentState = get();
    const newHistory = [...currentState.history.slice(0, currentState.currentHistoryIndex + 1)];
    newHistory.push({
      pages: currentState.pages,
      currentPage: currentState.currentPage
    });

    set({
      pages,
      history: newHistory,
      currentHistoryIndex: newHistory.length - 1
    });
  },

  setCurrentPage: (index) => set({ currentPage: index }),

  setSelectedElement: (id) => set({ selectedElement: id }),

  updateElement: (pageIndex, elementId, updates) =>
    set((state) => ({
      pages: state.pages.map((page, idx) =>
        idx === pageIndex
          ? {
              ...page,
              elements: page.elements.map((el) => (el.id === elementId ? { ...el, ...updates } : el))
            }
          : page
      )
    })),

  updateElementStyle: (pageIndex, elementId, style) =>
    set((state) => ({
      pages: state.pages.map((page, idx) =>
        idx === pageIndex
          ? {
              ...page,
              elements: page.elements.map((el) =>
                el.id === elementId ? { ...el, style: { ...el.style, ...style } } : el
              )
            }
          : page
      )
    })),

  updateElementContent: (pageIndex, elementId, content) =>
    set((state) => ({
      pages: state.pages.map((page, idx) =>
        idx === pageIndex
          ? {
              ...page,
              elements: page.elements.map((el) => (el.id === elementId ? { ...el, content } : el))
            }
          : page
      )
    })),

  undo: () => {
    const { currentHistoryIndex, history } = get();
    if (currentHistoryIndex > 0) {
      const previousState = history[currentHistoryIndex - 1];
      set({
        pages: previousState.pages,
        currentPage: previousState.currentPage,
        currentHistoryIndex: currentHistoryIndex - 1
      });
    }
  },

  redo: () => {
    const { currentHistoryIndex, history } = get();
    if (currentHistoryIndex < history.length - 1) {
      const nextState = history[currentHistoryIndex + 1];
      set({
        pages: nextState.pages,
        currentPage: nextState.currentPage,
        currentHistoryIndex: currentHistoryIndex + 1
      });
    }
  }
}));
