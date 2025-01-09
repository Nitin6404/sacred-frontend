export const LANGUAGES = {
  en: "English",
  bn: "Bengali"
} as const;

export const BENGALI_FONTS = {
  "Noto Sans Bengali": {
    name: "Noto Sans Bengali",
    category: "modern",
    weight: [400, 500, 600, 700],
    source: "google"
  },
  Bangla: {
    name: "Bangla",
    category: "traditional",
    weight: [400],
    source: "maateen"
  },
  SolaimanLipi: {
    name: "SolaimanLipi",
    category: "modern",
    weight: [400],
    source: "maateen"
  },
  Kalpurush: {
    name: "Kalpurush",
    category: "traditional",
    weight: [400],
    source: "maateen"
  },
  Nikosh: {
    name: "Nikosh",
    category: "traditional",
    weight: [400],
    source: "local"
  },
  "Siyam Rupali": {
    name: "Siyam Rupali",
    category: "modern",
    weight: [400],
    source: "maateen"
  },
  Akaash: {
    name: "Akaash",
    category: "decorative",
    weight: [400],
    source: "local"
  },
  AdorshoLipi: {
    name: "AdorshoLipi",
    category: "traditional",
    weight: [400],
    source: "maateen"
  },
  Mukti: {
    name: "Mukti",
    category: "modern",
    weight: [400],
    source: "maateen"
  },
  "Shonar Bangla": {
    name: "Shonar Bangla",
    category: "decorative",
    weight: [400],
    source: "local"
  }
} as const;

export const ENGLISH_FONTS = {
  Arial: {
    name: "Arial",
    category: "sans-serif",
    weight: [400, 700],
    source: "system"
  },
  "Times New Roman": {
    name: "Times New Roman",
    category: "serif",
    weight: [400, 700],
    source: "system"
  },
  Helvetica: {
    name: "Helvetica",
    category: "sans-serif",
    weight: [400, 700],
    source: "system"
  },
  Georgia: {
    name: "Georgia",
    category: "serif",
    weight: [400, 700],
    source: "system"
  },
  "Playfair Display": {
    name: "Playfair Display",
    category: "serif",
    weight: [400, 500, 600, 700],
    source: "google"
  },
  Montserrat: {
    name: "Montserrat",
    category: "sans-serif",
    weight: [300, 400, 500, 600],
    source: "google"
  }
} as const;
