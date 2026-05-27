import { useState, useCallback, useRef } from "react";
import { allQuotes, CATEGORIES, getQuotesByCategory } from "../data";
import type { Category, Quote } from "../data/types";
import { CATEGORY_EMOJI } from "../data/types";
import { QuoteDisplay } from "./QuoteDisplay";

export function Browse({
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
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const touchStartX = useRef(0);

  const pool: Quote[] = selectedCategory
    ? getQuotesByCategory(selectedCategory)
    : allQuotes;

  const quote = pool[currentIndex % pool.length];

  const goNext = useCallback(() => {
    setDirection("right");
    setCurrentIndex((i) => (i + 1) % pool.length);
  }, [pool.length]);

  const goPrev = useCallback(() => {
    setDirection("left");
    setCurrentIndex((i) => (i - 1 + pool.length) % pool.length);
  }, [pool.length]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? 0;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const endX = e.changedTouches[0]?.clientX ?? 0;
      const diff = touchStartX.current - endX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goNext();
        else goPrev();
      }
    },
    [goNext, goPrev],
  );

  if (!quote) return null;

  return (
    <div className="fade-in">
      <h2
        className="text-sm font-semibold uppercase tracking-wider mb-4"
        style={{ color: "var(--muted)" }}
      >
        Browse Quotes
      </h2>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => {
            setSelectedCategory(null);
            setCurrentIndex(0);
          }}
          className="px-3 py-1.5 rounded-full text-sm font-medium"
          style={{
            background: selectedCategory === null ? "var(--accent)" : "var(--line)",
            color: selectedCategory === null ? "#fff" : "var(--ink)",
          }}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentIndex(0);
            }}
            className="px-3 py-1.5 rounded-full text-sm font-medium"
            style={{
              background: selectedCategory === cat ? "var(--accent)" : "var(--line)",
              color: selectedCategory === cat ? "#fff" : "var(--ink)",
            }}
          >
            {CATEGORY_EMOJI[cat]} {cat}
          </button>
        ))}
      </div>

      {/* Swipeable card area */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        key={quote.id}
        className={direction === "right" ? "slide-in-right" : "slide-in-left"}
      >
        <QuoteDisplay
          quote={quote}
          onToggleFavorite={onToggleFavorite}
          isFavorite={isFavorite(quote.id)}
          onShare={onShare}
          onCreateCard={onCreateCard}
          onAddToCollection={onAddToCollection}
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={goPrev}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium"
          style={{ background: "var(--line)", color: "var(--ink)" }}
        >
          <span>&larr;</span> Previous
        </button>

        <span className="text-sm" style={{ color: "var(--muted)" }}>
          {(currentIndex % pool.length) + 1} / {pool.length}
        </span>

        <button
          onClick={goNext}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium"
          style={{ background: "var(--line)", color: "var(--ink)" }}
        >
          Next <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
}
