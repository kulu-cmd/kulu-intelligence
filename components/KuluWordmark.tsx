import { CSSProperties } from "react";

type Variant = "cream-on-indigo" | "indigo-on-dawn" | "indigo-on-coral" | "dawn-on-coral";

interface Props {
  size?: number; // in px, the font-size of "Kulu."
  variant?: Variant;
  showDescriptor?: boolean;
  showTagline?: boolean;
  align?: "left" | "center";
  className?: string;
}

/**
 * KuluWordmark — the brand's primary lockup, rendered as live type so it
 * stays crisp at every size and can be recoloured per surface.
 *
 * Spec from brand guidelines section 04:
 *  - Wordmark face:    Bricolage Grotesque 600, tracking −0.045em
 *  - Descriptor face:  Manrope 500, tracking +0.3em, sits 0.5x below baseline
 *  - Coral period:     #FF6B5C (or cream when on coral background per pairings)
 */
export function KuluWordmark({
  size = 80,
  variant = "indigo-on-dawn",
  showDescriptor = true,
  showTagline = false,
  align = "left",
  className = "",
}: Props) {
  const palettes: Record<Variant, { word: string; period: string }> = {
    "cream-on-indigo": { word: "#FFF8E8", period: "#FF6B5C" },
    "indigo-on-dawn": { word: "#1A2B47", period: "#FF6B5C" },
    "indigo-on-coral": { word: "#1A2B47", period: "#FFF8E8" },
    "dawn-on-coral": { word: "#FFF8E8", period: "#1A2B47" },
  };
  const palette = palettes[variant];
  const descriptorSize = Math.max(10, Math.round(size * 0.155));
  const taglineSize = Math.max(11, Math.round(size * 0.21));

  const wordStyle: CSSProperties = {
    fontFamily: "var(--font-display), 'Bricolage Grotesque', system-ui, sans-serif",
    fontWeight: 600,
    fontSize: `${size}px`,
    letterSpacing: "-0.045em",
    lineHeight: 0.9,
    color: palette.word,
  };

  return (
    <div
      className={className}
      style={{ textAlign: align, display: "inline-block" }}
    >
      <div style={wordStyle}>
        Kulu<span style={{ color: palette.period }}>.</span>
      </div>
      {showDescriptor && (
        <div
          className="descriptor"
          style={{
            color: palette.word,
            fontSize: `${descriptorSize}px`,
            marginTop: `${Math.round(size * 0.18)}px`,
            opacity: 0.88,
          }}
        >
          INTELLIGENCE
        </div>
      )}
      {showTagline && (
        <div
          style={{
            fontFamily: "var(--font-body), Manrope, system-ui, sans-serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: `${taglineSize}px`,
            color: palette.word,
            opacity: 0.72,
            marginTop: `${Math.round(size * 0.32)}px`,
            letterSpacing: "-0.005em",
          }}
        >
          AI, made human.
        </div>
      )}
    </div>
  );
}

/**
 * KuluMonogram — the K. mark, for tight spaces.
 */
export function KuluMonogram({
  size = 24,
  variant = "indigo-on-dawn",
  className = "",
}: {
  size?: number;
  variant?: Variant;
  className?: string;
}) {
  const palettes: Record<Variant, { word: string; period: string }> = {
    "cream-on-indigo": { word: "#FFF8E8", period: "#FF6B5C" },
    "indigo-on-dawn": { word: "#1A2B47", period: "#FF6B5C" },
    "indigo-on-coral": { word: "#1A2B47", period: "#FFF8E8" },
    "dawn-on-coral": { word: "#FFF8E8", period: "#1A2B47" },
  };
  const palette = palettes[variant];
  return (
    <span
      className={className}
      style={{
        fontFamily:
          "var(--font-display), 'Bricolage Grotesque', system-ui, sans-serif",
        fontWeight: 600,
        fontSize: `${size}px`,
        letterSpacing: "-0.05em",
        lineHeight: 1,
        color: palette.word,
        display: "inline-block",
      }}
    >
      K<span style={{ color: palette.period }}>.</span>
    </span>
  );
}
