"use client";

/**
 * AboutMarquee — a slow horizontal ticker strip. Editorial rhythm between sections.
 * Pure CSS keyframe animation, no JS.
 */

const PHRASE =
  "AI, made human\u2002·\u2002South Africa\u2002·\u2002Southeast Asia\u2002·\u2002Europe\u2002·\u2002Small businesses first\u2002·\u2002Plain talk\u2002·\u2002Real results\u2002·\u2002kulu.co.za\u2002·\u2002";

export function AboutMarquee() {
  // Repeat the phrase to create a seamless loop
  const repeated = PHRASE.repeat(4);

  return (
    <div className="border-y border-indigo/10 overflow-hidden bg-dawn py-4">
      <style>{`
        @keyframes kulu-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .kulu-marquee-track {
          display: flex;
          width: max-content;
          animation: kulu-marquee 28s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .kulu-marquee-track { animation: none; }
        }
      `}</style>
      <div className="kulu-marquee-track" aria-hidden>
        <span className="eyebrow opacity-30 whitespace-nowrap pr-0">
          {repeated}
        </span>
        <span className="eyebrow opacity-30 whitespace-nowrap pr-0">
          {repeated}
        </span>
      </div>
    </div>
  );
}
