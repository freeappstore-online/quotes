import { allQuotes, CATEGORIES, getQuotesByCategory } from "../data";
import { CATEGORY_EMOJI } from "../data/types";
import type { Collection } from "../data/types";

export function Stats({
  favoriteCount,
  collectionsCount,
  quotesReadCount,
  collections,
}: {
  favoriteCount: number;
  collectionsCount: number;
  quotesReadCount: number;
  collections: Collection[];
}) {
  return (
    <div className="fade-in">
      <h2
        className="text-sm font-semibold uppercase tracking-wider mb-6"
        style={{ color: "var(--muted)" }}
      >
        Your Stats
      </h2>

      {/* Main stats grid */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <StatCard label="Quotes Read" value={quotesReadCount} total={allQuotes.length} />
        <StatCard label="Favorites" value={favoriteCount} />
        <StatCard label="Collections" value={collectionsCount} />
      </div>

      {/* Reading progress */}
      <div className="mb-8">
        <h3
          className="text-sm font-semibold mb-3"
          style={{ color: "var(--ink)" }}
        >
          Reading Progress
        </h3>
        <div
          className="rounded-full h-3 overflow-hidden"
          style={{ background: "var(--line)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              background: "var(--accent)",
              width: `${(quotesReadCount / allQuotes.length) * 100}%`,
            }}
          />
        </div>
        <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
          {quotesReadCount} of {allQuotes.length} quotes read (
          {Math.round((quotesReadCount / allQuotes.length) * 100)}%)
        </p>
      </div>

      {/* Category breakdown */}
      <div className="mb-8">
        <h3
          className="text-sm font-semibold mb-3"
          style={{ color: "var(--ink)" }}
        >
          Quotes by Category
        </h3>
        <div className="flex flex-col gap-2">
          {CATEGORIES.map((cat) => {
            const count = getQuotesByCategory(cat).length;
            return (
              <div
                key={cat}
                className="flex items-center justify-between rounded-xl p-3"
                style={{
                  background: "var(--panel)",
                  border: "1px solid var(--line)",
                }}
              >
                <span className="text-sm font-medium" style={{ color: "var(--ink)" }}>
                  {CATEGORY_EMOJI[cat]} {cat}
                </span>
                <span className="text-sm" style={{ color: "var(--muted)" }}>
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Collections detail */}
      {collections.length > 0 && (
        <div>
          <h3
            className="text-sm font-semibold mb-3"
            style={{ color: "var(--ink)" }}
          >
            Your Collections
          </h3>
          <div className="flex flex-col gap-2">
            {collections.map((col) => (
              <div
                key={col.id}
                className="flex items-center justify-between rounded-xl p-3"
                style={{
                  background: "var(--panel)",
                  border: "1px solid var(--line)",
                }}
              >
                <span className="text-sm font-medium" style={{ color: "var(--ink)" }}>
                  {col.name}
                </span>
                <span className="text-sm" style={{ color: "var(--muted)" }}>
                  {col.quoteIds.length} quote
                  {col.quoteIds.length !== 1 ? "s" : ""}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  total,
}: {
  label: string;
  value: number;
  total?: number;
}) {
  return (
    <div
      className="rounded-xl p-4 text-center"
      style={{
        background: "var(--panel)",
        border: "1px solid var(--line)",
      }}
    >
      <p className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
        {value}
      </p>
      <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
        {label}
        {total != null && (
          <span> / {total}</span>
        )}
      </p>
    </div>
  );
}
