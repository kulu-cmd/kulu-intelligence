import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CustomCursor } from "@/components/CustomCursor";
import { PageEnter } from "@/components/PageEnter";

const audiences = [
  {
    eyebrow: "For partners and principals",
    title: "Leadership sessions",
    body:
      "A grounded read on where AI is, what it can and can't do for a firm like yours, and the two or three decisions that need to happen before anyone else picks up a tool.",
  },
  {
    eyebrow: "For functional teams",
    title: "Working sessions",
    body:
      "Hands-on with the tools, on your own work. Property paperwork, marketing briefs, reconciliations, candidate screens — whatever the team actually spends its time on.",
  },
  {
    eyebrow: "For everyone in the room",
    title: "Firm-wide briefings",
    body:
      "A shared frame of reference across the firm. So the conversation about AI stops being seven different conversations.",
  },
];

const covers = [
  "What AI is good at — and where it still falls over",
  "Prompting properly: getting useful output, not novelty output",
  "Where your data lives, what crosses the firewall, and what doesn't",
  "Building a workflow you can actually rely on",
  "The two or three tools worth your team's time this quarter",
  "How to evaluate a new AI claim without falling for it",
];

const industries = [
  "Property",
  "Marketing",
  "Accounting & finance",
  "HR agencies",
];

export default function LearnPage() {
  return (
    <>
      <CustomCursor />
      <PageEnter />
      <SiteHeader />
      <PageHero
        num="Learn"
        category="In-person AI literacy for professional teams"
        title="A session that earns its hour"
        lead="A working session, not a slide deck. We bring practical AI literacy into your boardroom, your team rooms, or your offsite — and leave behind two or three things people will actually use on Monday."
        surface="dawn"
      />

      <main className="bg-dawn">
        {/* Format strip */}
        <section className="border-y border-indigo/10">
          <div className="mx-auto max-w-[1480px] px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 divide-x-0 md:divide-x divide-indigo/10">
            {[
              { label: "Length", value: "60 — 120 min" },
              { label: "Format", value: "Live, in-person" },
              { label: "Group size", value: "Up to 40" },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08} className="py-10 md:py-14 px-0 md:px-8 first:pl-0 last:pr-0">
                <div className="eyebrow opacity-55">{item.label}</div>
                <div className="mt-4 font-display font-medium text-[38px] md:text-[48px] tracking-[-0.025em] leading-[1]">
                  {item.value}
                  <span className="text-stoep">.</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Audiences */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-[1480px] px-6 md:px-12">
            <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
              <h2 className="font-display font-semibold text-[36px] md:text-[56px] lg:text-[64px] leading-[0.95] tracking-[-0.03em] max-w-[20ch]">
                Three rooms we know how to read<span className="text-stoep">.</span>
              </h2>
              <div className="eyebrow opacity-55">02 — Audiences</div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {audiences.map((a, i) => (
                <Reveal
                  key={a.title}
                  delay={i * 0.08}
                  as="article"
                  className="group relative bg-dawn border border-indigo/10 p-8 md:p-10 flex flex-col rounded-[8px] hover:bg-spruit/35 transition-colors duration-500"
                >
                  <div className="eyebrow opacity-55">{a.eyebrow}</div>
                  <h3 className="mt-8 font-display font-medium text-[28px] md:text-[32px] tracking-[-0.02em] leading-[1.05]">
                    {a.title}
                    <span className="text-stoep">.</span>
                  </h3>
                  <p className="mt-5 text-[14.5px] leading-[1.65] opacity-80">{a.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* What we cover */}
        <section className="relative overflow-hidden bg-indigo text-dawn">
          <div className="absolute inset-0 dot-field opacity-40 pointer-events-none" aria-hidden />
          <div className="relative mx-auto max-w-[1480px] px-6 md:px-12 py-24 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <Reveal className="md:col-span-5">
              <div className="eyebrow opacity-65">03 — What we cover</div>
              <h2 className="mt-4 font-display font-semibold text-[36px] md:text-[56px] lg:text-[64px] leading-[0.95] tracking-[-0.03em] max-w-[16ch]">
                A working agenda<span className="text-stoep">.</span>
              </h2>
              <p className="mt-6 text-[15px] md:text-[16px] leading-[1.7] opacity-80 max-w-[44ch]">
                Not a syllabus. The points that tend to matter most for professional
                firms — adjusted to your industry, your team, and where the firm is
                already up to.
              </p>
            </Reveal>
            <ul className="md:col-span-7">
              {covers.map((c, i) => (
                <Reveal
                  key={c}
                  delay={i * 0.06}
                  as="li"
                  className="flex gap-6 items-start py-5 border-t border-dawn/15 text-[16px] md:text-[18px] leading-[1.45]"
                >
                  <span className="eyebrow opacity-55 mt-1 shrink-0 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{c}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Industries */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-[1480px] px-6 md:px-12">
            <Reveal>
              <div className="eyebrow opacity-55">04 — Industries we work with</div>
              <h3 className="mt-5 font-display font-medium text-[28px] md:text-[40px] tracking-[-0.02em] leading-[1.1] max-w-[28ch]">
                Tuned to how your firm actually operates<span className="text-stoep">.</span>
              </h3>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {industries.map((i) => (
                  <span
                    key={i}
                    className="px-5 py-2.5 rounded-full border border-indigo/25 text-[14px] leading-none hover:bg-indigo hover:text-dawn transition-colors duration-300"
                  >
                    {i}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-stoep text-indigo">
          <div className="mx-auto max-w-[1480px] px-6 md:px-12 py-24 md:py-32 flex flex-col md:flex-row gap-10 md:items-end md:justify-between">
            <Reveal>
              <div className="eyebrow opacity-70">05 — Bring us in</div>
              <h2 className="mt-4 font-display font-semibold text-[40px] md:text-[64px] lg:text-[80px] leading-[0.95] tracking-[-0.035em] max-w-[20ch]">
                Tell us who's in the room<span className="text-dawn">.</span>
              </h2>
              <p className="mt-6 text-[15px] md:text-[17px] leading-[1.65] max-w-[52ch] opacity-85">
                A short note about the team, the date, and the question you want
                answered. We'll reply within a working day with a shape for the
                session and a quote.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="flex gap-3 flex-wrap">
              <Link href="/about#contact" data-cursor className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo text-dawn rounded-full text-[14px] font-medium hover:bg-indigo-deep transition-colors duration-300">
                Get in touch →
              </Link>
              <Link href="/case-studies" data-cursor className="inline-flex items-center gap-2 px-6 py-3.5 border border-indigo text-indigo rounded-full text-[14px] font-medium hover:bg-indigo hover:text-dawn transition-colors duration-300">
                See where we've been
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
