export type ElementType = "text" | "image" | "shape";
export type Language = "en" | "bn";
export type MusicType = "shehnai" | "rabindra_sangeet";

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
  fontWeight?: string;
  fontStyle?: string;
  textDecoration?: string;
  textAlign?: string;
  zIndex?: number;
  effect?: "none" | "shadow" | "glow" | "outline" | "gradient";
  effectIntensity?: number;
  gradientStyle?: string;
  filter?: "none" | "grayscale" | "sepia" | "blur" | "sharpen" | "vintage";
  filterIntensity?: number;
  animation?: "none" | "fade" | "slide" | "bounce" | "rotate" | "scale";
  animationSpeed?: number;
}

export interface EditorElement {
  id: string;
  type: ElementType;
  content: string;
  style: ElementStyle;
  language?: Language;
  translations?: {
    [key in Language]?: string;
  };
}

export interface Page {
  id: string;
  elements: EditorElement[];
  background?: string;
  order: number;
}

export interface Music {
  type: MusicType;
  url: string;
  volume: number;
  title?: {
    [key in Language]?: string;
  };
}

export interface EditorState {
  pages: Page[];
  currentPage: number;
  selectedElement: EditorElement | null;
  music?: Music;
  currentLanguage: Language;
  history: Array<{
    pages: Page[];
    music?: Music;
  }>;
  currentHistoryIndex: number;

  // Actions
  setLanguage: (language: Language) => void;
  setPages: (pages: Page[]) => void;
  addPage: () => void;
  deletePage: (index: number) => void;
  reorderPage: (from: number, to: number) => void;
  updatePageBackground: (pageId: string, background: string) => void;
  setCurrentPage: (index: number) => void;
  addElement: (element: Omit<EditorElement, "id">) => void;
  updateElement: (elementId: string, updates: Partial<EditorElement>) => void;
  updateElementTranslation: (elementId: string, language: Language, content: string) => void;
  deleteElement: (elementId: string) => void;
  setSelectedElement: (elementId: string | null) => void;
  setMusic: (music: Music) => void;
  updateMusicTitle: (language: Language, title: string) => void;
  updateMusicVolume: (volume: number) => void;
  saveState: () => void;
  undo: () => void;
  redo: () => void;
}
