"use client";

/* Recreates the CLATians logo: dark-brown wordmark + golden scales figure + tagline */

interface ClatLogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  onWhite?: boolean;
}

export default function ClatLogo({ size = "md", showTagline = false, onWhite = true }: ClatLogoProps) {
  const scale = size === "sm" ? 0.7 : size === "lg" ? 1.4 : 1;
  const textSize = 22 * scale;
  const iconSize = 28 * scale;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
      {/* Scales of Justice figure */}
      <svg width={iconSize * 1.8} height={iconSize} viewBox="0 0 56 32" fill="none">
        {/* Body / torso */}
        <path d="M28 8 L20 18 L36 18 Z" fill="#C8860A" />
        {/* Head */}
        <circle cx="28" cy="6" r="4" fill="#C8860A" />
        {/* Arms */}
        <line x1="18" y1="14" x2="10" y2="12" stroke="#C8860A" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="38" y1="14" x2="46" y2="12" stroke="#C8860A" strokeWidth="2.2" strokeLinecap="round"/>
        {/* Scale beam */}
        <line x1="10" y1="12" x2="46" y2="12" stroke="#C8860A" strokeWidth="1.5"/>
        {/* Center post */}
        <line x1="28" y1="12" x2="28" y2="8" stroke="#C8860A" strokeWidth="1.5"/>
        {/* Left scale pan */}
        <path d="M6 16 Q10 20 14 16" stroke="#C8860A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <line x1="10" y1="12" x2="10" y2="16" stroke="#C8860A" strokeWidth="1.2"/>
        {/* Right scale pan */}
        <path d="M42 16 Q46 20 50 16" stroke="#C8860A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <line x1="46" y1="12" x2="46" y2="16" stroke="#C8860A" strokeWidth="1.2"/>
        {/* Legs */}
        <line x1="24" y1="18" x2="22" y2="28" stroke="#C8860A" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="32" y1="18" x2="34" y2="28" stroke="#C8860A" strokeWidth="2.2" strokeLinecap="round"/>
      </svg>

      {/* Wordmark: CLATians */}
      <div style={{
        display: "flex", alignItems: "baseline",
        marginTop: -2 * scale,
        lineHeight: 1,
      }}>
        <span style={{
          fontSize: textSize,
          fontWeight: 900,
          color: onWhite ? "#2B1700" : "white",
          letterSpacing: "1px",
          fontFamily: "Arial Black, Arial, sans-serif",
        }}>CLA</span>
        <span style={{
          fontSize: textSize,
          fontWeight: 900,
          color: "#C8860A",
          letterSpacing: "1px",
          fontFamily: "Arial Black, Arial, sans-serif",
        }}>T</span>
        <span style={{
          fontSize: textSize * 0.85,
          fontWeight: 900,
          color: onWhite ? "#2B1700" : "white",
          letterSpacing: "0.5px",
          fontFamily: "Arial Black, Arial, sans-serif",
        }}>ians</span>
      </div>

      {/* Tagline */}
      {showTagline && (
        <div style={{
          display: "flex", alignItems: "center", gap: 4,
          marginTop: 4 * scale,
        }}>
          {["LEARN", "PRACTICE", "ACHIEVE"].map((word, i) => (
            <span key={word} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {i > 0 && <span style={{ color: "#C8860A", fontWeight: 700, fontSize: 9 * scale }}>|</span>}
              <span style={{
                fontSize: 9 * scale,
                fontWeight: 800,
                color: "#C8860A",
                letterSpacing: "1px",
                fontFamily: "Arial, sans-serif",
              }}>{word}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
