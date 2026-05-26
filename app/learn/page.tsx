import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CustomCursor } from "@/components/CustomCursor";
import { PageEnter } from "@/components/PageEnter";
import IndustrySelector from "@/components/IndustrySelector";

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
              { label: "Length",     value: "60 — 120 min" },
              { label: "Format",     value: "Live, in-person" },
              { label: "Group size", value: "Up to 40" },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08} className="py-10 md:py-14 px-0 md:px-8 first:pl-0 last:pr-0">
                <div className="eyebrow opacity-55">{item.label}</div>
                <div className="mt-4 font-display font-medium text-[38px] md:text-[48px] tracking-[-0.025em] leading-[1]">
                  {item.value}<span className="text-stoep">.</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Interactive industry selector — now first */}
        <IndustrySelector />

      </main>
      <SiteFooter />
    </>
  );
}
