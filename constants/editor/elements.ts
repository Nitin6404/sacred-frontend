export const ELEMENT_DEFAULTS = {
  text: {
    width: 200,
    height: 50,
    fontSize: 16,
    fontFamily: "Arial",
    color: "#000000",
    backgroundColor: "transparent"
  },
  image: {
    width: 200,
    height: 200
  },
  shape: {
    width: 100,
    height: 100,
    backgroundColor: "#000000"
  }
} as const;

export const ELEMENT_TYPES = {
  TEXT: "text",
  IMAGE: "image",
  SHAPE: "shape"
} as const;

export const TEXT_ALIGNMENTS = {
  LEFT: "left",
  CENTER: "center",
  RIGHT: "right"
} as const;

export const TEXT_DECORATIONS = {
  NONE: "none",
  UNDERLINE: "underline",
  LINE_THROUGH: "line-through"
} as const;

export const FONT_WEIGHTS = {
  NORMAL: "normal",
  BOLD: "bold"
} as const;

export const FONT_STYLES = {
  NORMAL: "normal",
  ITALIC: "italic"
} as const;
