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
  {
    name: "Property",
    tasks: [
      "Draft lease summaries and inspection reports",
      "Automate listing descriptions from agent notes",
      "Screen tenant applications against criteria",
    ],
  },
  {
    name: "Marketing",
    tasks: [
      "Brief-to-copy in minutes, not days",
      "Repurpose long-form content across channels",
      "Analyse campaign data and surface the insight",
    ],
  },
  {
    name: "Accounting & finance",
    tasks: [
      "Reconcile and flag anomalies faster",
      "Summarise management accounts for partners",
      "Draft client-ready commentary from numbers",
    ],
  },
  {
    name: "HR agencies",
    tasks: [
      "Screen CVs against role requirements at scale",
      "Draft job briefs from a short intake call",
      "Summarise candidate interview notes",
    ],
  },
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
        <section className="relative overflow-hidden bg-indigo text-dawn">
          <div className="absolute inset-0 dot-field opacity-30 pointer-events-none" aria-hidden />
          <div className="relative mx-auto max-w-[1480px] px-6 md:px-12 py-24 md:py-32">
            <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
              <h2 className="font-display font-semibold text-[36px] md:text-[56px] lg:text-[64px] leading-[0.95] tracking-[-0.03em] max-w-[20ch]">
                Industries we work with<span className="text-stoep">.</span>
              </h2>
              <div className="eyebrow opacity-65">04 — Industries</div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {industries.map((ind, i) => (
                <Reveal
                  key={ind.name}
                  delay={i * 0.08}
                  as="article"
                  className="group relative bg-dawn/5 border border-dawn/10 p-8 md:p-10 rounded-[8px] hover:bg-dawn/10 transition-colors duration-500 overflow-hidden"
                >
                  <span className="absolute top-0 left-8 right-8 h-[1.5px] bg-stoep scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                  <h3 className="font-display font-semibold text-[24px] md:text-[28px] tracking-[-0.02em] leading-[1.1]">
                    {ind.name}<span className="text-stoep">.</span>
                  </h3>
                  <ul className="mt-6 space-y-3">
                    {ind.tasks.map((task) => (
                      <li key={task} className="flex items-start gap-3 text-[14.5px] leading-[1.6] opacity-80">
                        <span className="mt-[5px] shrink-0 w-[6px] h-[6px] rounded-full bg-stoep" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
