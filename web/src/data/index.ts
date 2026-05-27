import { motivationQuotes } from "./motivation";
import { lifeQuotes } from "./life";
import { successQuotes } from "./success";
import { loveQuotes } from "./love";
import { wisdomQuotes } from "./wisdom";
import { humorQuotes } from "./humor";
import { scienceQuotes } from "./science";
import type { Quote, Category } from "./types";

export const allQuotes: Quote[] = [
  ...motivationQuotes,
  ...lifeQuotes,
  ...successQuotes,
  ...loveQuotes,
  ...wisdomQuotes,
  ...humorQuotes,
  ...scienceQuotes,
];

export function getQuotesByCategory(category: Category): Quote[] {
  return allQuotes.filter((q) => q.category === category);
}

export function getQuoteById(id: number): Quote | undefined {
  return allQuotes.find((q) => q.id === id);
}

export function getUniqueAuthors(): string[] {
  return [...new Set(allQuotes.map((q) => q.author))].sort();
}

export function getQuotesByAuthor(author: string): Quote[] {
  return allQuotes.filter((q) => q.author === author);
}

export function searchQuotes(query: string): Quote[] {
  const lower = query.toLowerCase();
  return allQuotes.filter(
    (q) =>
      q.text.toLowerCase().includes(lower) ||
      q.author.toLowerCase().includes(lower),
  );
}

/**
 * Deterministic daily quote based on date hash.
 * Same quote for everyone on the same day.
 */
export function getDailyQuote(): Quote {
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  const index = Math.abs(hash) % allQuotes.length;
  return allQuotes[index]!;
}

/**
 * Get a random quote, optionally filtered by category.
 */
export function getRandomQuote(category?: Category): Quote {
  const pool = category ? getQuotesByCategory(category) : allQuotes;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index]!;
}

export type { Quote, Category } from "./types";
export { CATEGORIES, CATEGORY_EMOJI } from "./types";
export type { Collection } from "./types";
