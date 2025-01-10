import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { EditorElement, EditorState, Language, Music, Page } from "@/types/editor";

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
  currentLanguage: "en",
  history: [],
  currentHistoryIndex: -1,

  // Language Actions
  setLanguage: (language: Language) => set({ currentLanguage: language }),

  // Page Actions
  setPages: (pages: Page[]) => set({ pages }),

  addPage: () => {
    const { pages } = get();
    set({
      pages: [
        ...pages,
        {
          id: uuidv4(),
          elements: [],
          order: pages.length
        }
      ]
    });
  },

  deletePage: (index: number) => {
    const { pages } = get();
    set({
      pages: pages.filter((_, i) => i !== index)
    });
  },

  reorderPage: (from: number, to: number) => {
    const { pages } = get();
    const newPages = [...pages];
    const [movedPage] = newPages.splice(from, 1);
    newPages.splice(to, 0, movedPage);
    set({ pages: newPages });
  },

  updatePageBackground: (pageId: string, background: string) => {
    const { pages } = get();
    set({
      pages: pages.map((page) => (page.id === pageId ? { ...page, background } : page))
    });
  },

  setCurrentPage: (index: number) => set({ currentPage: index }),

  // Element Actions
  addElement: (element: Omit<EditorElement, "id">) => {
    const { pages, currentPage } = get();
    const newElement = { ...element, id: uuidv4() };
    const newPages = [...pages];
    newPages[currentPage].elements.push(newElement);
    set({ pages: newPages });
  },

  updateElement: (elementId: string, updates: Partial<EditorElement>) => {
    const { pages } = get();
    set({
      pages: pages.map((page) => ({
        ...page,
        elements: page.elements.map((element) => (element.id === elementId ? { ...element, ...updates } : element))
      }))
    });
  },

  updateElementTranslation: (elementId: string, language: Language, content: string) => {
    const { pages } = get();
    set({
      pages: pages.map((page) => ({
        ...page,
        elements: page.elements.map((element) =>
          element.id === elementId
            ? {
                ...element,
                translations: {
                  ...element.translations,
                  [language]: content
                }
              }
            : element
        )
      }))
    });
  },

  deleteElement: (elementId: string) => {
    const { pages } = get();
    set({
      pages: pages.map((page) => ({
        ...page,
        elements: page.elements.filter((element) => element.id !== elementId)
      }))
    });
  },

  setSelectedElement: (elementId: string | null) => {
    const { pages } = get();
    const element = elementId ? pages.flatMap((p) => p.elements).find((e) => e.id === elementId) || null : null;
    set({ selectedElement: element });
  },

  // Music Actions
  setMusic: (music: Music) => set({ music }),

  updateMusicTitle: (language: Language, title: string) => {
    const { music } = get();
    if (!music) return;
    set({
      music: {
        ...music,
        title: {
          ...music.title,
          [language]: title
        }
      }
    });
  },

  updateMusicVolume: (volume: number) => {
    const { music } = get();
    if (!music) return;
    set({
      music: {
        ...music,
        volume
      }
    });
  },

  // History Actions
  saveState: () => {
    const { pages, music, history, currentHistoryIndex } = get();
    const newHistory = history.slice(0, currentHistoryIndex + 1);
    newHistory.push({ pages: JSON.parse(JSON.stringify(pages)), music });
    set({
      history: newHistory,
      currentHistoryIndex: newHistory.length - 1
    });
  },

  undo: () => {
    const { currentHistoryIndex, history } = get();
    if (currentHistoryIndex <= 0) return;
    const previousState = history[currentHistoryIndex - 1];
    set({
      pages: previousState.pages,
      music: previousState.music,
      currentHistoryIndex: currentHistoryIndex - 1
    });
  },

  redo: () => {
    const { currentHistoryIndex, history } = get();
    if (currentHistoryIndex >= history.length - 1) return;
    const nextState = history[currentHistoryIndex + 1];
    set({
      pages: nextState.pages,
      music: nextState.music,
      currentHistoryIndex: currentHistoryIndex + 1
    });
  }
}));
