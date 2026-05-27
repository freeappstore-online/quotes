export type View =
  | "daily"
  | "browse"
  | "search"
  | "favorites"
  | "collections"
  | "authors"
  | "random"
  | "stats";

const NAV_ITEMS: { view: View; label: string; icon: string }[] = [
  { view: "daily", label: "Today", icon: "☀" },
  { view: "browse", label: "Browse", icon: "📖" },
  { view: "search", label: "Search", icon: "🔍" },
  { view: "favorites", label: "Favs", icon: "♥" },
  { view: "collections", label: "Lists", icon: "📚" },
  { view: "authors", label: "Authors", icon: "✍" },
  { view: "random", label: "Random", icon: "🎲" },
  { view: "stats", label: "Stats", icon: "📊" },
];

export function Nav({
  current,
  onNavigate,
}: {
  current: View;
  onNavigate: (view: View) => void;
}) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t safe-area-bottom"
      style={{
        background: "var(--dock)",
        borderColor: "var(--line)",
      }}
    >
      <div className="flex justify-around max-w-lg mx-auto">
        {NAV_ITEMS.map((item) => {
          const active = current === item.view;
          return (
            <button
              key={item.view}
              onClick={() => onNavigate(item.view)}
              className="flex flex-col items-center py-2 px-1 min-w-0"
              style={{
                color: active ? "var(--accent)" : "var(--muted)",
              }}
            >
              <span className="text-lg leading-none">{item.icon}</span>
              <span
                className="text-[10px] mt-0.5 font-medium truncate"
                style={{
                  fontWeight: active ? 700 : 500,
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
