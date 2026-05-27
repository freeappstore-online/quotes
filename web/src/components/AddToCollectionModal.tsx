import { useState } from "react";
import type { Collection } from "../data/types";
import {
  addToCollection,
  createCollection,
} from "../lib/storage";

export function AddToCollectionModal({
  quoteId,
  collections,
  onClose,
  onCollectionsChange,
}: {
  quoteId: number;
  collections: Collection[];
  onClose: () => void;
  onCollectionsChange: () => void;
}) {
  const [newName, setNewName] = useState("");

  const handleAdd = (collectionId: string) => {
    addToCollection(collectionId, quoteId);
    onCollectionsChange();
    onClose();
  };

  const handleCreateAndAdd = () => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    const col = createCollection(trimmed);
    addToCollection(col.id, quoteId);
    onCollectionsChange();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-6"
        style={{ background: "var(--paper)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold" style={{ color: "var(--ink)" }}>
            Add to Collection
          </h3>
          <button
            onClick={onClose}
            className="text-xl leading-none"
            style={{ color: "var(--muted)" }}
          >
            &times;
          </button>
        </div>

        {collections.length > 0 && (
          <div className="flex flex-col gap-2 mb-4">
            {collections.map((col) => {
              const alreadyIn = col.quoteIds.includes(quoteId);
              return (
                <button
                  key={col.id}
                  onClick={() => !alreadyIn && handleAdd(col.id)}
                  className="flex items-center justify-between rounded-xl p-3 text-left"
                  style={{
                    background: "var(--panel)",
                    border: "1px solid var(--line)",
                    opacity: alreadyIn ? 0.5 : 1,
                  }}
                  disabled={alreadyIn}
                >
                  <span
                    className="font-medium text-sm"
                    style={{ color: "var(--ink)" }}
                  >
                    {col.name}
                  </span>
                  {alreadyIn && (
                    <span
                      className="text-xs"
                      style={{ color: "var(--muted)" }}
                    >
                      Already added
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        <div
          className="pt-4"
          style={{ borderTop: "1px solid var(--line)" }}
        >
          <p
            className="text-sm font-medium mb-2"
            style={{ color: "var(--muted)" }}
          >
            Or create a new collection
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateAndAdd();
              }}
              placeholder="Collection name..."
              className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
              style={{
                background: "var(--panel)",
                border: "1px solid var(--line)",
                color: "var(--ink)",
              }}
            />
            <button
              onClick={handleCreateAndAdd}
              className="px-3 py-2 rounded-lg text-sm font-semibold"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
