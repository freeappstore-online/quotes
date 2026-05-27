import { useState } from "react";
import { getUniqueAuthors, getQuotesByAuthor } from "../data";
import { QuoteDisplay } from "./QuoteDisplay";

export function Authors({
  onToggleFavorite,
  isFavorite,
  onShare,
  onCreateCard,
  onAddToCollection,
}: {
  onToggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  onShare: (text: string, author: string) => void;
  onCreateCard: (id: number) => void;
  onAddToCollection: (id: number) => void;
}) {
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const authors = getUniqueAuthors();

  const filtered = filter.trim()
    ? authors.filter((a) => a.toLowerCase().includes(filter.toLowerCase()))
    : authors;

  if (selectedAuthor) {
    const quotes = getQuotesByAuthor(selectedAuthor);

    return (
      <div className="fade-in">
        <button
          onClick={() => setSelectedAuthor(null)}
          className="flex items-center gap-2 text-sm font-medium mb-4"
          style={{ color: "var(--accent)" }}
        >
          &larr; Back to Authors
        </button>

        <h2
          className="text-xl font-bold mb-1"
          style={{ color: "var(--ink)" }}
        >
          {selectedAuthor}
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
          {quotes.length} quote{quotes.length !== 1 ? "s" : ""}
        </p>

        <div className="flex flex-col gap-4">
          {quotes.map((quote) => (
            <QuoteDisplay
              key={quote.id}
              quote={quote}
              onToggleFavorite={onToggleFavorite}
              isFavorite={isFavorite(quote.id)}
              onShare={onShare}
              onCreateCard={onCreateCard}
              onAddToCollection={onAddToCollection}
            />
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
        Authors ({authors.length})
      </h2>

      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter authors..."
        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none mb-4"
        style={{
          background: "var(--panel)",
          border: "1px solid var(--line)",
          color: "var(--ink)",
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {filtered.map((author) => {
          const count = getQuotesByAuthor(author).length;
          return (
            <button
              key={author}
              onClick={() => setSelectedAuthor(author)}
              className="flex items-center justify-between rounded-xl p-3 text-left"
              style={{
                background: "var(--panel)",
                border: "1px solid var(--line)",
              }}
            >
              <span className="font-medium text-sm" style={{ color: "var(--ink)" }}>
                {author}
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: "var(--line)", color: "var(--muted)" }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8" style={{ color: "var(--muted)" }}>
          <p className="font-medium">No authors match your filter</p>
        </div>
      )}
    </div>
  );
}
