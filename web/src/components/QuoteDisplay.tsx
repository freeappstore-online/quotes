import type { Quote } from "../data/types";
import { CATEGORY_EMOJI } from "../data/types";

export function QuoteDisplay({
  quote,
  large = false,
  onToggleFavorite,
  isFavorite,
  onShare,
  onCreateCard,
  onAddToCollection,
}: {
  quote: Quote;
  large?: boolean;
  onToggleFavorite: (id: number) => void;
  isFavorite: boolean;
  onShare: (text: string, author: string) => void;
  onCreateCard: (id: number) => void;
  onAddToCollection: (id: number) => void;
}) {
  return (
    <div
      className="rounded-2xl p-6 sm:p-8"
      style={{ background: "var(--panel)", border: "1px solid var(--line)" }}
    >
      <div className="mb-4">
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-medium"
          style={{
            background: "var(--accent)",
            color: "#fff",
            opacity: 0.9,
          }}
        >
          {CATEGORY_EMOJI[quote.category]} {quote.category}
        </span>
      </div>

      <blockquote
        className={`quote-font leading-relaxed mb-6 ${large ? "text-2xl sm:text-3xl md:text-4xl" : "text-lg sm:text-xl"}`}
        style={{ color: "var(--ink)" }}
      >
        &ldquo;{quote.text}&rdquo;
      </blockquote>

      <p
        className={`font-semibold ${large ? "text-lg" : "text-base"}`}
        style={{ color: "var(--muted)" }}
      >
        &mdash; {quote.author}
      </p>

      <div className="flex flex-wrap gap-2 mt-6">
        <button
          onClick={() => onToggleFavorite(quote.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium"
          style={{
            background: isFavorite ? "var(--error)" : "var(--line)",
            color: isFavorite ? "#fff" : "var(--ink)",
          }}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "♥" : "♡"}{" "}
          {isFavorite ? "Saved" : "Save"}
        </button>

        <button
          onClick={() => onShare(quote.text, quote.author)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium"
          style={{ background: "var(--line)", color: "var(--ink)" }}
          title="Copy to clipboard"
        >
          <ClipboardIcon /> Copy
        </button>

        <button
          onClick={() => onCreateCard(quote.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium"
          style={{ background: "var(--line)", color: "var(--ink)" }}
          title="Generate image card"
        >
          <ImageIcon /> Card
        </button>

        <button
          onClick={() => onAddToCollection(quote.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium"
          style={{ background: "var(--line)", color: "var(--ink)" }}
          title="Add to collection"
        >
          <FolderIcon /> Collect
        </button>
      </div>
    </div>
  );
}

function ClipboardIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}
