export type Category =
  | "Motivation"
  | "Life"
  | "Success"
  | "Love"
  | "Wisdom"
  | "Humor"
  | "Science";

export interface Quote {
  id: number;
  text: string;
  author: string;
  category: Category;
}

export interface Collection {
  id: string;
  name: string;
  quoteIds: number[];
  createdAt: number;
}

export const CATEGORIES: Category[] = [
  "Motivation",
  "Life",
  "Success",
  "Love",
  "Wisdom",
  "Humor",
  "Science",
];

export const CATEGORY_EMOJI: Record<Category, string> = {
  Motivation: "\u{1F525}",
  Life: "\u{1F331}",
  Success: "\u{1F3C6}",
  Love: "\u{2764}\u{FE0F}",
  Wisdom: "\u{1F9E0}",
  Humor: "\u{1F604}",
  Science: "\u{1F52C}",
};
