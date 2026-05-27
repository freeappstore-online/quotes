import { useState, useCallback, useEffect } from "react";
import { Nav } from "./components/Nav";
import type { View } from "./components/Nav";
import { DailyQuote } from "./components/DailyQuote";
import { Browse } from "./components/Browse";
import { Search } from "./components/Search";
import { Favorites } from "./components/Favorites";
import { Collections } from "./components/Collections";
import { Authors } from "./components/Authors";
import { RandomQuote } from "./components/RandomQuote";
import { Stats } from "./components/Stats";
import { CardGenerator } from "./components/CardGenerator";
import { AddToCollectionModal } from "./components/AddToCollectionModal";
import { getDailyQuote } from "./data";
import {
  getFavorites,
  toggleFavorite,
  getCollections,
  getQuotesRead,
  markQuoteRead,
} from "./lib/storage";
import type { Collection } from "./data/types";

export default function App() {
  const [view, setView] = useState<View>("daily");
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() =>
    getFavorites(),
  );
  const [collections, setCollections] = useState<Collection[]>(() =>
    getCollections(),
  );
  const [quotesRead, setQuotesRead] = useState<number[]>(() =>
    getQuotesRead(),
  );
  const [cardQuoteId, setCardQuoteId] = useState<number | null>(null);
  const [collectQuoteId, setCollectQuoteId] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  }, []);

  const handleToggleFavorite = useCallback(
    (id: number) => {
      const next = toggleFavorite(id);
      setFavoriteIds([...next]);
    },
    [],
  );

  const isFavorite = useCallback(
    (id: number) => favoriteIds.includes(id),
    [favoriteIds],
  );

  const handleShare = useCallback(
    (text: string, author: string) => {
      const formatted = `"${text}"\n— ${author}`;
      navigator.clipboard.writeText(formatted).then(
        () => showToast("Copied to clipboard!"),
        () => showToast("Failed to copy"),
      );
    },
    [showToast],
  );

  const handleCreateCard = useCallback((id: number) => {
    setCardQuoteId(id);
  }, []);

  const handleAddToCollection = useCallback((id: number) => {
    setCollectQuoteId(id);
  }, []);

  const refreshCollections = useCallback(() => {
    setCollections([...getCollections()]);
  }, []);

  const handleMarkRead = useCallback((id: number) => {
    markQuoteRead(id);
    setQuotesRead([...getQuotesRead()]);
  }, []);

  // Mark daily quote as read on mount
  useEffect(() => {
    handleMarkRead(getDailyQuote().id);
  }, [handleMarkRead]);

  const sharedProps = {
    onToggleFavorite: handleToggleFavorite,
    isFavorite,
    onShare: handleShare,
    onCreateCard: handleCreateCard,
    onAddToCollection: handleAddToCollection,
  };

  return (
    <div className="min-h-screen pb-20" style={{ background: "var(--paper)" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-30 px-4 py-3 border-b"
        style={{
          background: "var(--glass)",
          borderColor: "var(--line)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <span className="text-2xl">✦</span>
          <h1
            className="quote-font text-xl font-bold"
            style={{ color: "var(--ink)" }}
          >
            Quotes
          </h1>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {view === "daily" && <DailyQuote {...sharedProps} />}
        {view === "browse" && <Browse {...sharedProps} />}
        {view === "search" && <Search {...sharedProps} />}
        {view === "favorites" && (
          <Favorites favoriteIds={favoriteIds} {...sharedProps} />
        )}
        {view === "collections" && (
          <Collections
            collections={collections}
            onCollectionsChange={refreshCollections}
            {...sharedProps}
          />
        )}
        {view === "authors" && <Authors {...sharedProps} />}
        {view === "random" && (
          <RandomQuote onMarkRead={handleMarkRead} {...sharedProps} />
        )}
        {view === "stats" && (
          <Stats
            favoriteCount={favoriteIds.length}
            collectionsCount={collections.length}
            quotesReadCount={quotesRead.length}
            collections={collections}
          />
        )}
      </main>

      {/* Bottom navigation */}
      <Nav current={view} onNavigate={setView} />

      {/* Card generator modal */}
      {cardQuoteId != null && (
        <CardGenerator
          quoteId={cardQuoteId}
          onClose={() => setCardQuoteId(null)}
        />
      )}

      {/* Add to collection modal */}
      {collectQuoteId != null && (
        <AddToCollectionModal
          quoteId={collectQuoteId}
          collections={collections}
          onClose={() => setCollectQuoteId(null)}
          onCollectionsChange={refreshCollections}
        />
      )}

      {/* Toast notification */}
      {toast && (
        <div
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl text-sm font-medium shadow-lg fade-in"
          style={{
            background: "var(--ink)",
            color: "var(--paper)",
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}
