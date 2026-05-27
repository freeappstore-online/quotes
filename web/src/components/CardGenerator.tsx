import { useState, useRef, useEffect } from "react";
import { getQuoteById } from "../data";
import {
  CARD_GRADIENTS,
  renderQuoteCard,
  downloadCard,
} from "../lib/card-generator";
import type { CardGradient } from "../lib/card-generator";

export function CardGenerator({
  quoteId,
  onClose,
}: {
  quoteId: number;
  onClose: () => void;
}) {
  const quote = getQuoteById(quoteId);
  const [selectedGradient, setSelectedGradient] = useState<CardGradient>(
    CARD_GRADIENTS[0]!,
  );
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!quote) return;
    const canvas = renderQuoteCard(
      quote.text,
      quote.author,
      selectedGradient,
    );
    canvasRef.current = canvas;

    const container = previewRef.current;
    if (container) {
      container.innerHTML = "";
      canvas.style.width = "100%";
      canvas.style.height = "auto";
      canvas.style.borderRadius = "12px";
      container.appendChild(canvas);
    }
  }, [quote, selectedGradient]);

  if (!quote) return null;

  const handleDownload = () => {
    if (canvasRef.current) {
      downloadCard(canvasRef.current, quote.author);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
        style={{ background: "var(--paper)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold" style={{ color: "var(--ink)" }}>
            Quote Card
          </h3>
          <button
            onClick={onClose}
            className="text-xl leading-none"
            style={{ color: "var(--muted)" }}
          >
            &times;
          </button>
        </div>

        {/* Preview */}
        <div ref={previewRef} className="mb-4" />

        {/* Gradient picker */}
        <div className="mb-4">
          <p
            className="text-sm font-medium mb-2"
            style={{ color: "var(--muted)" }}
          >
            Background
          </p>
          <div className="flex gap-2 flex-wrap">
            {CARD_GRADIENTS.map((g) => (
              <button
                key={g.id}
                onClick={() => setSelectedGradient(g)}
                className="w-10 h-10 rounded-lg"
                style={{
                  background: `linear-gradient(135deg, ${g.colors[0]}, ${g.colors[1]})`,
                  outline:
                    selectedGradient.id === g.id
                      ? "2px solid var(--accent)"
                      : "2px solid transparent",
                  outlineOffset: "2px",
                }}
                title={g.name}
              />
            ))}
          </div>
        </div>

        {/* Download button */}
        <button
          onClick={handleDownload}
          className="w-full py-3 rounded-xl text-base font-semibold"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          Download PNG
        </button>
      </div>
    </div>
  );
}
