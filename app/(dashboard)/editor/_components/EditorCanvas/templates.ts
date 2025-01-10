import { Page } from "@/types/editor";

export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  pages: Page[];
}

export const templates: Template[] = [
  {
    id: "wedding-classic",
    name: "Classic Wedding",
    thumbnail: "/templates/classic-wedding.jpg",
    pages: [
      {
        id: "page-1",
        elements: [
          {
            id: "title",
            type: "text",
            content: "Wedding Invitation",
            translations: {
              bn: "বিবাহের নিমন্ত্রণ"
            },
            style: {
              position: { x: 400, y: 100 },
              size: { width: 400, height: 60 },
              fontFamily: "Playfair Display",
              fontSize: 48,
              color: "#333333",
              textAlign: "center"
            }
          },
          {
            id: "names",
            type: "text",
            content: "John & Jane",
            translations: {
              bn: "জন এবং জেন"
            },
            style: {
              position: { x: 400, y: 200 },
              size: { width: 300, height: 40 },
              fontFamily: "Dancing Script",
              fontSize: 36,
              color: "#666666",
              textAlign: "center"
            }
          }
        ],
        background: "/templates/classic-bg.jpg",
        order: 0
      }
    ]
  },
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    thumbnail: "/templates/modern-minimal.jpg",
    pages: [
      {
        id: "page-1",
        elements: [
          {
            id: "title",
            type: "text",
            content: "Save the Date",
            translations: {
              bn: "তারিখ মনে রাখুন"
            },
            style: {
              position: { x: 400, y: 150 },
              size: { width: 400, height: 60 },
              fontFamily: "Montserrat",
              fontSize: 42,
              color: "#000000",
              textAlign: "center"
            }
          }
        ],
        background: "/templates/minimal-bg.jpg",
        order: 0
      }
    ]
  }
];
