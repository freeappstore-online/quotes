export interface CardGradient {
  id: string;
  name: string;
  colors: [string, string];
}

export const CARD_GRADIENTS: CardGradient[] = [
  { id: "sunset", name: "Sunset", colors: ["#f97316", "#ec4899"] },
  { id: "ocean", name: "Ocean", colors: ["#06b6d4", "#3b82f6"] },
  { id: "forest", name: "Forest", colors: ["#22c55e", "#14b8a6"] },
  { id: "twilight", name: "Twilight", colors: ["#8b5cf6", "#6366f1"] },
  { id: "midnight", name: "Midnight", colors: ["#1e293b", "#334155"] },
  { id: "rose", name: "Rose", colors: ["#fb7185", "#f43f5e"] },
];

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
): number {
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  for (const word of words) {
    const testLine = line + (line ? " " : "") + word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line) {
      ctx.fillText(line, x, currentY);
      line = word;
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
  return currentY;
}

export function renderQuoteCard(
  quoteText: string,
  author: string,
  gradient: CardGradient,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  const w = 1080;
  const h = 1080;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  // Draw gradient background
  const grd = ctx.createLinearGradient(0, 0, w, h);
  grd.addColorStop(0, gradient.colors[0]);
  grd.addColorStop(1, gradient.colors[1]);
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, w, h);

  // Add subtle pattern overlay
  ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
  for (let i = 0; i < 20; i++) {
    const rx = Math.random() * w;
    const ry = Math.random() * h;
    const rr = Math.random() * 200 + 50;
    ctx.beginPath();
    ctx.arc(rx, ry, rr, 0, Math.PI * 2);
    ctx.fill();
  }

  // Opening quote mark
  ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
  ctx.font = "bold 200px Georgia, serif";
  ctx.textAlign = "left";
  ctx.fillText("“", 60, 220);

  // Quote text
  ctx.fillStyle = "#ffffff";
  ctx.font = "36px Georgia, serif";
  ctx.textAlign = "left";
  const padding = 100;
  const maxWidth = w - padding * 2;
  const endY = wrapText(ctx, quoteText, padding, 320, maxWidth, 52);

  // Author
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.font = "500 28px sans-serif";
  const authorY = Math.min(endY + 80, h - 140);
  ctx.fillText(`— ${author}`, padding, authorY);

  // Branding
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.font = "20px sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("quotes.freeappstore.online", w - 60, h - 50);

  return canvas;
}

export function downloadCard(canvas: HTMLCanvasElement, author: string): void {
  const link = document.createElement("a");
  link.download = `quote-${author.toLowerCase().replace(/\s+/g, "-")}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
