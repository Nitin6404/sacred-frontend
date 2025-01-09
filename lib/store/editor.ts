import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface ElementStyle {
  fontFamily?: string;
  fontSize?: number;
  color?: string;
  backgroundColor?: string;
  position: Position;
  size: Size;
  rotation?: number;
  zIndex?: number;
}

export interface EditorElement {
  id: string;
  type: "text" | "image" | "shape";
  content: string;
  style: ElementStyle;
  language?: "en" | "bn";
}

export interface Page {
  id: string;
  elements: EditorElement[];
  background?: string;
  order: number;
}

export interface Music {
  url: string;
  type: "shehnai" | "rabindra";
  volume: number;
}

interface EditorState {
  pages: Page[];
  currentPage: number;
  selectedElement: EditorElement | null;
  music?: Music;
  history: Array<{
    pages: Page[];
    timestamp: number;
  }>;
  historyIndex: number;

  // Page Actions
  addPage: () => void;
  deletePage: (index: number) => void;
  reorderPage: (from: number, to: number) => void;
  updatePageBackground: (pageId: string, background: string) => void;
  setCurrentPage: (index: number) => void;

  // Element Actions
  addElement: (element: Omit<EditorElement, "id">) => void;
  updateElement: (elementId: string, updates: Partial<EditorElement>) => void;
  deleteElement: (elementId: string) => void;
  setSelectedElement: (elementId: string | null) => void;
  duplicateElement: (elementId: string) => void;

  // Music Actions
  setMusic: (music: Music) => void;
  updateMusicVolume: (volume: number) => void;

  // History Actions
  undo: () => void;
  redo: () => void;
  saveState: () => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  pages: [
    {
      id: uuidv4(),
      elements: [],
      order: 0
    }
  ],
  currentPage: 0,
  selectedElement: null,
  history: [],
  historyIndex: -1,

  // Page Actions
  addPage: () =>
    set((state) => ({
      pages: [
        ...state.pages,
        {
          id: uuidv4(),
          elements: [],
          order: state.pages.length
        }
      ]
    })),

  deletePage: (index) =>
    set((state) => ({
      pages: state.pages
        .filter((_, i) => i !== index)
        .map((page, i) => ({
          ...page,
          order: i
        })),
      currentPage: Math.min(state.currentPage, state.pages.length - 2)
    })),

  reorderPage: (from, to) =>
    set((state) => ({
      pages: state.pages
        .map((page, index) => {
          if (index === from) return { ...page, order: to };
          if (index === to) return { ...page, order: from };
          return page;
        })
        .sort((a, b) => a.order - b.order)
    })),

  updatePageBackground: (pageId, background) =>
    set((state) => ({
      pages: state.pages.map((page) => (page.id === pageId ? { ...page, background } : page))
    })),

  setCurrentPage: (index) => set({ currentPage: index }),

  // Element Actions
  addElement: (element) =>
    set((state) => {
      const currentPage = state.pages[state.currentPage];
      const newElement = { ...element, id: uuidv4() };
      return {
        pages: state.pages.map((page) =>
          page.id === currentPage.id ? { ...page, elements: [...page.elements, newElement] } : page
        ),
        selectedElement: newElement
      };
    }),

  updateElement: (elementId, updates) =>
    set((state) => ({
      pages: state.pages.map((page) => ({
        ...page,
        elements: page.elements.map((element) => (element.id === elementId ? { ...element, ...updates } : element))
      }))
    })),

  deleteElement: (elementId) =>
    set((state) => ({
      pages: state.pages.map((page) => ({
        ...page,
        elements: page.elements.filter((element) => element.id !== elementId)
      })),
      selectedElement: null
    })),

  setSelectedElement: (elementId) =>
    set((state) => ({
      selectedElement: elementId
        ? state.pages[state.currentPage].elements.find((el) => el.id === elementId) || null
        : null
    })),

  duplicateElement: (elementId) =>
    set((state) => {
      const currentPage = state.pages[state.currentPage];
      const elementToDuplicate = currentPage.elements.find((el) => el.id === elementId);
      if (!elementToDuplicate) return state;

      const newElement = {
        ...elementToDuplicate,
        id: uuidv4(),
        style: {
          ...elementToDuplicate.style,
          position: {
            x: elementToDuplicate.style.position.x + 20,
            y: elementToDuplicate.style.position.y + 20
          }
        }
      };

      return {
        pages: state.pages.map((page) =>
          page.id === currentPage.id ? { ...page, elements: [...page.elements, newElement] } : page
        ),
        selectedElement: newElement
      };
    }),

  // Music Actions
  setMusic: (music) => set({ music }),
  updateMusicVolume: (volume) =>
    set((state) => ({
      music: state.music ? { ...state.music, volume } : undefined
    })),

  // History Actions
  saveState: () =>
    set((state) => {
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      return {
        history: [
          ...newHistory,
          {
            pages: JSON.parse(JSON.stringify(state.pages)),
            timestamp: Date.now()
          }
        ],
        historyIndex: newHistory.length
      };
    }),

  undo: () =>
    set((state) => {
      if (state.historyIndex <= 0) return state;
      return {
        pages: JSON.parse(JSON.stringify(state.history[state.historyIndex - 1].pages)),
        historyIndex: state.historyIndex - 1
      };
    }),

  redo: () =>
    set((state) => {
      if (state.historyIndex >= state.history.length - 1) return state;
      return {
        pages: JSON.parse(JSON.stringify(state.history[state.historyIndex + 1].pages)),
        historyIndex: state.historyIndex + 1
      };
    })
}));
