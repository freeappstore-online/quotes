import { useState } from "react";
import type { Collection } from "../data/types";
import { getQuoteById } from "../data";
import { QuoteDisplay } from "./QuoteDisplay";
import {
  createCollection,
  deleteCollection,
  removeFromCollection,
} from "../lib/storage";

export function Collections({
  collections,
  onCollectionsChange,
  onToggleFavorite,
  isFavorite,
  onShare,
  onCreateCard,
  onAddToCollection,
}: {
  collections: Collection[];
  onCollectionsChange: () => void;
  onToggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  onShare: (text: string, author: string) => void;
  onCreateCard: (id: number) => void;
  onAddToCollection: (id: number) => void;
}) {
  const [newName, setNewName] = useState("");
  const [openCollectionId, setOpenCollectionId] = useState<string | null>(null);

  const handleCreate = () => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    createCollection(trimmed);
    setNewName("");
    onCollectionsChange();
  };

  const handleDelete = (id: string) => {
    deleteCollection(id);
    if (openCollectionId === id) setOpenCollectionId(null);
    onCollectionsChange();
  };

  const handleRemoveQuote = (collectionId: string, quoteId: number) => {
    removeFromCollection(collectionId, quoteId);
    onCollectionsChange();
  };

  const openCollection = collections.find((c) => c.id === openCollectionId);

  if (openCollection) {
    const quotes = openCollection.quoteIds
      .map((id) => getQuoteById(id))
      .filter((q): q is NonNullable<typeof q> => q != null);

    return (
      <div className="fade-in">
        <button
          onClick={() => setOpenCollectionId(null)}
          className="flex items-center gap-2 text-sm font-medium mb-4"
          style={{ color: "var(--accent)" }}
        >
          &larr; Back to Collections
        </button>

        <h2
          className="text-xl font-bold mb-1"
          style={{ color: "var(--ink)" }}
        >
          {openCollection.name}
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
          {quotes.length} quote{quotes.length !== 1 ? "s" : ""}
        </p>

        {quotes.length === 0 && (
          <div
            className="text-center py-12"
            style={{ color: "var(--muted)" }}
          >
            <p className="text-4xl mb-3">📂</p>
            <p className="font-medium">Empty collection</p>
            <p className="text-sm mt-1">
              Add quotes from the browse or search views
            </p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {quotes.map((quote) => (
            <div key={quote.id}>
              <QuoteDisplay
                quote={quote}
                onToggleFavorite={onToggleFavorite}
                isFavorite={isFavorite(quote.id)}
                onShare={onShare}
                onCreateCard={onCreateCard}
                onAddToCollection={onAddToCollection}
              />
              <button
                onClick={() =>
                  handleRemoveQuote(openCollection.id, quote.id)
                }
                className="mt-2 text-xs font-medium"
                style={{ color: "var(--error)" }}
              >
                Remove from collection
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <h2
        className="text-sm font-semibold uppercase tracking-wider mb-4"
        style={{ color: "var(--muted)" }}
      >
        Collections ({collections.length})
      </h2>

      {/* Create new collection */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCreate();
          }}
          placeholder="New collection name..."
          className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
          style={{
            background: "var(--panel)",
            border: "1px solid var(--line)",
            color: "var(--ink)",
          }}
        />
        <button
          onClick={handleCreate}
          className="px-4 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          Create
        </button>
      </div>

      {collections.length === 0 && (
        <div className="text-center py-12" style={{ color: "var(--muted)" }}>
          <p className="text-4xl mb-3">📚</p>
          <p className="font-medium">No collections yet</p>
          <p className="text-sm mt-1">
            Create a collection to organize your favorite quotes
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {collections.map((col) => (
          <div
            key={col.id}
            className="flex items-center justify-between rounded-xl p-4"
            style={{
              background: "var(--panel)",
              border: "1px solid var(--line)",
            }}
          >
            <button
              onClick={() => setOpenCollectionId(col.id)}
              className="flex-1 text-left"
            >
              <p className="font-semibold" style={{ color: "var(--ink)" }}>
                {col.name}
              </p>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                {col.quoteIds.length} quote
                {col.quoteIds.length !== 1 ? "s" : ""}
              </p>
            </button>
            <button
              onClick={() => handleDelete(col.id)}
              className="ml-3 text-sm font-medium"
              style={{ color: "var(--error)" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
