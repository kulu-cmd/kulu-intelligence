import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CustomCursor } from "@/components/CustomCursor";
import { PageEnter } from "@/components/PageEnter";

const principles = [
  {
    title: "Plain-spoken, never thin",
    body:
      "We use real language with real precision. No jargon, no buzzwords, no claims we can't substantiate in the room.",
  },
  {
    title: "Specific over generic",
    body:
      "Your firm, not 'an organisation like yours'. By Friday, not 'rapidly'. The output of the work, not the inputs.",
  },
  {
    title: "Confident, never cocky",
    body:
      "We know this work well. We don't lord it over the people we're hired to help.",
  },
  {
    title: "Honest about what AI can't do",
    body:
      "If a tool is wrong for your problem, we'll say so — even when it costs us the engagement.",
  },
];

export default function AboutPage() {
  return (
    <>
      <CustomCursor />
      <PageEnter />
      <SiteHeader />
      <PageHero
        num="Approach"
        category="Built for the firms that hire carefully"
        title="The name does the work"
        lead="In isiZulu, kulu means great — not in the marketing sense, but in the weighty, significant sense. The kind of thing that earns your attention. We borrowed the word because that's how AI should be treated in a serious firm. As a serious tool. Not a toy."
        surface="mielie"
      />

      <main className="bg-dawn">
        {/* Mission / Vision / Promise */}
        <section className="border-y border-indigo/10">
          <div className="mx-auto max-w-[1480px] px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-indigo/10">
            {[
              {
                label: "What we do",
                body:
                  "We teach professional teams how to use AI well, and we implement it where it earns its keep.",
              },
              {
                label: "For whom",
                body:
                  "Mid-sized firms in property, marketing, accounting & finance, and HR — across South Africa and the continent.",
              },
              {
                label: "How",
                body:
                  "Embedded, in-person, tied to real outcomes. No 60-page strategy docs. No platform sale.",
              },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08} className="p-8 md:p-12 lg:p-14">
                <div className="eyebrow opacity-55">{item.label}</div>
                <p className="mt-6 font-display font-medium text-[22px] md:text-[26px] lg:text-[28px] tracking-[-0.02em] leading-[1.25]">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Positioning */}
        <section className="bg-stoep text-indigo">
          <div className="mx-auto max-w-[1480px] px-6 md:px-12 py-24 md:py-32">
            <Reveal className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12 md:mb-16">
              <h2 className="font-display font-semibold text-[40px] md:text-[64px] lg:text-[80px] leading-[0.95] tracking-[-0.035em] max-w-[22ch]">
                Closer to a really good GP than a specialist surgeon<span className="text-dawn">.</span>
              </h2>
              <div className="eyebrow opacity-65">02 — Positioning</div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[16px] md:text-[19px] leading-[1.65] max-w-[64ch] opacity-90">
                We are not an AI agency. We're an AI consultancy for firms that don't
                need an agency. First call, plain advice, sensible referrals when the
                problem is bigger than us.
              </p>
            </Reveal>

            <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
              <Reveal delay={0.15}>
                <div className="eyebrow opacity-65 mb-5">We're for</div>
                <ul className="text-[15px] md:text-[16px] leading-[2] space-y-0">
                  <li>· Mid-sized professional firms</li>
                  <li>· Partners who want to move on AI properly</li>
                  <li>· Operations leads tired of pilot purgatory</li>
                  <li>· Teams that need to learn it without losing a week</li>
                  <li>· Firms careful about where their data goes</li>
                </ul>
              </Reveal>
              <Reveal delay={0.22}>
                <div className="eyebrow opacity-65 mb-5">We're not for</div>
                <ul className="text-[15px] md:text-[16px] leading-[2] opacity-75 space-y-0">
                  <li>· Enterprise procurement processes</li>
                  <li>· Six-figure retainers and quarterly reviews</li>
                  <li>· Founders chasing buzzwords for a pitch deck</li>
                  <li>· Anyone shopping for a 60-page strategy doc</li>
                  <li>· People who think AI is going to replace their team</li>
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Voice principles */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-[1480px] px-6 md:px-12">
            <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
              <h2 className="font-display font-semibold text-[36px] md:text-[56px] lg:text-[64px] leading-[0.95] tracking-[-0.03em] max-w-[20ch]">
                How we talk about the work<span className="text-stoep">.</span>
              </h2>
              <div className="eyebrow opacity-55">03 — Tone</div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[16px] md:text-[18px] leading-[1.65] opacity-85 max-w-[60ch] mb-12 md:mb-16">
                We speak the way the people we work with speak. Specific. Considered.
                Without varnish.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {principles.map((p, i) => (
                <Reveal
                  key={p.title}
                  delay={i * 0.06}
                  as="article"
                  className="group bg-dawn border border-indigo/10 p-7 md:p-8 flex flex-col gap-4 min-h-[220px] rounded-[8px] hover:bg-spruit/35 transition-colors duration-500"
                >
                  <h3 className="font-display font-semibold text-[20px] md:text-[22px] tracking-[-0.01em] leading-[1.25]">
                    {p.title}
                    <span className="text-stoep">.</span>
                  </h3>
                  <p className="text-[14.5px] leading-[1.6] opacity-80">{p.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="relative overflow-hidden bg-indigo text-dawn scroll-mt-24"
        >
          <div className="absolute inset-0 dot-field opacity-50 pointer-events-none" aria-hidden />
          <div className="relative mx-auto max-w-[1480px] px-6 md:px-12 py-24 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            <Reveal className="md:col-span-6">
              <div className="eyebrow opacity-70">04 — Get in touch</div>
              <h2 className="mt-4 font-display font-semibold text-[40px] md:text-[64px] lg:text-[80px] leading-[0.95] tracking-[-0.035em] max-w-[18ch]">
                The first call is on us<span className="text-stoep">.</span>
              </h2>
              <p className="mt-7 text-[15px] md:text-[17px] leading-[1.65] opacity-85 max-w-[48ch]">
                Tell us a little about the firm, the team, and what's on your desk.
                We'll come back within a working day with a sensible next step — or
                a sensible recommendation to talk to someone else.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="md:col-span-6 flex flex-col gap-6">
              <div>
                <div className="eyebrow opacity-65 mb-2">Email</div>
                <a
                  href="mailto:hello@kulu.co.za"
                  data-cursor
                  className="font-display font-medium text-[28px] md:text-[36px] lg:text-[42px] tracking-[-0.02em] hover:text-stoep transition-colors duration-300 inline-block"
                >
                  hello@kulu.co.za
                </a>
              </div>
              <div>
                <div className="eyebrow opacity-65 mb-2">Phone</div>
                <div className="font-display font-medium text-[24px] md:text-[28px] tracking-[-0.015em]">
                  +27 71 555 0142
                </div>
              </div>
              <div className="flex gap-3 flex-wrap mt-4">
                <Link href="/learn" data-cursor className="inline-flex items-center gap-2 px-6 py-3.5 bg-stoep text-indigo rounded-full text-[14px] font-medium hover:bg-[#ff5747] transition-colors duration-300">
                  Bring us in to teach →
                </Link>
                <Link href="/implement" data-cursor className="inline-flex items-center gap-2 px-6 py-3.5 border border-dawn/40 text-dawn rounded-full text-[14px] font-medium hover:bg-dawn/10 transition-colors duration-300">
                  Bring us in to build
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
