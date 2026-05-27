import { getQuoteById } from "../data";
import { QuoteDisplay } from "./QuoteDisplay";

export function Favorites({
  favoriteIds,
  onToggleFavorite,
  isFavorite,
  onShare,
  onCreateCard,
  onAddToCollection,
}: {
  favoriteIds: number[];
  onToggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  onShare: (text: string, author: string) => void;
  onCreateCard: (id: number) => void;
  onAddToCollection: (id: number) => void;
}) {
  const quotes = favoriteIds
    .map((id) => getQuoteById(id))
    .filter((q): q is NonNullable<typeof q> => q != null);

  return (
    <div className="fade-in">
      <h2
        className="text-sm font-semibold uppercase tracking-wider mb-4"
        style={{ color: "var(--muted)" }}
      >
        Favorites ({quotes.length})
      </h2>

      {quotes.length === 0 && (
        <div className="text-center py-12" style={{ color: "var(--muted)" }}>
          <p className="text-4xl mb-3">♡</p>
          <p className="font-medium">No favorites yet</p>
          <p className="text-sm mt-1">
            Save quotes you love by tapping the heart button
          </p>
        </div>
      )}

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
