import { getDailyQuote } from "../data";
import { QuoteDisplay } from "./QuoteDisplay";

export function DailyQuote({
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
  const quote = getDailyQuote();

  return (
    <div className="fade-in">
      <div className="mb-6">
        <h2
          className="text-sm font-semibold uppercase tracking-wider"
          style={{ color: "var(--muted)" }}
        >
          Quote of the Day
        </h2>
        <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

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
  );
}
