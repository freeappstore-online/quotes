import { useState, useCallback } from "react";
import { getRandomQuote } from "../data";
import type { Quote } from "../data/types";
import { QuoteDisplay } from "./QuoteDisplay";
import { useShake } from "../hooks/useShake";

export function RandomQuote({
  onToggleFavorite,
  isFavorite,
  onShare,
  onCreateCard,
  onAddToCollection,
  onMarkRead,
}: {
  onToggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  onShare: (text: string, author: string) => void;
  onCreateCard: (id: number) => void;
  onAddToCollection: (id: number) => void;
  onMarkRead: (id: number) => void;
}) {
  const [quote, setQuote] = useState<Quote>(() => getRandomQuote());

  const randomize = useCallback(() => {
    const next = getRandomQuote();
    setQuote(next);
    onMarkRead(next.id);
  }, [onMarkRead]);

  useShake(randomize);

  return (
    <div className="fade-in">
      <h2
        className="text-sm font-semibold uppercase tracking-wider mb-4"
        style={{ color: "var(--muted)" }}
      >
        Random Quote
      </h2>

      <div className="text-center mb-6">
        <button
          onClick={randomize}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          <ShuffleIcon /> Random Quote
        </button>
        <p className="text-xs mt-2" style={{ color: "var(--muted)" }}>
          Or shake your device!
        </p>
      </div>

      <div key={quote.id} className="slide-in-right">
        <QuoteDisplay
          quote={quote}
          large
          onToggleFavorite={onToggleFavorite}
          isFavorite={isFavorite(quote.id)}
          onShare={onShare}
          onCreateCard={onCreateCard}
          onAddToCollection={onAddToCollection}
        />
      </div>
    </div>
  );
}

function ShuffleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 3 21 3 21 8" />
      <line x1="4" y1="20" x2="21" y2="3" />
      <polyline points="21 16 21 21 16 21" />
      <line x1="15" y1="15" x2="21" y2="21" />
      <line x1="4" y1="4" x2="9" y2="9" />
    </svg>
  );
}
