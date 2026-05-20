import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CustomCursor } from "@/components/CustomCursor";
import { PageEnter } from "@/components/PageEnter";

type Study = {
  industry: string;
  location: string;
  title: string;
  before: string;
  after: string;
  result: string;
  surface: "dawn" | "indigo" | "coral" | "mielie" | "spruit";
};

const studies: Study[] = [
  {
    industry: "Property — managing agent",
    location: "Sandton",
    title: "Tenant queries answered before the second cup of coffee",
    before:
      "The team was processing 80–100 tenant queries every Monday. Most were the same five questions about levies, lease clauses and geyser repairs. Replies were taking two working days.",
    after:
      "A drafting assistant trained on the firm's lease library and house style. Tenants get a draft answer in minutes; agents review, edit if needed, and send.",
    result: "Median response time down from 48 hours to 4. Same headcount.",
    surface: "dawn",
  },
  {
    industry: "Marketing — agency",
    location: "Cape Town",
    title: "Briefs to first drafts in a single afternoon",
    before:
      "Senior strategists were spending half their week writing first-pass copy and decks for client work that would then be heavily rewritten.",
    after:
      "An in-house drafting workflow trained on the agency's voice and tone guide. Strategists start from a 70% draft, edit to taste, ship to client review the same day.",
    result: "Strategist hours-on-drafting down by 60%. Client turnarounds halved.",
    surface: "indigo",
  },
  {
    industry: "Accounting & finance — mid-tier practice",
    location: "Pretoria",
    title: "Reconciliations that don't eat the weekend",
    before:
      "Two staff doing reconciliations by hand each weekend, perpetually behind on month-end. Partner reviews bottlenecked everything else.",
    after:
      "A Claude-based workflow drafts reconciliations directly from the bank exports, flags exceptions, and produces the working paper. Juniors review and sign-off.",
    result: "Month-end closing 4 working days earlier. Weekends returned.",
    surface: "mielie",
  },
  {
    industry: "HR — recruitment agency",
    location: "Johannesburg",
    title: "Long-lists triaged before the consultant opens the inbox",
    before:
      "Consultants drowning in CVs for high-volume roles. The first read was eating 6–8 hours of partner-level time per role.",
    after:
      "A structured screening assistant reads applications against the brief, scores against role-critical criteria, and surfaces a ranked long-list with notes.",
    result: "Time-to-shortlist down from a week to 36 hours. Placement rate held.",
    surface: "spruit",
  },
];

const periodColour: Record<Study["surface"], string> = {
  dawn: "text-stoep",
  indigo: "text-stoep",
  coral: "text-dawn",
  mielie: "text-stoep",
  spruit: "text-stoep",
};

const surfaceClasses: Record<Study["surface"], string> = {
  dawn: "bg-dawn text-indigo border border-indigo/10",
  indigo: "bg-indigo text-dawn",
  coral: "bg-stoep text-indigo",
  mielie: "bg-mielie text-indigo",
  spruit: "bg-spruit text-indigo",
};

export default function CaseStudiesPage() {
  return (
    <>
      <CustomCursor />
      <PageEnter />
      <SiteHeader />
      <PageHero
        num="Practice"
        category="Where AI is already at work"
        title="What it actually looks like"
        lead="Real engagements with property, marketing, accounting and HR firms across South Africa. Names are changed where the client asked. The numbers are exactly as they came out."
        surface="coral"
      />

      <main className="bg-dawn">
        {/* Quick stats */}
        <section className="border-y border-indigo/10">
          <div className="mx-auto max-w-[1480px] px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 divide-x divide-indigo/10">
            {[
              { label: "Engagements", value: "37" },
              { label: "Industries", value: "4" },
              { label: "Avg. days to live", value: "12" },
              { label: "Still in production", value: "100%" },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.06} className="py-10 md:py-14 px-5 md:px-8">
                <div className="eyebrow opacity-55">{item.label}</div>
                <div className="mt-4 font-display font-medium text-[36px] md:text-[48px] tracking-[-0.025em] leading-[1]">
                  {item.value}
                  <span className="text-stoep">.</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Studies */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-[1480px] px-6 md:px-12">
            <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
              <h2 className="font-display font-semibold text-[36px] md:text-[56px] lg:text-[64px] leading-[0.95] tracking-[-0.03em] max-w-[20ch]">
                Four firms, four shifts<span className="text-stoep">.</span>
              </h2>
              <div className="eyebrow opacity-55">02 — Stories</div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {studies.map((study, idx) => (
                <Reveal
                  key={study.title}
                  delay={idx * 0.08}
                  as="article"
                  className={[
                    "relative overflow-hidden rounded-[8px] p-8 md:p-10 flex flex-col gap-6 group",
                    surfaceClasses[study.surface],
                  ].join(" ")}
                >
                  {study.surface === "indigo" && (
                    <div className="absolute inset-0 dot-field opacity-45 pointer-events-none" aria-hidden />
                  )}

                  <div className="relative">
                    <div className="eyebrow opacity-65">{study.industry}</div>
                    <div className="eyebrow opacity-55 mt-1">{study.location}</div>
                  </div>

                  <h3 className="relative font-display font-medium text-[24px] md:text-[30px] tracking-[-0.02em] leading-[1.15] max-w-[24ch]">
                    {study.title}
                    <span className={periodColour[study.surface]}>.</span>
                  </h3>

                  <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <div className="eyebrow opacity-65 mb-2">Before</div>
                      <p className="text-[14.5px] leading-[1.6] opacity-85">{study.before}</p>
                    </div>
                    <div>
                      <div className="eyebrow opacity-65 mb-2">After</div>
                      <p className="text-[14.5px] leading-[1.6] opacity-85">{study.after}</p>
                    </div>
                  </div>

                  <div className="relative pt-5 border-t border-current/20">
                    <div className="eyebrow opacity-65 mb-2">Result</div>
                    <p className="font-display font-medium text-[20px] md:text-[24px] tracking-[-0.01em] leading-[1.3]">
                      {study.result}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Honest note */}
        <section className="bg-spruit/60 text-indigo">
          <div className="mx-auto max-w-[1480px] px-6 md:px-12 py-24 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <Reveal className="md:col-span-5">
              <div className="eyebrow opacity-65">03 — A standard</div>
              <h2 className="mt-4 font-display font-semibold text-[36px] md:text-[56px] lg:text-[64px] leading-[0.95] tracking-[-0.03em] max-w-[16ch]">
                Tested before it ships<span className="text-stoep">.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-7 text-[16px] md:text-[18px] leading-[1.7] opacity-85 max-w-[58ch]">
              <p>
                Every workflow we build is run against your firm's own real
                examples before it goes live. We measure what improved, what didn't,
                and we record where the human still has to sit.
              </p>
              <p className="mt-5">
                When something doesn't work, we say so. When it does, the
                documentation is yours, the model context is yours, and the
                relationship continues.
              </p>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-indigo text-dawn">
          <div className="mx-auto max-w-[1480px] px-6 md:px-12 py-24 md:py-32 flex flex-col md:flex-row gap-10 md:items-end md:justify-between">
            <Reveal>
              <div className="eyebrow opacity-70">04 — Yours, next</div>
              <h2 className="mt-4 font-display font-semibold text-[40px] md:text-[64px] lg:text-[80px] leading-[0.95] tracking-[-0.035em] max-w-[22ch]">
                Would a story like one of these change something at your firm<span className="text-stoep">?</span>
              </h2>
              <p className="mt-6 text-[15px] md:text-[17px] leading-[1.65] max-w-[52ch] opacity-85">
                Tell us where the work is slow. We'll tell you, plainly, whether AI
                is the right answer.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="flex gap-3 flex-wrap">
              <Link href="/about#contact" data-cursor className="inline-flex items-center gap-2 px-6 py-3.5 bg-stoep text-indigo rounded-full text-[14px] font-medium hover:bg-[#ff5747] transition-colors duration-300">
                Get in touch →
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
