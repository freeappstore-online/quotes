import type { Collection } from "../data/types";

const FAVORITES_KEY = "quotes-favorites";
const COLLECTIONS_KEY = "quotes-collections";
const QUOTES_READ_KEY = "quotes-read";

// ---- Favorites ----

export function getFavorites(): number[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as number[];
  } catch {
    return [];
  }
}

export function toggleFavorite(id: number): number[] {
  const favs = getFavorites();
  const index = favs.indexOf(id);
  if (index >= 0) {
    favs.splice(index, 1);
  } else {
    favs.push(id);
  }
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  return favs;
}

export function isFavorite(id: number): boolean {
  return getFavorites().includes(id);
}

// ---- Collections ----

export function getCollections(): Collection[] {
  try {
    const raw = localStorage.getItem(COLLECTIONS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Collection[];
  } catch {
    return [];
  }
}

function saveCollections(collections: Collection[]): void {
  localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections));
}

export function createCollection(name: string): Collection {
  const collections = getCollections();
  const collection: Collection = {
    id: crypto.randomUUID(),
    name,
    quoteIds: [],
    createdAt: Date.now(),
  };
  collections.push(collection);
  saveCollections(collections);
  return collection;
}

export function deleteCollection(id: string): void {
  const collections = getCollections().filter((c) => c.id !== id);
  saveCollections(collections);
}

export function renameCollection(id: string, name: string): void {
  const collections = getCollections();
  const collection = collections.find((c) => c.id === id);
  if (collection) {
    collection.name = name;
    saveCollections(collections);
  }
}

export function addToCollection(collectionId: string, quoteId: number): void {
  const collections = getCollections();
  const collection = collections.find((c) => c.id === collectionId);
  if (collection && !collection.quoteIds.includes(quoteId)) {
    collection.quoteIds.push(quoteId);
    saveCollections(collections);
  }
}

export function removeFromCollection(
  collectionId: string,
  quoteId: number,
): void {
  const collections = getCollections();
  const collection = collections.find((c) => c.id === collectionId);
  if (collection) {
    collection.quoteIds = collection.quoteIds.filter((id) => id !== quoteId);
    saveCollections(collections);
  }
}

// ---- Quotes Read Tracking ----

export function getQuotesRead(): number[] {
  try {
    const raw = localStorage.getItem(QUOTES_READ_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as number[];
  } catch {
    return [];
  }
}

export function markQuoteRead(id: number): void {
  const read = getQuotesRead();
  if (!read.includes(id)) {
    read.push(id);
    localStorage.setItem(QUOTES_READ_KEY, JSON.stringify(read));
  }
}
