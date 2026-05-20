import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CustomCursor } from "@/components/CustomCursor";
import { PageEnter } from "@/components/PageEnter";
import { AutomationCatalogue } from "@/components/AutomationCatalogue";

const phases = [
  {
    num: "01",
    name: "Audit",
    duration: "Week 1",
    body:
      "We embed for a few days, watch how the work moves, and map where time and judgement actually go. You receive a single-page diagnostic — what AI can take on, what it shouldn't, and what to prioritise.",
  },
  {
    num: "02",
    name: "Design",
    duration: "Week 1 — 2",
    body:
      "We design the workflow on paper before touching a tool. You sign off on the inputs, the outputs, the human checkpoint, and the failure modes. No surprises in production.",
  },
  {
    num: "03",
    name: "Build",
    duration: "Week 2",
    body:
      "Implementation in your existing stack — your CRM, your case management system, your client comms. Live, tested on real work, with documentation your team can hold.",
  },
  {
    num: "04",
    name: "Hold",
    duration: "Ongoing",
    body:
      "We don't disappear after handover. A retained relationship for fixes, refinements, and quiet improvements as the tools and your team both move forward.",
  },
];

const builds = [
  {
    industry: "Property",
    title: "Listing and tenant comms that don't go cold",
    detail:
      "AI-assisted reply drafts for tenant queries, listing copy that holds the firm's voice, and triage that flags the messages a person actually has to read.",
  },
  {
    industry: "Marketing",
    title: "Briefs in, drafts out — without losing the brand",
    detail:
      "First-pass copy, decks, and proposal frames tuned to the agency's style. The senior team edits 30%, instead of writing 100%.",
  },
  {
    industry: "Accounting & finance",
    title: "Compliance work that writes its own first draft",
    detail:
      "Bank reconciliations, audit prep, and SARS correspondence drafted from your own working papers. Partners review and sign. The juniors get their evenings back.",
  },
  {
    industry: "HR agencies",
    title: "Candidate screening that reads like you mean it",
    detail:
      "Long-list reads, structured interview notes, and reference summaries — drafted by AI, owned by your consultants. The shortlist conversation gets to happen earlier.",
  },
];

export default function ImplementPage() {
  return (
    <>
      <CustomCursor />
      <PageEnter />
      <SiteHeader />
      <PageHero
        num="Implement"
        category="Embedded AI work for professional firms"
        title="Two weeks from kickoff to live"
        lead="We come in alongside your team, find the work that AI can quietly take on, and build it into your existing workflow. No long strategy doc. No platform sale. A specific, working tool — owned by your firm — within a fortnight."
        surface="indigo"
      />

      <main className="bg-dawn">
        {/* Snapshot */}
        <section className="border-y border-indigo/10">
          <div className="mx-auto max-w-[1480px] px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 divide-x divide-indigo/10">
            {[
              { label: "Timeline", value: "2 weeks" },
              { label: "From", value: "R8,500" },
              { label: "Live before", value: "Month-end" },
              { label: "Then", value: "Retained" },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.06} className="py-10 md:py-14 px-5 md:px-8">
                <div className="eyebrow opacity-55">{item.label}</div>
                <div className="mt-4 font-display font-medium text-[28px] md:text-[36px] tracking-[-0.025em] leading-[1.05]">
                  {item.value}
                  <span className="text-stoep">.</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Four phases */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-[1480px] px-6 md:px-12">
            <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
              <h2 className="font-display font-semibold text-[36px] md:text-[56px] lg:text-[64px] leading-[0.95] tracking-[-0.03em] max-w-[18ch]">
                Four phases. One fortnight<span className="text-stoep">.</span>
              </h2>
              <div className="eyebrow opacity-55">02 — Approach</div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {phases.map((phase, idx) => (
                <Reveal
                  key={phase.num}
                  delay={idx * 0.1}
                  as="article"
                  className={[
                    "relative overflow-hidden rounded-[8px] p-8 md:p-10 flex flex-col group",
                    idx % 2 === 0 ? "bg-dawn border border-indigo/10" : "bg-spruit/55",
                  ].join(" ")}
                >
                  <div className="absolute -right-4 -bottom-10 font-display font-semibold leading-none tracking-[-0.06em] text-[200px] md:text-[260px] text-indigo/[0.06] select-none pointer-events-none">
                    {phase.num}
                  </div>
                  <div className="relative flex items-baseline justify-between">
                    <div className="eyebrow opacity-65">{phase.num} · Phase</div>
                    <div className="eyebrow opacity-55">{phase.duration}</div>
                  </div>
                  <h3 className="relative mt-8 font-display font-medium text-[34px] md:text-[44px] tracking-[-0.025em] leading-[1]">
                    {phase.name}
                    <span className="text-stoep">.</span>
                  </h3>
                  <p className="relative mt-5 text-[14.5px] leading-[1.65] opacity-85 max-w-[48ch]">
                    {phase.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* What we build — by industry */}
        <section className="bg-mielie text-indigo">
          <div className="mx-auto max-w-[1480px] px-6 md:px-12 py-24 md:py-32">
            <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
              <h2 className="font-display font-semibold text-[36px] md:text-[56px] lg:text-[64px] leading-[0.95] tracking-[-0.03em] max-w-[18ch]">
                The shape of the work<span className="text-stoep">.</span>
              </h2>
              <div className="eyebrow opacity-65">03 — By industry</div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {builds.map((b, i) => (
                <Reveal
                  key={b.industry}
                  delay={i * 0.08}
                  as="article"
                  className="bg-dawn rounded-[8px] p-8 md:p-10 border border-indigo/8 group"
                >
                  <div className="eyebrow opacity-65">{b.industry}</div>
                  <h3 className="mt-5 font-display font-medium text-[24px] md:text-[28px] tracking-[-0.015em] leading-[1.2]">
                    {b.title}
                    <span className="text-stoep">.</span>
                  </h3>
                  <p className="mt-4 text-[14.5px] leading-[1.65] opacity-80 max-w-[48ch]">
                    {b.detail}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Automation catalogue */}
        <AutomationCatalogue />

        {/* Pull quote */}
        <section className="py-24 md:py-40">
          <div className="mx-auto max-w-[1480px] px-6 md:px-12">
            <Reveal>
              <blockquote className="font-display font-medium text-[32px] md:text-[56px] lg:text-[72px] leading-[1.05] tracking-[-0.03em] max-w-[24ch]">
                "Your people still do the work. They just stop doing the part that
                wasn't really the work<span className="text-stoep">."</span>
              </blockquote>
              <div className="eyebrow opacity-55 mt-8">— How we frame it for partners</div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-indigo text-dawn">
          <div className="absolute inset-0 dot-field opacity-50 pointer-events-none" aria-hidden />
          <div className="relative mx-auto max-w-[1480px] px-6 md:px-12 py-24 md:py-32 flex flex-col md:flex-row gap-10 md:items-end md:justify-between">
            <Reveal>
              <div className="eyebrow opacity-70">05 — Start the conversation</div>
              <h2 className="mt-4 font-display font-semibold text-[40px] md:text-[64px] lg:text-[80px] leading-[0.95] tracking-[-0.035em] max-w-[20ch]">
                Where is the work going slow<span className="text-stoep">?</span>
              </h2>
              <p className="mt-6 text-[15px] md:text-[17px] leading-[1.65] max-w-[52ch] opacity-85">
                Tell us about a process that's taking too long, or a piece of the
                work that doesn't feel like it should be a person's job anymore. We'll
                tell you, honestly, whether AI is the right fix.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="flex gap-3 flex-wrap">
              <Link href="/about#contact" data-cursor className="inline-flex items-center gap-2 px-6 py-3.5 bg-stoep text-indigo rounded-full text-[14px] font-medium hover:bg-[#ff5747] transition-colors duration-300">
                Get in touch →
              </Link>
              <Link href="/case-studies" data-cursor className="inline-flex items-center gap-2 px-6 py-3.5 border border-dawn/40 text-dawn rounded-full text-[14px] font-medium hover:bg-dawn/10 transition-colors duration-300">
                See what we've built
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
