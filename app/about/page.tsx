import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CustomCursor } from "@/components/CustomCursor";
import { PageEnter } from "@/components/PageEnter";

// Paste your YouTube video ID here when ready (e.g. "dQw4w9WgXcQ")
// Leave empty to show the branded placeholder instead
const FOUNDER_VIDEO_ID = "";

const principles = [
  {
    title: "Plain-spoken, never thin",
    body: "We use real language with real precision. No jargon, no buzzwords, no claims we can't substantiate in the room.",
  },
  {
    title: "Specific over generic",
    body: "Your firm, not 'an organisation like yours'. By Friday, not 'rapidly'. The output of the work, not the inputs.",
  },
  {
    title: "Confident, never cocky",
    body: "We know this work well. We don't lord it over the people we're hired to help.",
  },
  {
    title: "Honest about what AI can't do",
    body: "If a tool is wrong for your problem, we'll say so — even when it costs us the engagement.",
  },
];

const whyUs = [
  {
    title: "You can actually call us",
    body: "No ticket system. No 48-hour response window. We're a small team — when you need us, you reach a person who knows your business.",
  },
  {
    title: "No tech degree required",
    body: "We explain AI the way a good mechanic explains your car. You don't need to understand the engine to drive it well.",
  },
  {
    title: "Fixed, honest prices",
    body: "You know what you're paying before we start. No scope creep, no surprise invoices, no retainers that outlast the value.",
  },
];

export default function AboutPage() {
  return (
    <>
      <CustomCursor />
      <PageEnter />
      <SiteHeader />
      <PageHero
        num="Why Kulu"
        category="Built for real businesses, not enterprise"
        title="AI that works for you, not around you"
        lead="In isiZulu, kulu means great — not in the marketing sense, but in the weighty, significant sense. The kind of thing that earns your attention. We borrowed the word because that's how AI should be treated in a serious business. As a serious tool. Not a toy."
        surface="mielie"
      />

      <main className="bg-dawn">
        {/* Mission strip */}
        <section className="border-y border-indigo/10">
          <div className="mx-auto max-w-[1480px] px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-indigo/10">
            {[
              {
                label: "Who we're for",
                body: "Small and mid-sized South African businesses that want practical AI, not a pilot programme.",
              },
              {
                label: "How we work",
                body: "Embedded, in-person, tied to real outcomes. Live before month-end. No 60-page strategy docs.",
              },
              {
                label: "What we promise",
                body: "Plain talk, real tools, honest prices. If AI isn't right for your problem, we'll tell you.",
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

        {/* Founder video */}
        <section className="relative overflow-hidden bg-indigo text-dawn">
          <div className="absolute inset-0 dot-field opacity-35 pointer-events-none" aria-hidden />
          <div className="relative mx-auto max-w-[1480px] px-6 md:px-12 py-24 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
            <Reveal className="md:col-span-5">
              <div className="eyebrow opacity-65">02 — From the founder</div>
              <h2 className="mt-4 font-display font-semibold text-[36px] md:text-[56px] lg:text-[64px] leading-[0.95] tracking-[-0.03em] max-w-[16ch]">
                Why I started Kulu<span className="text-stoep">.</span>
              </h2>
              <p className="mt-6 text-[15px] md:text-[16px] leading-[1.7] opacity-80 max-w-[44ch]">
                A short, honest explanation of what we do, who we do it for, and why we think most AI consultancies are getting it wrong.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="md:col-span-7">
              {FOUNDER_VIDEO_ID ? (
                <div className="relative w-full rounded-[12px] overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${FOUNDER_VIDEO_ID}?rel=0&modestbranding=1`}
                    title="Founder video — Why I started Kulu"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="relative w-full rounded-[12px] overflow-hidden bg-dawn/5 border border-dawn/10 flex flex-col items-center justify-center gap-4 text-dawn/50" style={{ paddingBottom: "56.25%" }}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-full border border-dawn/20 flex items-center justify-center">
                      <div className="w-0 h-0 border-t-[10px] border-b-[10px] border-l-[18px] border-t-transparent border-b-transparent border-l-dawn/40 ml-1" />
                    </div>
                    <span className="eyebrow opacity-50">Video coming soon</span>
                  </div>
                </div>
              )}
            </Reveal>
          </div>
        </section>

        {/* Why businesses choose us */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-[1480px] px-6 md:px-12">
            <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
              <h2 className="font-display font-semibold text-[36px] md:text-[56px] lg:text-[64px] leading-[0.95] tracking-[-0.03em] max-w-[22ch]">
                Why businesses choose us<span className="text-stoep">.</span>
              </h2>
              <div className="eyebrow opacity-55">03 — The difference</div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {whyUs.map((item, i) => (
                <Reveal
                  key={item.title}
                  delay={i * 0.08}
                  as="article"
                  className="group relative bg-dawn border border-indigo/10 p-8 md:p-10 flex flex-col rounded-[8px] hover:bg-spruit/35 transition-colors duration-500 overflow-hidden"
                >
                  <span className="absolute top-0 left-8 right-8 h-[1.5px] bg-stoep scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                  <h3 className="font-display font-semibold text-[22px] md:text-[24px] tracking-[-0.015em] leading-[1.2]">
                    {item.title}<span className="text-stoep">.</span>
                  </h3>
                  <p className="mt-5 text-[14.5px] leading-[1.65] opacity-80">{item.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Positioning */}
        <section className="bg-stoep text-indigo">
          <div className="mx-auto max-w-[1480px] px-6 md:px-12 py-24 md:py-32">
            <Reveal className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12 md:mb-16">
              <h2 className="font-display font-semibold text-[40px] md:text-[64px] lg:text-[80px] leading-[0.95] tracking-[-0.035em] max-w-[22ch]">
                Built for businesses that hire carefully<span className="text-dawn">.</span>
              </h2>
              <div className="eyebrow opacity-65">04 — Positioning</div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[16px] md:text-[19px] leading-[1.65] max-w-[64ch] opacity-90">
                We are not an AI agency. We're a hands-on AI consultancy for businesses that don't need an agency — they need someone who shows up, does the work, and tells the truth about what's possible.
              </p>
            </Reveal>

            <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
              <Reveal delay={0.15}>
                <div className="eyebrow opacity-65 mb-5">We're for</div>
                <ul className="text-[15px] md:text-[16px] leading-[2] space-y-0">
                  <li>· Small and mid-sized South African businesses</li>
                  <li>· Owners who want to move on AI properly</li>
                  <li>· Teams tired of reading about AI and never using it</li>
                  <li>· Anyone who needs a straight answer, not a proposal</li>
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
              <div className="eyebrow opacity-55">05 — Tone</div>
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
              <div className="eyebrow opacity-70">06 — Get in touch</div>
              <h2 className="mt-4 font-display font-semibold text-[40px] md:text-[64px] lg:text-[80px] leading-[0.95] tracking-[-0.035em] max-w-[18ch]">
                The first call is on us<span className="text-stoep">.</span>
              </h2>
              <p className="mt-7 text-[15px] md:text-[17px] leading-[1.65] opacity-85 max-w-[48ch]">
                Tell us a little about the business, the team, and what's on your desk.
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
                  Book a seminar →
                </Link>
                <Link href="/implement" data-cursor className="inline-flex items-center gap-2 px-6 py-3.5 border border-dawn/40 text-dawn rounded-full text-[14px] font-medium hover:bg-dawn/10 transition-colors duration-300">
                  Automate something
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
