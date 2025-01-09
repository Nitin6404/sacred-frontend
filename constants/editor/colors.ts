export const DEFAULT_COLORS = {
  text: "#000000",
  background: "#ffffff",
  accent: "#3B82F6",
  error: "#EF4444",
  success: "#10B981"
} as const;

export const COLOR_PRESETS = {
  wedding: [
    "#FF1493", // Deep Pink
    "#FF69B4", // Hot Pink
    "#FFB6C1", // Light Pink
    "#800080", // Purple
    "#4B0082", // Indigo
    "#8B4513", // Saddle Brown
    "#DAA520", // Goldenrod
    "#FFD700", // Gold
    "#FF4500", // Orange Red
    "#FF8C00" // Dark Orange
  ],
  traditional: [
    "#8B0000", // Dark Red
    "#800000", // Maroon
    "#A52A2A", // Brown
    "#B8860B", // Dark Goldenrod
    "#BDB76B", // Dark Khaki
    "#556B2F", // Dark Olive Green
    "#2F4F4F", // Dark Slate Gray
    "#191970", // Midnight Blue
    "#4B0082", // Indigo
    "#800080" // Purple
  ]
} as const;
