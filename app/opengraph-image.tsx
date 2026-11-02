import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Maulana Ferdi Irawan — Full-Stack Developer & UI Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        background: "#09090b",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot grid background */}
      <svg style={{ position: "absolute", inset: 0, opacity: 0.15 }} width="1200" height="630">
        {Array.from({ length: 20 }, (_, row) =>
          Array.from({ length: 40 }, (_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={col * 32 + 16}
              cy={row * 32 + 16}
              r="1.5"
              fill="#6366f1"
            />
          )),
        )}
      </svg>

      {/* Indigo accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "4px",
          height: "100%",
          background: "#6366f1",
        }}
      />

      {/* Logo */}
      <div
        style={{
          fontFamily: "monospace",
          fontSize: "20px",
          color: "#6366f1",
          marginBottom: "48px",
          letterSpacing: "0.05em",
        }}
      >
        ~/fer
      </div>

      {/* Name */}
      <div
        style={{
          fontSize: "72px",
          fontWeight: 700,
          color: "#fafafa",
          lineHeight: 1.1,
          marginBottom: "24px",
        }}
      >
        Maulana Ferdi Irawan
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: "32px",
          color: "#a1a1aa",
          fontWeight: 400,
        }}
      >
        Full-Stack Developer &amp; UI Designer
      </div>

      {/* URL */}
      <div
        style={{
          position: "absolute",
          bottom: "48px",
          right: "80px",
          fontFamily: "monospace",
          fontSize: "18px",
          color: "#52525b",
        }}
      >
        portfolio.ferdi.dev
      </div>
    </div>,
    { ...size },
  );
}
