import { useState, useMemo } from "react";
import { searchQuotes } from "../data";
import { QuoteDisplay } from "./QuoteDisplay";

export function Search({
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
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    return searchQuotes(query.trim());
  }, [query]);

  return (
    <div className="fade-in">
      <h2
        className="text-sm font-semibold uppercase tracking-wider mb-4"
        style={{ color: "var(--muted)" }}
      >
        Search Quotes
      </h2>

      <div className="relative mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by text or author..."
          className="w-full px-4 py-3 pl-10 rounded-xl text-base outline-none"
          style={{
            background: "var(--panel)",
            border: "1px solid var(--line)",
            color: "var(--ink)",
          }}
        />
        <svg
          className="absolute left-3 top-3.5"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--muted)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      {query.trim().length >= 2 && (
        <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
          {results.length} result{results.length !== 1 ? "s" : ""} found
        </p>
      )}

      <div className="flex flex-col gap-4">
        {results.map((quote) => (
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

      {query.trim().length >= 2 && results.length === 0 && (
        <div className="text-center py-12" style={{ color: "var(--muted)" }}>
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-medium">No quotes found</p>
          <p className="text-sm mt-1">Try a different search term</p>
        </div>
      )}

      {query.trim().length < 2 && (
        <div className="text-center py-12" style={{ color: "var(--muted)" }}>
          <p className="text-4xl mb-3">✨</p>
          <p className="font-medium">Search 150 quotes</p>
          <p className="text-sm mt-1">
            Type at least 2 characters to search by text or author
          </p>
        </div>
      )}
    </div>
  );
}
